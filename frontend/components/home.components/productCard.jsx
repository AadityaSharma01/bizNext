import { useState } from "react";
import { useProd } from "../../CRUD/mgmt.js";
import styles from "../../styles/product.module.css";

const ProductCard = ({ product }) => {
    const [prodName, setProdName] = useState(product.name);
    const { updateProducts } = useProd();

    const handleNameChange = async () => {
        const updatedProd = { ...product, name: prodName };
        await updateProducts(updatedProd);
    };

    return (
        <div className={styles.card}>
            <input
                placeholder={product.barcode}
                type="text"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                className={styles.input}
            />
            <button onClick={handleNameChange} className={styles.button}>
                Update Name
            </button>
        </div>
    );
};

export default ProductCard;