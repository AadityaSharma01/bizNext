import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: false,
    },
    barcode: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: false,
    },
    soldAt:{
        type: Number,
        default: () => new Date().getMonth + 1,
    }
});

const Product = mongoose.model("bizprod", ProductSchema);
export default Product;