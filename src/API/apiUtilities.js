import axios from 'axios';


export const GetProviders_And_Products = async (dealType) => {
    try {
        let summarizedProviders;
        let summarizedProducts;

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

        const getSummarizedProduct = ({productCode, productName, productRate, subcategory,parameters},promoCodeTagline) => 
        {
            const provider = subcategory.replace('Uncapped', '').replace('Capped', '').trim();
            productName = productName.replace(provider, '').replace('-', '').trim();

            const downloadSpeed = getSpeedinMbps(parameters.find(p => p.name === 'downloadSpeed'));
            const measurementPS = 'Mbps';
            const uploadSpeedTotal = getSpeedinMbps(parameters.find(p => p.name === 'uploadSpeed'));
        
            const unthrottled = parameters.find(p => p.name === 'isThrottled')?.value ? true : false;
            const imageOfProviderBaseUrl = "https://www.mweb.co.za/media/images/providers";
            const providerUrl = `${imageOfProviderBaseUrl}/provider-${GetProviderImageName(provider.toLowerCase())}.png`;
            
            const freeRouter = false;

            return {productCode, productName, productRate, provider,downloadSpeed,measurementPS,uploadSpeedTotal,providerUrl,unthrottled, freeRouter};
        }



        const getProductsFromPromo = (pc) => {
            const promoCode = pc.promoCode;
            return pc.products.reduce((prods, p) => [...prods, getSummarizedProduct(p)], [])
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
  
  