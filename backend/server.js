import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'

import productrouter from './routers/product.routes.js'
import tokenrouter from './routers/login.routes.js'
import salerouter from './routers/sales.routes.js'
import billrouter from './routers/bill.routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log(import.meta.url)
// console.log(fileURLToPath(import.meta.url))
// console.log(__dirname)
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', tokenrouter)
app.use('/api/sales', salerouter)
app.use('/api/bill', billrouter)
app.use('/api/product', productrouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running at http://localhost:${process.env.PORT}`);
});