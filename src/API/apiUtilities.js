import axios from 'axios';


export const GetProviders_And_Products = async (dealType) => {
    try {
        let summarizedProviders;
        let summarizedProducts;

        const getProductsFromPromo = (pc) => {
          const promoCode = pc.promoCode;
          return pc.products.reduce((prods, p) => [...prods, getSummarizedProduct(p,promoCode)], [])
      }

        const response = await fetch('https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public');
        const data = await response.json();
  
        const freeDealtypeRouter = 'FTTH-FREESETUP-FREEROUTER';
        const prepaid = 'FTTH-PREPAID';

        
        if (data && data.campaigns.length > 0) {
          
          const campains = data.campaigns;
          const allpromocodes = campains.map((campian) => {
           return campian.promocodes; 
          })
          const allpromoCODES = [...allpromocodes[0],...allpromocodes[1]]
          const promoCodes = allpromoCODES
          const marketingBaseUrl = 'https://apigw.mweb.co.za/prod/baas/proxy';
          const promoCodesAPIURL = `${marketingBaseUrl}/marketing/products/promos/${promoCodes.join(',')}?sellable_online=true`;
          
          const promocodeProductsResponse = await fetch(promoCodesAPIURL);
          const promocodeProducts = await promocodeProductsResponse.json();

          if(promocodeProducts)
          {
            const summarizedProducts_ =  promocodeProducts.reduce((prods, pc) => [...prods, ...getProductsFromPromo(pc)], [])
            summarizedProducts = summarizedProducts_;
 
            const imageOfProviderBaseUrl = "https://www.mweb.co.za/media/images/providers";            
            const providerItems = summarizedProducts.filter((item, index, self) => {
              const lowercaseProvider = item.provider.toLowerCase();
              return (index === self.findIndex(i => i.provider.toLowerCase().includes(lowercaseProvider) || lowercaseProvider.includes(i.provider.toLowerCase())));
            }).map(item => ({
              name: item.provider,
              code: item.provider,
              url: `${imageOfProviderBaseUrl}/provider-${GetProviderImageName(item.provider.toLowerCase())}.png`,  
            }));

            summarizedProviders = providerItems;
            return { summarizedProviders, summarizedProducts}
          }
        }
        
    } catch (error) {
      console.error('Error fetching provider data:', error);
      throw error;
    }
  };


  const getSpeedinMbps = (productSpeed) =>
  {
      if(productSpeed)
      {
          const kbpsIndex = productSpeed.value.indexOf('KBPS')
          const speed = productSpeed.value.substring(0, kbpsIndex - 1).trim();
          let downloadSpeed = parseInt(speed);
          downloadSpeed = downloadSpeed / 1000;
          if(downloadSpeed)
          {
              return Math.floor(downloadSpeed);
          }
      }
  }

  const GetProviderImageName = (provider) => 
        {
            switch(provider)
            {
                case 'openserve web connect':
                return 'openserve';
                case 'web connect':
                return 'web-connect';
                case 'frogfoot air':
                return 'frogfoot-air';
                case 'link africa':
                return  'linkafrica';
                case 'vumatel':
                return 'vuma';
                case 'vuma reach':
                return 'vuma-reach';
                case 'clear access':
                return 'clearaccess';
                case 'link layer':
                return 'link-layer';
                case 'mfn':
                return 'metrofibre';
                case 'tt connect':
                return 'tt-connect';
                default:
                return provider;
            }
        }


  export const getSummarizedProduct = ({id,productCode,friendlyName, productName, productRate, subcategory,parameters},promoCode) => 
        {
            const provider = subcategory.replace('Uncapped', '').replace('Capped', '').trim();
            productName = friendlyName;
            const idFromProduct = id;
            const downloadSpeed = getSpeedinMbps(parameters.find(p => p.name === 'downloadSpeed'));
            const measurementPS = 'Mbps';
            const uploadSpeedTotal = getSpeedinMbps(parameters.find(p => p.name === 'uploadSpeed'));
        
            const unthrottled = parameters.find(p => p.name === 'isThrottled')?.value ? true : false;
            const imageOfProviderBaseUrl = "https://www.mweb.co.za/media/images/providers";
            const providerUrl = `${imageOfProviderBaseUrl}/provider-${GetProviderImageName(provider.toLowerCase())}.png`;
            const promoCode_From_codes = promoCode;
            const freeRouter = false;

            return {idFromProduct,promoCode_From_codes,productCode, productName,productRate, provider,downloadSpeed,measurementPS,uploadSpeedTotal,providerUrl,unthrottled, freeRouter};
    }

 export const GetProductFromApi = async (productId,promoCode) =>
 {
    try 
    {
      const productsUrlFromPromo = `https://apigw.mweb.co.za/prod/baas/proxy/marketing/products/promos/${promoCode}?sellable_online=true`;
      
      const product = await axios.get(`${productsUrlFromPromo}`).then
                        (resp => {
                          const promotion = resp.data.filter(promo => promo.promoCode === promoCode)[0]; //.products.map((product) => product.id === parseInt(productId))
                          if(promotion)
                          {
                            return promotion.products.filter(p => p.id === productId);
                          }
                        });
      if(product && product.length > 0)
      {
        console.log(product[0]);
        return getSummarizedProduct(product[0],promoCode);
      }
    }
    catch(error)
    {

    }
 }
  
  