import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import Card from './Components/Card/Card';
import { useDispatch } from 'react-redux'
import setProviders from './Redux_Toolkit/providersSlice'
import PromoFilterContext from './React_Context_API/PromoFilterContext';
import ProductsView from './Views/ProductsView';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetProviders_And_Products } from './API/apiUtilities';


function App() {

  const [providers,setProviderss] = useState([]);
  //const [providerSelection, setProviderSelection] = useState([]);
  const [providerFilterSelection,setProviderFilterSelection] = useState({
    dealTypeSelected:'FTTH-FREESETUP-FREEROUTER',
    providersSelected:[],
    SpeedRangeSelected:'Speed',
    PriceRangeSelected:'Price'
  });

  

  const [promoProducts,setProducts] = useState([]);
  const [summarizedProducts, setSummarizedProducts] = useState([]);

  const updateFilterSelection = (newFilterSelection) => 
  {
    setProviderFilterSelection(newFilterSelection);
  }



  useEffect(() => {

    //GetProviders_s('FTTH-FREESETUP-FREEROUTER');
    //GetProviders_s('FTTH-PREPAID');

  
    GetPromoContent();
  },[])
  

  const GetPromoContent = async () => {
        const { summarizedProviders, summarizedProducts} = await GetProviders_And_Products('FTTH-FREESETUP-FREEROUTER');
        
        if(summarizedProviders)
        {
          setProviderss(summarizedProviders);
        }
        
        if(summarizedProducts)
        {
          setSummarizedProducts(summarizedProducts);
        }
  }

  

  const handlePriceChange = (event) =>
  {
    const priceSelected = event.target.value;

    const providerFilterSelectionUpdated = {
      dealTypeSelected:providerFilterSelection.dealTypeSelected,
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
      dealTypeSelected:providerFilterSelection.dealTypeSelected,
      providersSelected:providerFilterSelection.providersSelected,
      SpeedRangeSelected:speedSelected,
      PriceRangeSelected:providerFilterSelection.PriceRangeSelected
    }

    setProviderFilterSelection(providerFilterSelectionUpdated);
  }

  const handleDealTypeChanged = (event) => {
    const dealTypeSelected = event.target.value;

    const providerFilterSelectionUpdated = {
      dealTypeSelected:dealTypeSelected,
      providersSelected:providerFilterSelection.providersSelected,
      SpeedRangeSelected:providerFilterSelection.SpeedRangeSelected,
      PriceRangeSelected:providerFilterSelection.PriceRangeSelected
    }

    //setProviderFilterSelection(providerFilterSelectionUpdated);

  }
 

  return (
    // <PromoFilterContext.Provider value={{ providerSelection, updateProviderSelection}}>
    <PromoFilterContext.Provider value={{ providerFilterSelection, updateFilterSelection}}>
    <div className="App">
      <h1>Fibre Products</h1>
      <h4>Select a Fibre infrastructure provider below browse the products available and complete a coverage search</h4>
      {providers.map((p) => (<><Card key={p.name} name={p.name} url={p.url}/></>))}
      
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div className='container'>
    <div className='row'>
      <div className='col-10 col-sm-10 col-md-12 col-lg-12 col-xl-8'>
        <div className='d-flex flex-wrap justify-content-between'>
          <div className='d-flex flex-column'>
            <span>Filter By: </span>
            <div className='d-flex flex-wrap gap-3'>
                <select className='p-2' value={providerFilterSelection.PriceRangeSelected} onChange={handlePriceChange}>
                  <option value="Price">Price</option>
                  <option value="0 - 699">R0 - R699</option>
                  <option value="700 - 999" >R700 - R999</option>
                  <option value="1000+">R1000+</option>
                </select>
                <select className='p-2' value={providerFilterSelection.SpeedRangeSelected} onChange={handleSpeedChange}>
                  <option value="Speed" selected>Speed</option>
                  <option value="0To20">0Mbps to 20Mbps</option>
                  <option value="20To50" >20 to 50 Mbps</option>
                  <option value="50+">50 Mbps+</option>
                </select>
            </div>
          </div>
          <div className='col-6'>
            <div className='d-flex flex-column'>
              <span>Deal Type: </span>
                {/* <span className='bg-primary text-white p-3 text-center'>FREE Set Up + Router</span> */}
                <select className='p-2' value={providerFilterSelection.DealTypeSelected} onChange={handleDealTypeChanged}>
                  <option value="FTTH-FREESETUP-FREEROUTER" selected>FREE Set Up + Router</option>
                  <option value="FTTH-PREPAID">Prepaid</option>
                </select>
            </div>
            </div>
        </div>
      </div>
    </div>
      
    </div>
    <ProductsView summarizedProducts={summarizedProducts}/>
    </PromoFilterContext.Provider>

    // <PromoFilterContext.Provider value={{ providerFilterSelection, updateFilterSelection}}>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomeView />}>
    //       <Route path="/products/:selectedProviders?/:price?/:speed" element={<ProductsView />} />
    //     </Route>
    //   </Routes>
    // </Router>
    // </PromoFilterContext.Provider>
  );

  
}

export default App;
