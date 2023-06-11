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
                return 'openserve';
                case 'frogfoot air':
                return 'frogfoot';
                case 'link africa':
                return  'linkafrica';
                case 'vumatel':
                return 'vuma';
                case 'vuma reach':
                return 'vuma';
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
            // // Download speed extraction permutations

            // 1GB Uncapped Fibre - Lightstruck and the rate is: 1949

            // 1Gb/500Mbps Uncapped Fibre - Thinkspeed Alternate Precincts and the rate is: 1459


            //const {downloadSpeed, measurement,uploadSpeed} = getDownloadSpeed(productName);
            const downloadSpeed = getSpeedinMbps(parameters.find(p => p.name === 'downloadSpeed'));
            const measurementPS = 'Mbps';
            const uploadSpeedTotal = getSpeedinMbps(parameters.find(p => p.name === 'uploadSpeed'));
        
            const unthrottled = parameters.find(p => p.name === 'isThrottled')?.value ? true : false;
            // https://www.mweb.co.za/media/images/providers/provider-vumatel.png
            // https://www.mweb.co.za/media/images/providers/provider-tt-connect.png
            const imageOfProviderBaseUrl = "https://www.mweb.co.za/media/images/providers";
            const providerUrl = `${imageOfProviderBaseUrl}/provider-${GetProviderImageName(provider.toLowerCase())}.png`;
            // Seems all mweb promos come with free router and instalation
            const freeRouter = dealType === 'FTTH-FREESETUP-FREEROUTER' ? true : false;
        
            //Properties Required to be extracted:
          
          
            //Uncapped Fibre yes/no
            //image url

            return {productCode, productName, productRate, provider,downloadSpeed,measurementPS,uploadSpeedTotal,providerUrl,unthrottled, freeRouter};
        }



        const getProductsFromPromo = (pc) => {
            const promoCode = pc.promoCode;
            //const promoCodeTagLine	= pc.promoCodeTagLine;
            return pc.products.reduce((prods, p) => [...prods, getSummarizedProduct(p)], [])
        }



        const response = await fetch('https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public');
        const data = await response.json();
        console.log('Data from mweb:', data);

        // This will be a radio buttons two for both deal types
        const freeDealtypeRouter = 'FTTH-FREESETUP-FREEROUTER';
        const prepaid = 'FTTH-PREPAID';

        // Filter on selected campaign
        if (data && data.campaigns.length > 0) {
          
          
          // free router
          const selectedCampaign = data.campaigns.filter(c => c.code === freeDealtypeRouter)[0];
          
          // no router tsek
          //const selectedCampaign = data.campaigns.filter(c => c.code === prepaid)[0];

          // Dynamic Campaign hopefully this works
          //const selectedCampaign = data.campaigns.filter(c => c.code === providerFilterSelection.dealTypeSelected)[0];
          
          console.log(selectedCampaign);

          const promoCodes = selectedCampaign.promocodes;
          //VUMA-REACH-RECURRING
          // marketing url
          const marketingBaseUrl = 'https://apigw.mweb.co.za/prod/baas/proxy';
          // https://apigw.mweb.co.za/prod/baas/proxy/marketing/products/promos/VUMA-REACH-RECURRING?sellable_online=true
          const promoCodesAPIURL = `${marketingBaseUrl}/marketing/products/promos/${promoCodes.join(',')}?sellable_online=true`;
          console.log(promoCodesAPIURL)
          // promo Products
          const promocodeProductsResponse = await fetch(promoCodesAPIURL);
          const promocodeProducts = await promocodeProductsResponse.json();

          // filters to add to filtering for all products: promoCodeCategory
          // take provider and list products using map method
          if(promocodeProducts)
          {
            // setProdcuts(promocodeProducts.map((promocodeProduct) => ({
            //   providerName: promocodeProduct.provider,
            //   products: promocodeProduct.products
            // })))

            //setProducts(promocodeProducts);
            //products = promocodeProducts;
            const summarizedProducts_ =  promocodeProducts.reduce((prods, pc) => [...prods, ...getProductsFromPromo(pc)], [])
            
            //setSummarizedProducts(summarizedProducts);
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

            // Set Providers from sumarized products
            //setProviderss(providerItems);
            summarizedProviders = providerItems;
            return { summarizedProviders, summarizedProducts}
          }
        }
        
    } catch (error) {
      console.error('Error fetching provider data:', error);
      throw error;
    }
  };
  
  export const Get_Products = (selectedProviders,selectedPriceRange,selectedSpeedRange) => {
    try {

        const products = selectedProviders.map((providers) => {

            // Get products based on selectedPriceRange,selectedSpeedRange


        })

        if(products)
        {
            return products;
        }
        
    }
    catch(error)
    {
        console.error('Error fetching product data:', error)
    }
  }