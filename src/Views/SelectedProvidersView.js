import { useContext, useEffect, useState } from "react";
import PromoFilterContext from "../React_Context_API/PromoFilterContext";
import ProviderBox from "../Components/ProviderBox/ProviderBox";
import { ProvidersSelectedContext } from "../React_Context_API/FibreProductsContext";


const SelectedProvidersView = () => {

    const [selectedProviders,setSelectedProviders] = useState([]);

    //const { providerFilterSelection } = useContext(PromoFilterContext);
    const [providersSelected] = useContext(ProvidersSelectedContext);

    useEffect(() => {
        // some providers not reacting correctly
        if(providersSelected && providersSelected.length > 0)
        {
            // // Not best practise filter
            setSelectedProviders(providersSelected)
            // setSelectedProviders(providerFilterSelection.providersSelected.map((provider) => {
            //     return providerFilterSelection.providers.filter((providerFromGlobal) => providerFromGlobal.name === provider)
            // }))
        }
    },[providersSelected])


return (
    <>
        { selectedProviders.map((providerSelected) => 
                (<ProviderBox selectable={false} key={providerSelected.name} name={providerSelected.name} url={providerSelected.url}/> )
              ) }
    </>
);


}

export default SelectedProvidersView