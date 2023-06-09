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
        switch(providerFilterSelection.PriceRangeSelected)
        {
          case '0 - 699':
          //selectedProducts = selectedProducts.filter(product => product.productRate >= 0 && product.productRate <= 699);  
          break;
          case '700 - 999':
          //selectedProducts = selectedProducts.filter(product => product.productRate >= 700 && product.productRate <= 999);  
          break;
          case '1000+':
          //selectedProducts = selectedProducts.filter(product => product.productRate >= 1000);  
          break;
          default:
        }

        setFilteredProducts(selectedProducts);


      },[providerFilterSelection.providersSelected,providerFilterSelection.PriceRangeSelected])

  return (
    <div>
        <p>Products View</p>
        {/* 
          

        */}
        {/* {filteredProducts.map((product) => (<p>Name: {product.productName} and the rate is: {product.productRate} AND the download speed is: {product.downloadSpeed} AND the measurment is {product.measurementPS} AND the upload speed is {product.uploadSpeedTotal}</p>))} */}
        {filteredProducts.map((product) => 
        (
          <>
          <hr/>
          <br/>
          <p>Name: {product.productName}</p>
          <p>ProductRate: R{product.productRate}</p>
          <p>Download Speed: {product.downloadSpeed}</p>
          <p>Upload Speed: {product.uploadSpeedTotal}</p>
          <img src={product.providerUrl} alt={product.provider}></img> 
          {product.unthrottled ? <p>Unthrottled</p> : <p>Throttled</p>}
          {product.freeRouter ? <p>Free Router and Instalation</p> : <p>Prepaid</p>}
          <hr/>
          <br/>
          </>
        ))}
        
    </div>
  );
};

export default ProductsView;