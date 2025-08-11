import API from "../../src/axios.js";
import cohereCall from "../../../backend/services/aiComponent.jsx";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DataForChart = async () => {

    try {
        const useres = await API.get('/api/user/me')
        const name = useres.data.user.email.split("@")[0].toLowerCase().trim()

        const { data } = await API.get(`/api/sales?username=${name}`);

        const grouped = {};

        // console.log(data)
        data.forEach(sale => {
            const month = monthNames[sale.monthSold - 1];
            if (!grouped[month]) { grouped[month] = {}};
            if (!grouped[month][sale.name]) grouped[month][sale.name] = 0;

            grouped[month][sale.name] += sale.quantity;
        });


        const allProducts = [...new Set(data.map(s => s.name))];
        const labels = Object.keys(grouped);

        const datasets = allProducts.map((productName, i) => ({
            label: productName,
            data: labels.map(month => grouped[month][productName] || 0),
            backgroundColor: `hsl(${i * 25}, 55%, 50%)`
        }));

        // console.log(JSON.stringify(grouped))
        const aires = await cohereCall(JSON.stringify(grouped))

        return { labels, datasets, aires};

    } catch (error) {
        console.log(error);
    }
};

export default DataForChart;
