import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import Card from './Components/Card/Card';
import { useDispatch } from 'react-redux'
import setProviders from './Redux_Toolkit/providersSlice'
import PromoFilterContext from './React_Context_API/PromoFilterContext';
import ProductsView from './Views/ProductsView';



function App() {

  const [providers,setProviderss] = useState([]);
  //const [providerSelection, setProviderSelection] = useState([]);
  const [providerFilterSelection,setProviderFilterSelection] = useState({
    providersSelected:[],
    SpeedRangeSelected:'',
    PriceRangeSelected:'0 - 699'
  });

  

  const [promoProducts,setProducts] = useState([]);
  const [summarizedProducts, setSummarizedProducts] = useState([]);

  //const dispatch = useDispatch();
  // 1. Use the API to get Fibre products for all providers

  // Use fetch but make it more intelligent by implementing redux and checking which browser if IE use axios library

  // React Context API
  
  // const updateProviderSelection = (newProviderSelection) => {
  //   setProviderSelection(newProviderSelection);
  // }

  const updateFilterSelection = (newFilterSelection) => 
  {
    setProviderFilterSelection(newFilterSelection);
  }



  useEffect(() => {

    GetProviders();

  },[])


  function GetProviders() {
    try {

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

      const getSummarizedProduct = ({productCode, productName, productRate, subcategory}) => 
      {
        const provider = subcategory.replace('Uncapped', '').replace('Capped', '').trim();
        productName = productName.replace(provider, '').replace('-', '').trim();
        // // Download speed extraction permutations

        

        

        

        

        

        

        

        


        // 1GB Uncapped Fibre - Lightstruck and the rate is: 1949

        // 1Gb/500Mbps Uncapped Fibre - Thinkspeed Alternate Precincts and the rate is: 1459


        const {downloadSpeed, measurement,uploadSpeed} = getDownloadSpeed(productName);
        const measurementPS = measurement;
        const uploadSpeedTotal = uploadSpeed;
        const unthrottled = productName.includes('Uncapped') ? true : false;
        const imageOfProviderBaseUrl = "https://www.mweb.co.za/media/images/providers";
        const providerUrl = `${imageOfProviderBaseUrl}/provider-${GetProviderImageName(provider.toLowerCase())}.png`;
        // Seems all mweb promos come with free router and instalation
        const freeRouter = true;
        
        //Properties Required to be extracted:
          
          
          //Uncapped Fibre yes/no
          //image url

        return {productCode, productName, productRate, provider,downloadSpeed,measurementPS,uploadSpeedTotal,providerUrl,unthrottled, freeRouter};
      }

      const getDownloadSpeed = (productName) => {

          // 1st Permutation Attempt
          // // 10/2Mbps Uncapped Fibre - Evotel and the rate is: 589 COMPLETE
          const uncappedIndex = productName.indexOf("Uncapped");
          const speed = productName.substring(0, uncappedIndex);
          const trimmedSpeed = speed.trim();
          if(trimmedSpeed.length > 0)
          {
            const downloadSpeedIndex = trimmedSpeed.indexOf("/");
            const speed = trimmedSpeed.substring(0, downloadSpeedIndex);
            const uploadSpeedinitial = trimmedSpeed.substring(downloadSpeedIndex, trimmedSpeed.length);
            const measurementIndex  = uploadSpeedinitial.indexOf("Mbps");
            const uploadSpeedtrimmed = uploadSpeedinitial.substring(1, measurementIndex).trim();
            const downloadSpeed = parseInt(speed);
            const uploadSpeed = parseInt(uploadSpeedtrimmed);
            const measurement = 'Mbps';
            if(!isNaN(downloadSpeed) && !isNaN(uploadSpeed))
            {
              return {downloadSpeed,measurement,uploadSpeed};
            }
          }

          // 2nd Permutation Attempt
          // Uncapped 20/10Mbps Fibre - Openserve WebConnect and the rate is: 299
          //const uncappedIndex2 = productName.indexOf("Uncapped");
          const nextIndex = productName.indexOf("Fibre");
          const speed2 = productName.substring(9, nextIndex);
          const trimmedSpeed2 = speed2.trim();
          if(trimmedSpeed2.length > 0)
          {
            const downloadSpeedIndex2 = trimmedSpeed2.indexOf("/");
            const speed2 = trimmedSpeed2.substring(0, downloadSpeedIndex2);
            const measurementIndex  = trimmedSpeed2.indexOf("Mbps");
            const uploadSpeedtrimmed = trimmedSpeed2.substring(downloadSpeedIndex2 + 1, measurementIndex).trim();
            const downloadSpeed = parseInt(speed2);
            const uploadSpeed = parseInt(uploadSpeedtrimmed);
            const measurement = "Mbps";
            if(!isNaN(downloadSpeed) && !isNaN(uploadSpeed))
            {
               return {downloadSpeed,measurement,uploadSpeed};
              //return downloadSpeed;
            }
          }


          // 3rd Permutation Attempt
          // Uncapped 25Mbps Fibre - Link Africa and the rate is: 599
          const nextIndex3 = productName.indexOf("Fibre");
          const speed3 = productName.substring(9, nextIndex3);
          const trimmedSpeed3 = speed3.trim();
          if(trimmedSpeed3.length > 0)
          {
            const downloadSpeedIndex3 = trimmedSpeed3.indexOf("Mbps");
            const speed3 = trimmedSpeed3.substring(0, downloadSpeedIndex3);
            const downloadSpeed = parseInt(speed3);
            const uploadSpeed = downloadSpeed;
            const measurement = "Mbps";
            if(!isNaN(downloadSpeed) && !isNaN(uploadSpeed))
            {
              return {downloadSpeed,measurement,uploadSpeed};
              //return speedNumber3;
            }
          }

          // 4th Permutation Attempt
          // 10Mbps Uncapped Fibre - Zoom and the rate is: 445
          const nextIndex4 = productName.indexOf("Mbps");
          const speed4 = productName.substring(0, nextIndex4);
          const trimmedSpeed4 = speed4.trim();
          if(trimmedSpeed4.length > 0)
          {
            //const downloadSpeedIndex4 = trimmedSpeed4.indexOf("Mbps");
            //const speed4 = trimmedSpeed4.substring(0, downloadSpeedIndex4);
            const downloadSpeed = parseInt(trimmedSpeed4);
            const uploadSpeed = downloadSpeed;
            const measurement = "Mbps";
            if(!isNaN(downloadSpeed))
            {
              return {downloadSpeed,measurement,uploadSpeed};
              //return speedNumber4;
            }
          }

          // 5th 
          // 1Gbps Uncapped Fibre - Zoom and the rate is: 1689
          const nextIndex5 = productName.indexOf("Gbps");
          const speed5 = productName.substring(0, nextIndex5);
          const trimmedSpeed5 = speed5.trim();
          if(trimmedSpeed5.length > 0)
          {
            //const downloadSpeedIndex4 = trimmedSpeed4.indexOf("Mbps");
            //const speed4 = trimmedSpeed4.substring(0, downloadSpeedIndex4);
            const uploadSpeed = parseInt(trimmedSpeed5);
            const downloadSpeed = uploadSpeed;
            const measurement = "Gbps";
            if(!isNaN(uploadSpeed))
            {
              return {downloadSpeed,measurement,uploadSpeed};
              //return speedNumber5;
            }
          }

          // 6th
          // Uncapped Including 40/10Mbps Fibre Line - Frogfoot and the rate is: 615
          //const startIndex6 = productName.indexOf("Uncapped Including");
          const nextIndex6 = productName.indexOf("Fibre");
          const totalspeed6 = productName.substring(18, nextIndex6).trim();
          const startupIndex6 = totalspeed6.indexOf("/");
          const uploadindexStart = startupIndex6 + 1;
          const enduploadIndex = totalspeed6.indexOf("Mbps");
          const uploadSpeed = totalspeed6.substring(uploadindexStart, enduploadIndex).trim();
          const downloadSpeed = totalspeed6.substring(0, startupIndex6).trim();
          const measurement = "Mbps";
          if(downloadSpeed.length > 0)
          {
            //const downloadSpeedIndex4 = trimmedSpeed4.indexOf("Mbps");
            //const speed4 = trimmedSpeed4.substring(0, downloadSpeedIndex4);
            if(!isNaN(downloadSpeed) && !isNaN(uploadSpeed))
            {
              return {downloadSpeed,measurement,uploadSpeed};
            }
          }

          // 7th
          // Uncapped 1Gbps Fibre - Vumatel and the rate is: 1479
          const nextIndex7 = productName.indexOf("Fibre");
          const totalspeed7 = productName.substring(9, nextIndex7).trim();
          const startupIndex7 = totalspeed7.indexOf("Gbps");
          const speed7 = totalspeed7.substring(0, startupIndex7);
          const trimmedSpeed7 = speed7.trim();
          if(trimmedSpeed7.length > 0)
          {
            //const downloadSpeedIndex4 = trimmedSpeed4.indexOf("Mbps");
            //const speed4 = trimmedSpeed4.substring(0, downloadSpeedIndex4);
            const downloadSpeed = parseInt(trimmedSpeed7);
            const uploadSpeed = downloadSpeed;
            const measurement = "Gbps";
            if(!isNaN(downloadSpeed))
            {
              return {downloadSpeed,measurement,uploadSpeed};
            }
          }

          // 8th
          // 1GB Uncapped Fibre - Lightstruck and the rate is: 1949
          const nextIndex8 = productName.indexOf("GB");
          const totalspeed8 = productName.substring(0, nextIndex8).trim();
          if(totalspeed8.length > 0)
          {
            //const downloadSpeedIndex4 = trimmedSpeed4.indexOf("Mbps");
            //const speed4 = trimmedSpeed4.substring(0, downloadSpeedIndex4);
            const downloadSpeed = parseInt(totalspeed8);
            const measurement = "GB";
            const uploadSpeed = downloadSpeed;
            if(!isNaN(downloadSpeed))
            {
              return {downloadSpeed,measurement,uploadSpeed};
            }
          }


          // 9th
          // Uncapped  Including 100/100Mbps Fibre Line - Octotel
          const nextIndex9 = productName.indexOf("Fibre");
          const totalspeed9 = productName.substring(20, nextIndex9).trim();
          const startupIndex9 = totalspeed9.indexOf("/");
          const uploadSpeedIndexStart = startupIndex9 + 1;
          const uploadSpeedIndexEnd = totalspeed9.indexOf("Mbps");
          const uploadSpeedTrimmed = totalspeed9.substring(uploadSpeedIndexStart, uploadSpeedIndexEnd).trim();
          const downloadSpeedTrimmed = totalspeed9.substring(0, startupIndex9).trim();
          if(downloadSpeedTrimmed.length > 0)
          {
            //const downloadSpeedIndex4 = trimmedSpeed4.indexOf("Mbps");
            //const speed4 = trimmedSpeed4.substring(0, downloadSpeedIndex4);
            const downloadSpeed = parseInt(downloadSpeedTrimmed);
            const uploadSpeed = parseInt(uploadSpeedTrimmed);
            const measurement = "Mbps";
            if(!isNaN(downloadSpeed) && !isNaN(uploadSpeed))
            {
              return {downloadSpeed,measurement,uploadSpeed};
              //return speedNumber9;
            }
          }



          // 10th 
          // Uncapped 1Gbps Fibre - Vumatel and the rate is: 1479
          const nextIndex10 = productName.indexOf("Fibre");
          const totalspeed10 = productName.substring(9, nextIndex10).trim();
          const startupIndex10 = totalspeed10.indexOf("Gbps");
          const speed10 = totalspeed10.substring(0, startupIndex10);
          const trimmedSpeed10 = speed10.trim();
          if(trimmedSpeed10.length > 0)
          {
            //const downloadSpeedIndex4 = trimmedSpeed4.indexOf("Mbps");
            //const speed4 = trimmedSpeed4.substring(0, downloadSpeedIndex4);
            const speedNumber10 = parseInt(trimmedSpeed10);
            if(!isNaN(speedNumber10))
            {
              return speedNumber10;
            }
          }

          // 9th
          // // Uncapped 250/50Mbps Fibre Line - Frogfoot and the rate is: 989
          // const nextIndex8 = productName.indexOf("Fibre");
          // const totalspeed8 = productName.substring(9, nextIndex8).trim();
          // const startupIndex8 = totalspeed8.indexOf("/");
          // const speed8 = totalspeed8.substring(0, startupIndex8);
          // const trimmedSpeed8 = speed8.trim();
          // if(trimmedSpeed8.length > 0)
          // {
          //   //const downloadSpeedIndex4 = trimmedSpeed4.indexOf("Mbps");
          //   //const speed4 = trimmedSpeed4.substring(0, downloadSpeedIndex4);
          //   const speedNumber8 = parseInt(trimmedSpeed8);
          //   if(!isNaN(speedNumber8))
          //   {
          //     return speedNumber8;
          //   }
          // }

          

          // // Check if a match is found
          // if (speedMatch && speedMatch.length === 4) 
          // {
          //   const downloadSpeed = speedMatch[1];
          //   return downloadSpeed;
          //   // const uploadSpeed = speedMatch[2];
          //   // const measurement = speedMatch[3];
          //   // console.log("Download Speed:", downloadSpeed, "Mbps");
          //   // console.log("Upload Speed:", uploadSpeed, "Mbps");
          //   // console.log("Measurement:", measurement);
          // }


          

          // Extract download speed and measurement using the regular expression pattern


          // Check if a match is found



        }

      const getProductsFromPromo = (pc) => {
        const promoCode = pc.promoCode
        return pc.products.reduce((prods, p) => [...prods, getSummarizedProduct(p)], [])
      } 


      const fetchProviders = async () => {
        
        const response = await fetch('https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public');
        const data = await response.json();
        console.log('Data from mweb:', data);

        // This will be a radio buttons two for both deal types
        const freeDealtypeRouter = 'FTTH-FREESETUP-FREEROUTER';
        const prepaid = 'FTTH-PREPAID';

        // Filter on selected campaign
        if (data && data.campaigns.length > 0) {
          const selectedCampaign = data.campaigns.filter(c => c.code === freeDealtypeRouter)[0];
          console.log(selectedCampaign);

          const promoCodes = selectedCampaign.promocodes;

          // marketing url
          const marketingBaseUrl = 'https://apigw.mweb.co.za/prod/baas/proxy';

          const promoCodesAPIURL = `${marketingBaseUrl}/marketing/products/promos/${promoCodes.join(',')}?sellable_online=true`;

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

            setProducts(promocodeProducts);
            const summarizedProducts =  promocodeProducts.reduce((prods, pc) => [...prods, ...getProductsFromPromo(pc)], [])
            setSummarizedProducts(summarizedProducts);
            
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
            setProviderss(providerItems);
          }


          

          // const providerItems = promocodeProducts.filter((item, index, self) => {
          //   const lowercaseProvider = item.provider.toLowerCase();
          //   return (index === self.findIndex(i => i.provider.toLowerCase().includes(lowercaseProvider) || lowercaseProvider.includes(i.provider.toLowerCase())));
          // }).map(item => ({
          //   name: item.provider,
          //   code: item.provider,
          //   url: `${imageOfProviderBaseUrl}/provider-${GetProviderImageName(item.provider.toLowerCase())}.png`,  
          // }));

          // console.log(providerItems);
          // setProviderss(providerItems);
          // if(providerItems)
          // {
          //   //Uncaught runtime errors:
          //   // ×
          //   // ERROR
          //   // Cannot read properties of undefined (reading 'type')
          //   // TypeError: Cannot read properties of undefined (reading 'type')
          //   //     at reducer (http://localhost:3000/static/js/bundle.js:1746:57)
          //   //     at reducer (http://localhost:3000/static/js/bundle.js:1859:14)
          //   //     at fetchProviders (http://localhost:3000/static/js/bundle.js:153:95)
          //   // ERROR
          //   // Cannot read properties of undefined (reading 'type')
          //   // TypeError: Cannot read properties of undefined (reading 'type')
          //   //     at reducer (http://localhost:3000/static/js/bundle.js:1746:57)
          //   //     at reducer (http://localhost:3000/static/js/bundle.js:1859:14)
          //   //     at fetchProviders (http://localhost:3000/static/js/bundle.js:153:95)
          //   //dispatch(setProviders(providerItems));
          // }
          
        }
      };

      fetchProviders();
    }
    catch (error) {
    }
  }

  const handlePriceChange = (event) =>
  {
    const priceSelected = event.target.value;

    const providerFilterSelectionUpdated = {
      providersSelected:providerFilterSelection.providersSelected,
      SpeedRangeSelected:providerFilterSelection.SpeedRangeSelected,
      PriceRangeSelected:priceSelected
    }

    setProviderFilterSelection(providerFilterSelectionUpdated);
    // set the price range state
  }

  const handleSpeedChange = (event) => {
    const speedSelected = event.target.value;
    
    
    const providerFilterSelectionUpdated = {
      providersSelected:providerFilterSelection.providersSelected,
      SpeedRangeSelected:speedSelected,
      PriceRangeSelected:providerFilterSelection.PriceRangeSelected
    }

    setProviderFilterSelection(providerFilterSelectionUpdated);
  }

  //let productsToDisplay = undefined;
  // if(products.length > 1)
  // {
  //   productsToDisplay = products.filter((promocodeProduct) => providerFilterSelection.providersSelected.includes(promocodeProduct.provider))
  // }
  

  //const filteredProducts = promoProducts.filter((promoProduct) => promoProduct.provider === 'Openserve Web Connect')
  
  // const updateProviders = () => {
  //   filteredProductsDynamic = promoProducts.filter((promoProduct) => providerFilterSelection.providersSelected.includes(promoProduct.provider))
  // }
   

  return (
    // <PromoFilterContext.Provider value={{ providerSelection, updateProviderSelection}}>
    <PromoFilterContext.Provider value={{ providerFilterSelection, updateFilterSelection}}>
    <div className="App">
      <h1>Fibre Products</h1>
      {providers.map((p) => (<><Card key={p.name} name={p.name} url={p.url}/></>))}
      {/* {providerSelection.map((providerSelectedName) => (<p>{providerSelectedName}</p>))} */}

      {/* Filter By Section */}
      <p>Filter By</p>

      {/* Speed */}
      <select value={providerFilterSelection.SpeedRangeSelected} onChange={handleSpeedChange}>
        <option value="below10">below 9 mbps</option>
        <option value="8mbps" >10 to 20 mbps</option>
        <option value="16mbps">20 mbps+</option>
      </select>
      {/* Price */}
      <select value={providerFilterSelection.PriceRangeSelected} onChange={handlePriceChange}>
        <option value="0 - 699">R0 - R699</option>
        <option value="700 - 999" >R700 - R999</option>
        <option value="1000+">R1000+</option>
      </select>
      
      <p>Price Range Selected: {providerFilterSelection.PriceRangeSelected}  </p>
      <p>Speed Range Selected: {providerFilterSelection.SpeedRangeSelected}  </p>
      {/* {providerFilterSelection.providersSelected.map((providerSelectedName) => (<p>{providerSelectedName}</p>))} */}
      {/* Products */}
      {/* {products && products.length > 1 ? products[0].products.map((product) => (<><p>{product.productName}</p></>)) : undefined} */}
      {/* {promoProducts && promoProducts.length > 1 ? promoProducts[0].products.map((product) => (<><p>{product.productName}</p></>)) : undefined} */}
      {/* {filteredProducts && filteredProducts.length > 0 ? filteredProducts[0].products.map((product) => (<><p>{product.productName}</p></>)) : undefined} */}
      {/* {filteredProductsDynamic && filteredProductsDynamic.length > 0 ? filteredProductsDynamic[0].products.map((product) => (<><p>{product.productName}</p></>)) : undefined} */}
      
    </div>
    <ProductsView summarizedProducts={summarizedProducts}/>
    </PromoFilterContext.Provider>
  );

  
}

export default App;
