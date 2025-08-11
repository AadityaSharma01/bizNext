import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: false,
    },
    barcode:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        default: 1,
    }
})

const Bill = mongoose.model("bizbill", billSchema)
export default Bill;