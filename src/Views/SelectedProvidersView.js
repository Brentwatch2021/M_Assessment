import { useContext, useEffect, useState } from "react";
import ProviderBox from "../Components/ProviderBox/ProviderBox";
import { ProvidersSelectedContext } from "../React_Context_API/FibreProductsContext";


const SelectedProvidersView = () => {

    const [selectedProviders,setSelectedProviders] = useState([]);
    const [providersSelected] = useContext(ProvidersSelectedContext);

    useEffect(() => {
        
        if(providersSelected)
        {
            setSelectedProviders(providersSelected)
        }
    },[providersSelected])


return (
    <>
        <div className="d-none d-md-block">
            <br/>
            <br/>
        { selectedProviders.map((providerSelected) => 
                (<ProviderBox selectable={false} key={providerSelected.name} name={providerSelected.name} url={providerSelected.url}/> )
              ) }
            <br/>
            <br/>
        </div>
    </>
);


}

export default SelectedProvidersView