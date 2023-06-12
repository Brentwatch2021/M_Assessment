import React,{ createContext,useState} from 'react'


export const ProvidersSelectedContext = createContext();
export const ProvidersContext = createContext();
export const ProductsContext = createContext();
export const SpeedRangeContext = createContext();
export const PriceRangeContext = createContext();

export const FibreProductsProvider = ({children}) => 
{
    const [providersSelected, setProvidersSelected] = useState([]);
    const [providers, setProviders] = useState([]);
    const [products,setProducts] = useState([]);
    const [speedRangeSelected,setSpeedRangeSelected] = useState('Speed');
    const [priceRangeSelected,setPriceRangeSelected] = useState('Price');
    
    return (
    <ProvidersSelectedContext.Provider value={[providersSelected, setProvidersSelected]}>
      <ProvidersContext.Provider value={[providers, setProviders]}>
        <ProductsContext.Provider value={[products, setProducts]}>
          <SpeedRangeContext.Provider value={[speedRangeSelected, setSpeedRangeSelected]}>
            <PriceRangeContext.Provider value={[priceRangeSelected, setPriceRangeSelected]}>
              {children}
            </PriceRangeContext.Provider>
          </SpeedRangeContext.Provider>
        </ProductsContext.Provider>
      </ProvidersContext.Provider>
    </ProvidersSelectedContext.Provider>
    );
}