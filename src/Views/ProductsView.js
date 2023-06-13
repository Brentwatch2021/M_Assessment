import React, {useContext, useEffect, useState} from 'react';
import './ProductView.css'
import { PriceRangeContext, ProvidersSelectedContext, SpeedRangeContext } from '../React_Context_API/FibreProductsContext';


const ProductsView = (props) => {
    // // Global State Filters
    //const { providerFilterSelection, updateFilterSelection } = useContext(PromoFilterContext);
    const [ priceRangeSelected ] = useContext(PriceRangeContext);
    const [speedRangeSelected ] = useContext(SpeedRangeContext);
    const [filteredProducts,setFilteredProducts] = useState([]);
    const [providersSelected] = useContext(ProvidersSelectedContext);
    
      
      useEffect(() => {
        
        
        let selectedProducts; 
        if(providersSelected.length > 0 && props.Products.length > 0)
        {
          selectedProducts = props.Products.filter(product => providersSelected.some((provider) => provider.name === product.provider))
          if(selectedProducts && selectedProducts.length > 0)
          {

            switch(priceRangeSelected)
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

          
            switch(speedRangeSelected)
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

            setFilteredProducts(selectedProducts);
        }
        
        }
        

        


      },[props.Products,priceRangeSelected, providersSelected,speedRangeSelected])

  return (
    
    <div className='container'> 
      <div className='row g-3'>
          {filteredProducts.map((product,index) => (
                  <div key={`${index}${product.productName}${product.productCode}productkey`} className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                  <div className='d-flex flex-wrap justify-content-between'>
                    <div className='d-flex flex-column'>
                      <span className='productName'>{product.productName}</span>
                      { product.unthrottled ? <span className='throttling'>Unthrottled </span> :  <span className='throttling'>Unthrottled </span>} 
                      {/* { product.freeRouter ? <span className='throttling'>FREE Installation + Router</span> :  <span className='throttling'>Recurring Fibre</span>}  */}
                      
                    </div>
                    <div className='d-flex flex-wrap justify-content-between  p-2 border'>
                         <div className='d-flex flex-column p-2'>
                              <div className="d-flex justify-content-center align-items-center">
                                  <span className="text-center"><i className="bi bi-arrow-down"></i></span>
                              </div>
                            <span>Download</span> 
                            <span>{product.downloadSpeed}{product.measurementPS}</span> 
                         </div>
                         <div className='d-flex flex-column p-2'>
                              <div className="d-flex justify-content-center align-items-center">
                                  <span className="text-center"><i className="bi bi-arrow-up"></i></span>
                              </div>
                            <span>Upload</span> 
                            <span>{product.uploadSpeedTotal}{product.measurementPS}</span> 
                         </div>
                    </div>
                  </div>
                  <div className='d-flex flex-wrap justify-content-around p-4'>
                    <div><span className='rateStyle'>R{product.productRate}pm</span></div>
                    <div> <img src={product.providerUrl} alt={product.provider}></img> </div>
                    <div> <button className='coverageButton p-2'>Check Coverage</button> </div>
                  </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsView;