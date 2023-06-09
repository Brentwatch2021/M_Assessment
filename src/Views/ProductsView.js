import React, {useContext, useEffect, useState} from 'react';
import PromoFilterContext from '../React_Context_API/PromoFilterContext';

const ProductsView = (props) => {
    // // Global State Filters
    const { providerFilterSelection, updateFilterSelection } = useContext(PromoFilterContext);

    const [filteredProducts,setFilteredProducts] = useState([]);
    

    // providerFilterSelection.providersSelected.forEach(providerSelected => {
    //     const listOfPairedProductsToProvider = props.summarizedProducts.filter((product) => product.provider.toLowerCase() === providerSelected.toLowerCase());
    //     setFilteredProducts([...filteredProducts,listOfPairedProductsToProvider]);
    // });

    // const selectedProducts = () => {
    //     // filter products by infrastructure provider
    //     const selectedProviderSet = new Set(providerFilterSelection.providersSelected)
    //     let selectedProducts = props.summarizedProducts.filter(p => selectedProviderSet.has(p.provider))
        
    //     // filter products by price range
    //     //selectedProducts = selectedProducts.filter(filterByPriceRanges)
        
    //     // sort by price from lowest to highest
    //     //selectedProducts = selectedProducts.sort((pa, pb) => pa.productRate - pb.productRate)
        
    //     return selectedProducts
    //   }
      
      useEffect(() => {
        
        // BUG seems to be list of providers in the list is not in the list of summarized products
        const selectedProviderSet = new Set(providerFilterSelection.providersSelected)
        let selectedProducts = props.summarizedProducts.filter(p => selectedProviderSet.has(p.provider))
        
        
        // productCode:
        // 'FTTH-WEBCONNECT-10MB-UNC'
        // productName:
        // 'Uncapped 20/10Mbps Fibre - Openserve WebConnect'
        // productRate:
        // 299
        // provider:
        // 'Web Connect'
        // Filter on price selection
        

        // <option value="0To20">0Mbps to 20Mbps</option>
        // <option value="20To50" >20 to 50 Mbps</option>
        // <option value="50+">50 Mbps+</option>

        // also account for GB and Gbps it should show if any poses any of these values
        // Filter on speed selection
        if(selectedProducts.length > 0)
        {

          switch(providerFilterSelection.PriceRangeSelected)
          {
            case '0 - 699':
            selectedProducts = selectedProducts.filter(product => product.productRate >= 0 && product.productRate <= 699);  
            break;
            case '700 - 999':
            selectedProducts = selectedProducts.filter(product => product.productRate >= 700 && product.productRate <= 999);  
            break;
            case '1000+':
            selectedProducts = selectedProducts.filter(product => product.productRate >= 1000);  
            break;
            default:
            break
          }

          
          switch(providerFilterSelection.SpeedRangeSelected)
          {
            // These filter only on Mbps not for GB or Gbps
            case '0To20':
            selectedProducts = selectedProducts.filter(product => product.downloadSpeed >= 0 && product.downloadSpeed <= 20);  
            break;
            case '20To50':
            selectedProducts = selectedProducts.filter(product => product.downloadSpeed >= 20 && product.downloadSpeed <= 50);  
            break;
            case '50+':
            selectedProducts = selectedProducts.filter(product => product.downloadSpeed >= 50);  
            break;
            default:
            break
          }
        }
        

        setFilteredProducts(selectedProducts);


      },[providerFilterSelection.providersSelected,providerFilterSelection.PriceRangeSelected,providerFilterSelection.SpeedRangeSelected])

  return (
    <div className='container'>
      <div className='row'>
        {/* TODO Improve the column spacing for all screen sizes */}
        <div className='col-11 col-sm-12 col-md-12'> 
        
        {/* 
          

        */}
        <div className='d-flex flex-wrap'>
        
        {/* {filteredProducts.map((product) => (<p>Name: {product.productName} and the rate is: {product.productRate} AND the download speed is: {product.downloadSpeed} AND the measurment is {product.measurementPS} AND the upload speed is {product.uploadSpeedTotal}</p>))} */}
        {filteredProducts.map((product) => 
        (
          <div className='w-50 d-flex flex-column p-3'>
            <div className='border p-2'>
              <div className='d-flex flex-wrap justify-content-between'>
                <div className='d-flex flex-column'>
                  <span>product name </span>
                  <span>throttling </span>
                  <span>free router </span>
                </div>
                <div className='d-flex flex-wrap justify-content-between p-2 border'>
                     <div className='p-2'>
                        upload
                     </div>
                     <div className='p-2'>
                      download
                     </div>
                </div>
              </div>
              <div className='d-flex flex-wrap justify-content-around p-4'>
                <div> Rate </div>
                <div> ProviderImage </div>
                <div> Coverage Button </div>
              </div>
            </div>
          {/* <div>
            <div>
              <p>{product.productName}</p>
              {product.unthrottled ? <p>Unthrottled</p> : <p>Throttled</p>} 
              {product.freeRouter ? <p>Free Router and Instalation</p> : <p>Prepaid</p>}
            </div>
            <div>
              <p>Download Speed: {product.downloadSpeed}</p>
              <p>Upload Speed: {product.uploadSpeedTotal}</p>
            <div/>
          <div/>
          <div/>
          
          <p>ProductRate: R{product.productRate}</p>
          
          <img src={product.providerUrl} alt={product.provider}></img> 
          
          
          
          </div> */}
          </div>
        ))}
          </div>
          </div>
        </div>
    </div>
  );
};

export default ProductsView;