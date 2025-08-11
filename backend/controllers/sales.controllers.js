import Sale from '../model/sales.model.js'
import Product from '../model/product.model.js'

export const getSales = async (req, res) => {
    // const searchname = req.originalUrl.split('=')[1];
    try {
        const sale = await Sale.find({username: req.userID})
        res.json(sale)
    } catch (error) {
        console.log(error)
    }
}
// POST new sale
export const postSales = async (req, res) => {
    try {
        const { barcode, quantity } = req.body;
        const product = await Product.findOne({ username: req.userID , barcode: barcode });

        if (!product) {
            return res.status(404).json({ error: "update the product name in the products-list" });
        }

        const newSale = new Sale({
            username: req.userID,
            name: product.name,
            barcode: barcode,
            quantity: quantity,
            monthSold: new Date().getMonth() + 1
        });

        await newSale.save();
        res.json(newSale)

    } catch (error) {
        res.status(500).json({ message: "Failed to create sale", error });
    }
};

export const putSales = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updateSale = await Sale.findOneAndUpdate({_id: id, username: req.userID}, updatedData, { new: true });
        // const updateSale = await Sale.findByIdAndUpdate(id, { $inc: { quantity: billItem.quantity } }, { new: true });

        res.status(200).json(updateSale);
    } catch (error) {
        res.status(500).json({ message: "Failed to update sale", error });
    }
};

export const deleteSales = async (req, res) => {
    try {
        await Sale.deleteMany({username: req.userID})
    } catch (error) {

    }
}

export const getMonthlySalesChartData = async (req, res) => {
    try {
        const sales = await Sale.find({username: req.userID});

        const monthlyData = {};

        sales.forEach(sale => {
            const month = sale.monthSold;
            const productName = sale.name;
            const quantity = sale.quantity;

            if (!monthlyData[month]) {
                monthlyData[month] = {};
            }

            if (!monthlyData[month][productName]) {
                monthlyData[month][productName] = 0;
            }

            monthlyData[month][productName] += quantity;
        });

        const chartData = Object.entries(monthlyData).map(([month, productSales]) => ({
            month,
            data: Object.entries(productSales).map(([name, total]) => ({
                name,
                total
            }))
        }));

        res.status(200).json(chartData);
    } catch (error) {
        res.status(500).json({ message: "Chart data generation failed", error });
    }
};