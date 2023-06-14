import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductFromApi } from "../../API/apiUtilities";
import Card from "../../Components/Card/Card";

const ProductDetailsView = (props) => 
{
    const { promoCodeForProduct, id_For_Product } = useParams();
    const [product,setProduct] = useState({});

    useEffect(() => {
        
        GetProduct();
    },[])

    const GetProduct = async () => {
        const product = await GetProductFromApi(id_For_Product,promoCodeForProduct);
        if(product)
        {
            setProduct(product);
        }

    }

    return(
        <div className="container-fluid">
            <div className="row m-5">
                </div>
                    {product !== null ? (
                    <Card Fullscreen={true} key={`${product.productName}${product.productCode}productkey`} product={product} />
                    ) : null}
        </div>
    );
}

export default ProductDetailsView;