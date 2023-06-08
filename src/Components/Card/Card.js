import React, {useContext, useState} from 'react';

import './Card.css'
import PromoFilterContext from '../../React_Context_API/PromoFilterContext';

// background-image: url('path/to/custom-image.png'); checkbox-container label
const Card = (props) => {

    // React Context API
    //const { providerSelection, updateProviderSelection} = useContext(PromoFilterContext);
    const { providerFilterSelection, updateFilterSelection } = useContext(PromoFilterContext);


    const handleCheckBoxSelected = (event) =>
    {
        const checkboxId = event.target.id;

        if (event.target.checked) 
        {
          
          //updateProviderSelection([...providerSelection,checkboxId]);
          const providerFilterSelectionUpdated = {
            providersSelected:[...providerFilterSelection.providersSelected, checkboxId],
            SpeedRangeSelected:providerFilterSelection.SpeedRangeSelected,
            PriceRangeSelected:providerFilterSelection.PriceRangeSelected
          }
          updateFilterSelection(providerFilterSelectionUpdated);
        } 
        else 
        {
          const updatedProviders = providerFilterSelection.providersSelected.filter((itemProvider) => itemProvider !== checkboxId);
          //updateProviderSelection(updatedProviders);
          
          const providerFilterSelectionUpdated = {
            providersSelected:updatedProviders,
            SpeedRangeSelected:providerFilterSelection.SpeedRangeSelected,
            PriceRangeSelected:providerFilterSelection.PriceRangeSelected
          }
          updateFilterSelection(providerFilterSelectionUpdated);
        }

    }


  return (
    <div class="checkbox-container">
        <input onChange={handleCheckBoxSelected} type="checkbox" id={props.name} />
        <label style={{ backgroundImage: `url(${props.url})`}} htmlFor={props.name}></label>
    </div>
  );
};

export default Card;