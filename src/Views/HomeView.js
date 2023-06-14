import React,{useState,useContext, useEffect, useRef} from 'react'
import ProviderBox from '../Components/ProviderBox/ProviderBox';
import SelectedProvidersView from './SelectedProvidersView';
import ProductsView from './ProductsView';
import { PriceRangeContext, ProductsContext, ProvidersContext, ProvidersSelectedContext, SpeedRangeContext } from '../React_Context_API/FibreProductsContext';
import { GetProviders_And_Products } from '../API/apiUtilities';
import './HomeView.css'

const HomeView = (props) => {

    const [localProviders, setlocalProviders] = useState([]);
    const [localProducts, setlocalProducts] = useState([]);
    const [providersSelected] = useContext(ProvidersSelectedContext);
    const [providers, setProviders] = useContext(ProvidersContext);
    const [products,setProducts] = useContext(ProductsContext);

    const [ priceRangeSelected,setPriceRangeSelected ] = useContext(PriceRangeContext);
    const [speedRangeSelected,setSpeedRangeSelected] = useContext(SpeedRangeContext);

    const handlePriceChange = (event) => {

      const priceSelected = event.target.value;
      setPriceRangeSelected(priceSelected);
    }

    const handleSpeedChange = (event) => {
      const speedSelected = event.target.value;

      setSpeedRangeSelected(speedSelected);
    }

  
    useEffect(() => {
        GetFibreContent()
        },[])


        const GetFibreContent = async () => {
          const { summarizedProviders, summarizedProducts} = await GetProviders_And_Products('FTTH-FREESETUP-FREEROUTER');
          if(summarizedProviders && summarizedProviders.length > 0)
          {
            setlocalProviders(summarizedProviders);
          }
          
          if(summarizedProducts && summarizedProducts.length > 0)
          {
            setlocalProducts(summarizedProducts);
          }
        }



        const providerCarouselRef = useRef(null);

        const scrollLeft = () => {
          if(providerCarouselRef !== null)
          {
              providerCarouselRef.current.scrollBy({
                left: -150, 
                behavior: 'smooth' 
              });
          }
        };

        const scrollRight = () => {
          if(providerCarouselRef !== null)
          {
            providerCarouselRef.current.scrollBy({
              left: 150, 
              behavior: 'smooth' 
            });
          }
            
          };




    return(
        <>
    
     <div className="container"> 
      <div className='d-flex m-5 flex-column align-items-center'>
        <h4 className='font-weight-bold'>Fibre Products</h4>
        <div className='text-center'>
        <span className='d-inline'>Select a Fibre infrastructure provider below browse the products available and complete a coverage search</span>
        </div>
      </div>
      <div className="container-fluid px-0 mx-0">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <button onClick={scrollLeft} className="btn mr-auto"><img src={process.env.PUBLIC_URL + '/arrow-left.png'} alt={'arrow-left'}></img></button>
          <div className="overflow-auto px-0 mx-0 scrollbar-hidden"
           ref={providerCarouselRef}>
            <div className="mx-auto d-flex">
            { localProviders.length > 0 ?
            localProviders.map
            ((p,index) => 
            (<ProviderBox selectable={true} key={`providerbox${p.name}${p.url}${index}`} name={p.name} url={p.url}/>
            ))    :  <p className='d-flex align-items-center'>Loading</p>   }        
            </div>
      </div>
      <button onClick={scrollRight} className="btn ml-auto"><img src={process.env.PUBLIC_URL + '/arrow-right.png'} alt="arrow-right" />
</button>
    </div>
  </div>
</div>

      
    </div>
    
    <div className='container'>
    <div className='row'>
      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
      <span className='d-flex justify-content-center'>Select Filters Below</span>
        <div className='d-flex flex-wrap justify-content-center'>
          <div className='d-flex flex-column'>
            <span>Filter By: </span>
            <div className='d-flex flex-wrap gap-3'>
                <select className='form-select p-2' value={priceRangeSelected} onChange={handlePriceChange}>
                  <option value="Price">Price</option>
                  <option value="0 - 699">R0 - R699</option>
                  <option value="700 - 999" >R700 - R999</option>
                  <option value="1000+">R1000+</option>
                </select>
                <select className='form-select p-2' value={speedRangeSelected} onChange={handleSpeedChange}>
                  <option value="Speed">Speed</option>
                  <option value="0To20">0Mbps to 20Mbps</option>
                  <option value="20To50" >20 to 50 Mbps</option>
                  <option value="50+">50 Mbps+</option>
                </select>
            </div>
          </div>
          
            
            
          <div>
        
          </div>
          
        </div>
        <div className='d-flex justify-content-center'>
              <SelectedProvidersView/>
          </div>
      </div>
    </div>  
</div>

{ localProviders.length > 0 && localProducts.length > 0 ? 
 <ProductsView Products={localProducts} /> : null }
    
    </>    
    );
}

export default HomeView;