import React, {useContext} from 'react';
import './ProviderBox.css'
import { ProvidersSelectedContext } from '../../React_Context_API/FibreProductsContext';

const ProviderBox = (props) => {

    const [providersSelected, setProvidersSelected] = useContext(ProvidersSelectedContext);

    const handleCheckBoxSelected = (event) =>
    {
        const checkboxId = event.target.id;
        const url = event.target.getAttribute('url_for_state_update');
        const name = event.target.getAttribute('name_for_state_update');

        if (event.target.checked) 
        {
          setProvidersSelected([...providersSelected,{code:name,name:name,url:url}]);
        } 
        else 
        {
          setProvidersSelected(providersSelected.filter((selectedProvider) => selectedProvider.name !== checkboxId))
        }

    }


  return (
    <>{ props.selectable ?
     <div className="checkbox-container">
        <input className='checkbox_styled' onChange={handleCheckBoxSelected} type="checkbox" url_for_state_update={props.url} name_for_state_update={props.name} id={props.name} />  
         <label style={{ backgroundImage: `url(${props.url})`}} htmlFor={props.name}></label> 
    </div> : <div className='checkbox-container'>  <label style={{backgroundImage: `url(${props.url})`, opacity: 1, filter: 'grayscale(0%)'}}></label> </div> }
    </>
  );
};

export default ProviderBox;