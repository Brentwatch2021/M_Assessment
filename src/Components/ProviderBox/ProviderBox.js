import React, {useContext, useState} from 'react';
import { useSearchParams } from 'react-router-dom'
import './ProviderBox.css'
import PromoFilterContext from '../../React_Context_API/PromoFilterContext';
import { ProvidersSelectedContext } from '../../React_Context_API/FibreProductsContext';
//import { useHistory, useLocation } from 'react-router-dom';


// background-image: url('path/to/custom-image.png'); checkbox-container label
const ProviderBox = (props) => {

    // React Context API
    //const { providerSelection, updateProviderSelection} = useContext(PromoFilterContext);
    //const { providerFilterSelection, updateFilterSelection } = useContext(PromoFilterContext);
    
    //const selectableBox = `.checkbox-container { position: relative;display: inline-block;margin-right: 10px;}.checkbox-container input[type="checkbox"] {display: none;}.checkbox-container label { backgroundImage: url(${props.url}) display: inline-block;width: 150px;height: 80px;border-radius: 10px;background-size: cover;border: 2px solid #ccc;cursor: pointer;opacity: 0.30;}.checkbox-container input[type="checkbox"]:checked + label {border-color: blue; /* Custom selected border color */opacity: 1;}`

    //const [searchParams, setSearchParams] = useSearchParams();

    const [providersSelected, setProvidersSelected] = useContext(ProvidersSelectedContext);

    const handleCheckBoxSelected = (event) =>
    {
        const checkboxId = event.target.id;
        const url = event.target.getAttribute('url_For_State_Update');
        const name = event.target.getAttribute('name_For_State_Update');

        if (event.target.checked) 
        {
          //searchParams.set('selectedProviders', 'none');      
          // let selectedProviders = searchParams.get('selectedProviders');
          // if(selectedProviders === 'none')
          // {
          //   selectedProviders = ''
          // }
          // const updatedSelectedProviders = selectedProviders + checkboxId;
          // searchParams.set('selectedProviders',checkboxId);
          // setSearchParams(searchParams);

          //updateProviderSelection([...providerSelection,checkboxId]);
          // const providerFilterSelectionUpdated = {
          //   providersSelected:[...providerFilterSelection.providersSelected, {code:name,name:name,url:url}],
          //   providers:providerFilterSelection.providers,
          //   products:providerFilterSelection.products,
          //   SpeedRangeSelected:providerFilterSelection.SpeedRangeSelected,
          //   PriceRangeSelected:providerFilterSelection.PriceRangeSelected
          // }
          // updateFilterSelection(providerFilterSelectionUpdated);
          setProvidersSelected([...providersSelected,{code:name,name:name,url:url}]);




          // get the paramter selectedProviders



        } 
        else 
        {
          // const updatedProviders = ;
          // //updateProviderSelection(updatedProviders);
          
          // const providerFilterSelectionUpdated = {
          //   providersSelected:updatedProviders,
          //   providers:providerFilterSelection.providers,
          //   products:providerFilterSelection.products,
          //   SpeedRangeSelected:providerFilterSelection.SpeedRangeSelected,
          //   PriceRangeSelected:providerFilterSelection.PriceRangeSelected
          // }
          // updateFilterSelection(providerFilterSelectionUpdated);


          setProvidersSelected(providersSelected.filter((selectedProvider) => selectedProvider.name !== checkboxId))
        }

    }


  return (
    <>{ props.selectable ?
     <div className="checkbox-container">
          <input className='checkbox_styled' onChange={handleCheckBoxSelected} type="checkbox" url_For_State_Update={props.url} name_For_State_Update={props.name} id={props.name} /> 
         <label style={{ backgroundImage: `url(${props.url})`}} htmlFor={props.name}></label> 
    </div> : <div className='checkbox-container'>  <label style={{backgroundImage: `url(${props.url})`, opacity: 1}}></label> </div> }
    </>
  );
};

export default ProviderBox;