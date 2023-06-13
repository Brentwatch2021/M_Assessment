import React, {useContext, useEffect, useState} from 'react';
import './ProductView.css'
import { PriceRangeContext, ProvidersSelectedContext, SpeedRangeContext } from '../React_Context_API/FibreProductsContext';
import Card from '../Components/Card/Card';


const ProductsView = (props) => {
    
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
            <Card key={`${index}${product.productName}${product.productCode}productkey`}
            product={product}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsView;