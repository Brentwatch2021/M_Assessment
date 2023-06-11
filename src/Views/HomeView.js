import React,{useState,useContext, useEffect} from 'react'
import PromoFilterContext from '../React_Context_API/PromoFilterContext';
import Card from '../Components/Card/Card';

const HomeView = (props) => {

    const [providers, setlocalProviders] = useState([]);
    const [products, setlocalProducts] = useState([]);
    const { providerFilterSelection } = useContext(PromoFilterContext);


    const handlePriceChange = () => {

    }

    const handleSpeedChange = () => {

    }

    const handleDealTypeChanged = () => {

    }

    useEffect(() => {

        if(providerFilterSelection.providers && providerFilterSelection.providers.length > 0)
        {
            setlocalProviders(providerFilterSelection.providers);
        }

        if(providerFilterSelection.products && providerFilterSelection.products.length > 0)
        {
            setlocalProducts(providerFilterSelection.products);
        }

        },[providerFilterSelection.providers,providerFilterSelection.products])

    return(
        <>
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
{/* <ProductsView summarizedProducts={summarizedProducts}/> */}
    
    </>    
    );
}

export default HomeView;