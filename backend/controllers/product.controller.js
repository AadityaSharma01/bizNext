import Product from "../model/product.model.js";

export const postProduct = async (req, res) => {
    try {
        const product = new Product({
            username: req.userID,
            ...req.body
        });
        await product.save();
        res.status(201).json({ message: "Product added", product });
    } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findOneAndDelete({
            username: req.userID,
            _id: req.params.id
        });
        if (!deleted) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted", deleted });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
};

export const getProduct = async (req, res) => {
    console.log("from product controller getProduct", req.userID);
    try {
        const products = await Product.find({ username: req.userID });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedProd = await Product.findOneAndUpdate(
            { _id: id, username: req.userID },
            updatedData,
            { new: true }
        );
        res.json(updatedProd);
    } catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
};
