import ProductCard from "./productCard.jsx";
import { useProd } from "../../CRUD/mgmt.js";
import { Navbar } from "./navbar.jsx";
import { useEffect } from "react";

const ProductPage = () => {
    const { getProducts, products } = useProd();

    useEffect(() => {
        getProducts();
    })

    return(
        <div>
        <Navbar />
        { (!products || products.length === 0) ? (<h3>No products</h3>) : (
            products.map((product) => <ProductCard key={product._id} product={product}/>)
        ) }
        </div>
    )
}

export default ProductPage