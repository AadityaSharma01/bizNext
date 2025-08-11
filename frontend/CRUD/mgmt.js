import { create } from 'zustand';
import API from '../src/axios.js';

export const useBill = create((set, get) => ({

    // retrieving the username
    // username: null,

    // fetchUsername: async () => {
    //     try{
    //         const res = await API("/api/user/me")
    //         const username = res.data.user.email.split("@")[0].toLowerCase().trim()
    //     }catch(err){
    //         console.log("couldnt fetch the username", err)
    //     }
    // },
    
    //bills queries go here

    bills: [],
    setbill: (bills) => set({ bills }),

    updateBill: async (updatedBill) => {
        try {
            const res = (await API.put(`/api/bill/${updatedBill._id}`, {
                ...updatedBill,
                quantity: updatedBill.quantity,
            })).data;

            const updatedBills = get().bills.map((bill) =>
                bill._id === updatedBill._id ? res : bill
            );

            set({ bills: updatedBills });

        } catch (error) {
            console.log("Failed to update bill:", error);
        }
    },

    fetchBill: async () => {
        const { data } = await API.get("/api/bill")
        set({ bills: data })
    },

    deleteBill: async () => {
        await API.delete(`/api/bill`)
        set({ bills: [] })
    },

    deleteBillItem: async (bid) => {
        try {
            await API.delete(`/api/bill/${bid}`);
            set((state) => ({
                bills: state.bills.filter(bill => bill._id !== bid)
            }));
        } catch (error) {
            console.error("Failed to delete bill:", error);
        }
    }

}))

//sales queries go here

export const useSale = create((set) => ({
    sales: [],
    setSale: (sales) => set({ sales }),

    deleteSales: async () => {
        await API.delete(`/api/sales`)
        set({ sales: [] })
    }
}))

//product queries go here

export const useProd = create((set, get) => ({
    products: [],
    setProduct: (products) => set({ products }),

    postProducts: async (newProd) => {
        try {
            const res = (await API.post(`/api/product`, newProd)).data
            set((state) => ({ products: [...state.products, res.product] }))
        } catch (err) {
            console.error("Failed to post product:", err)
        }
    },

    updateProducts: async (updatedProduct) => {
        try {
            const res = (await API.put(`/api/product/${updatedProduct._id}`, {
                ...updatedProduct,
                name: updatedProduct.name
            })).data

            const updatedProducts = get().products.map((product) =>
                product._id === updatedProduct._id ? res : product)

            console.log(updatedProducts)
            set({ products: updatedProducts })
        } catch (error) {
            console.log(error)
        }
    },

    getProducts: async () => {
        const { data } = (await API.get(`/api/product`))
        set({ products: data })
    }
}))