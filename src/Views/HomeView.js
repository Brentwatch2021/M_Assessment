import React,{useState,useContext, useEffect, useRef} from 'react'
import PromoFilterContext from '../React_Context_API/PromoFilterContext';
import ProviderBox from '../Components/ProviderBox/ProviderBox';
import { useSearchParams } from 'react-router-dom';
import SelectedProvidersView from './SelectedProvidersView';
import ProductsView from './ProductsView';
import { PriceRangeContext, ProductsContext, ProvidersContext, ProvidersSelectedContext, SpeedRangeContext } from '../React_Context_API/FibreProductsContext';
import { GetProviders_And_Products } from '../API/apiUtilities';
import './HomeView.css'

const HomeView = (props) => {

    const [localProviders, setlocalProviders] = useState([]);
    const [localProducts, setlocalProducts] = useState([]);
    //const { providerFilterSelection, setProviderFilterSelection} = useContext(PromoFilterContext);
    //const [providers] = useContext(ProvidersContext);
    //const [products] = useContext(ProductsContext);
    const [providersSelected] = useContext(ProvidersSelectedContext);

    const [providers, setProviders] = useContext(ProvidersContext);
    const [products,setProducts] = useContext(ProductsContext);

    const [ priceRangeSelected,setPriceRangeSelected ] = useContext(PriceRangeContext);
    const [speedRangeSelected,setSpeedRangeSelected] = useContext(SpeedRangeContext);

    const handlePriceChange = (event) => {

      const priceSelected = event.target.value;
      

      setPriceRangeSelected(priceSelected);

      // I might be causing a rerender here by setting all the values like this
      // will check it out when in performance review mode
      // const providerFilterSelectionUpdatedwithProviders = {
      //   PriceRangeSelected:priceSelected
      // }

      // setProviderFilterSelection(providerFilterSelectionUpdatedwithProviders);

      // const updatedState = (prevState) => ({
      //   ...prevState,
      //   PriceRangeSelected: priceSelected
      // })


      // setProviderFilterSelection(updatedState);



      //setProviderFilterSelection()



    }

    const handleSpeedChange = (event) => {
      const speedSelected = event.target.value;

      setSpeedRangeSelected(speedSelected);
    }

    // const handleDealTypeChanged = () => {

    // }

    //const [searchParams, setSearchParams] = useSearchParams();

    //Set default values for optional parameters
    

    useEffect(() => {

        // if(providerFilterSelection.providers && providerFilterSelection.providers.length > 0)
        // {
        //     setlocalProviders(providerFilterSelection.providers);
        // }

        // if(providerFilterSelection.products && providerFilterSelection.products.length > 0)
        // {
        //     setlocalProducts(providerFilterSelection.products);
        // }

        // const GetPromoContent = async () => {
        // const { summarizedProviders, summarizedProducts} = await GetProviders_And_Products('FTTH-FREESETUP-FREEROUTER');
        
        // // if(summarizedProviders)
        // // {
        // //   setProviderss(summarizedProviders);
        // // }
        
        // // if(summarizedProducts)
        // // {
        // //   setSummarizedProducts(summarizedProducts);
        // // }

        // // if(summarizedProviders && summarizedProducts && providerFilterSelection.products.length === 0 
        // //   && providerFilterSelection.providers.length === 0) 
        // // {
        // //   const providerFilterSelectionUpdatedwithProviders = {
        // //   dealTypeSelected:providerFilterSelection.dealTypeSelected,
        // //   providersSelected:providerFilterSelection.providersSelected,
        // //   SpeedRangeSelected:providerFilterSelection.SpeedRangeSelected,
        // //   products: summarizedProducts,
        // //   providers: summarizedProviders,
        // //   PriceRangeSelected:providerFilterSelection.PriceRangeSelected
        // // }

        // if(summarizedProviders && summarizedProviders.length > 0)
        // {
        //   setProviders(summarizedProviders);
        // }
        // // setProviderFilterSelection(providerFilterSelectionUpdatedwithProviders);
        // if(summarizedProducts && summarizedProducts.length > 0)
        // {
        //   setProducts(summarizedProducts);
        // }


        // if(products && products.length > 0)
        // {
        //   setlocalProducts(products)
        // }

        // if(providers && providers.length > 0)
        // {
        //   setlocalProviders(providers)
        // }

        

        // Set the defaults of the optional parameters
        // if (!searchParams.has('selectedProviders')) {
        //   searchParams.set('selectedProviders', 'none');
        // }
    
        // if (!searchParams.has('price')) {
        //   searchParams.set('price', 'defaultPrice');
        // }
    
        // if (!searchParams.has('speed')) {
        //   searchParams.set('speed', 'defaultSpeed');
        // }
    
        // setSearchParams(searchParams);
        GetPromoContent()

        },[])


        const GetPromoContent = async () => {
          const { summarizedProviders, summarizedProducts} = await GetProviders_And_Products('FTTH-FREESETUP-FREEROUTER');
          
          // if(summarizedProviders)
          // {
          //   setProviderss(summarizedProviders);
          // }
          
          // if(summarizedProducts)
          // {
          //   setSummarizedProducts(summarizedProducts);
          // }
  
          // if(summarizedProviders && summarizedProducts && providerFilterSelection.products.length === 0 
          //   && providerFilterSelection.providers.length === 0) 
          // {
          //   const providerFilterSelectionUpdatedwithProviders = {
          //   dealTypeSelected:providerFilterSelection.dealTypeSelected,
          //   providersSelected:providerFilterSelection.providersSelected,
          //   SpeedRangeSelected:providerFilterSelection.SpeedRangeSelected,
          //   products: summarizedProducts,
          //   providers: summarizedProviders,
          //   PriceRangeSelected:providerFilterSelection.PriceRangeSelected
          // }
  
          if(summarizedProviders && summarizedProviders.length > 0)
          {
            setlocalProviders(summarizedProviders);
          }
          // setProviderFilterSelection(providerFilterSelectionUpdatedwithProviders);
          if(summarizedProducts && summarizedProducts.length > 0)
          {
            setlocalProducts(summarizedProducts);
          }
        }



        const containerRef = useRef(null);

        const scrollLeft = () => {
            containerRef.current.scrollBy({
            left: -200, // Adjust the value as per your requirement
            behavior: 'smooth' // Add smooth scrolling effect
        });
        };

        const scrollRight = () => {
            containerRef.current.scrollBy({
            left: 200, // Adjust the value as per your requirement
            behavior: 'smooth' // Add smooth scrolling effect
          });
          };




    return(
        <>
    {/* <div className="App"> */}
     <div className="container"> 
      <div className='d-flex m-5 flex-column align-items-center'>
        <h4 className='font-weight-bold'>Fibre Products</h4>
        <div className='text-center'>
        <span className='d-inline'>Select a Fibre infrastructure provider below browse the products available and complete a coverage search</span>
        </div>
        
      </div>

      <div className='d-flex flex-wrap justify-content-center'>
      <button onClick={scrollLeft}><i className="bi bi-arrow-left-circle-fill"></i></button>
      <div className="w-50 horizontal-scrollable d-flex flex-nowrap overflow-auto scrollbar-hidden" ref={containerRef}>
              {localProviders.map((p) => (<><ProviderBox selectable={true} key={p.name} name={p.name} url={p.url}/></>))}        
      </div>
      <button onClick={scrollRight}><i className='bi bi-arrow-right-circle-fill'></i></button>
      </div>



      {/* {localProviders.map((p) => (<><ProviderBox selectable={true} key={p.name} name={p.name} url={p.url}/></>))} */}
      
    </div>
    
    <div className='container'>
    <div className='row'>
      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
      <span className='d-flex justify-content-center'>Select Filters Below</span>
        <div className='d-flex flex-wrap justify-content-center'>
          <div className='d-flex flex-column'>
            <span>Filter By: </span>
            <div className='d-flex flex-wrap gap-3'>
                <select className='p-2' value={priceRangeSelected} onChange={handlePriceChange}>
                  <option value="Price">Price</option>
                  <option value="0 - 699">R0 - R699</option>
                  <option value="700 - 999" >R700 - R999</option>
                  <option value="1000+">R1000+</option>
                </select>
                <select className='p-2' value={speedRangeSelected} onChange={handleSpeedChange}>
                  <option value="Speed" selected>Speed</option>
                  <option value="0To20">0Mbps to 20Mbps</option>
                  <option value="20To50" >20 to 50 Mbps</option>
                  <option value="50+">50 Mbps+</option>
                </select>
            </div>
          </div>
          
            {/* providers selected */}
            
          <div>
          {/* <div className='d-flex justify-content-center'>
              <SelectedProvidersView/>
          </div> */}

          </div>
          
        </div>
        <div className='d-flex justify-content-center'>
              <SelectedProvidersView/>
          </div>
      </div>
    </div>  
</div>
{/* <ProductsView summarizedProducts={summarizedProducts}/> This is where the router outlet will go later */}
{ localProviders.length > 0 && localProducts.length > 0 ? 
 <ProductsView Products={localProducts} /> : null }
    
    </>    
    );
}

export default HomeView;