import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    barcode:{
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    monthSold: {
        type: Number,
        default: () => new Date().getMonth() + 1
    }
});

const Sale = mongoose.model('bizsales', saleSchema);
export default Sale;