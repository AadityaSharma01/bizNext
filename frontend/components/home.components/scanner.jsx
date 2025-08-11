import BarcodeScanner from "./barcodescanner.jsx";
import { useState, useEffect } from "react";
import styles from "../../styles/home.module.css";
import API from "../../src/axios.js";
import { useBill, useSale } from "../../CRUD/mgmt.js";
import BillCard from "./billCard.jsx";
import { Navbar } from "./navbar.jsx";

const ScannerPage = () => {
	const { deleteSales } = useSale();
	const { fetchBill, bills, deleteBill } = useBill();
	const [scannedCode, setScannedCode] = useState(null);

	// ✅ Fetch initial bill data
	useEffect(() => {
		fetchBill();
	}, []);

	// ✅ Handle scan
	const handleScan = (code) => {
		if (code !== scannedCode) {
			setScannedCode(code);
		}
	};

	// ✅ Update or add to bill collection
	useEffect(() => {
		if (!scannedCode) return;

		const updateBill = async () => {
			try {
				const { data } = await API.get("/api/bill");
				const existingItem = data.find(item => item.barcode === scannedCode);
				
				if (existingItem) {
					await API.put(`/api/bill/${existingItem._id}`, {
						quantity: existingItem.quantity + 1,
					});
				} else {
					const payload = {
						barcode: scannedCode,
						quantity: 1,
					}
					console.log("Posting bill payload:", payload);
					await API.post("/api/bill", payload);
				}

				fetchBill(); // Refresh bill list after update
			} catch (error) {
				console.error("Failed to update bill:", error);
			}
		};

		updateBill();
	}, [scannedCode, fetchBill]);

	// ✅ Push bill items to sales collection
	const billToSaleAndProd = async () => {
		try {
			const resSale = (await API.get(`/api/sales`)).data;
			const resBill = (await API.get(`/api/bill`)).data;
			const resProd = (await API.get(`/api/product`)).data;

			const currentMonth = new Date().getMonth() + 1;

			for (const billItem of resBill) {
				const existingItem = resSale.find(
					(saleItem) =>
					(saleItem.barcode === billItem.barcode &&
						saleItem.date === billItem.date)
				);

				if (existingItem) {
					await API.put(`/api/sales/${existingItem._id}`, {
						quantity: existingItem.quantity + billItem.quantity,
					});

				} else if(!existingItem) {
					const payload = {
						name: "",
						barcode: billItem.barcode,
						quantity: billItem.quantity,
						monthSold: currentMonth,
					}
					console.log("Posting sale payload:", payload);
					await API.post("/api/sales/postSales", payload
					).then(() => console.log("reqsent"))
						.catch((err) => console.log( err, "update the product name in the products-list" ))
				}
			}

			for (const billItem of resBill) {
				const existingItem = resProd.find(
					prodItem =>
						prodItem.barcode === billItem.barcode
				);

				if (!existingItem) {
					console.log(billItem.barcode)
					try {
						await API.post('/api/product', {
							name: "",
							barcode: billItem.barcode,
							price: 0,
							soldAt: currentMonth,
						})

					} catch (error) {
						console.log(error)
					}
				}
			}
			fetchBill(); // Refresh bill list after generating
		} catch (err) {
			console.error("Failed to generate bill:", err);
		}
	};

	return (
		<>
			<Navbar />
			<div className={styles.scannerPage}>
				<h3 className={styles.scannerTitle}>Scan a Barcode</h3>

				<div className={styles.videoWrapper}>
					<BarcodeScanner onScan={handleScan} />
				</div>

				<button className={styles.billToSale} onClick={billToSaleAndProd}>
					Generate Bill {/*pushes items from the billDB to the salesDB*/}
				</button>
				{scannedCode && (
					<>
						<p className={styles.scannedCode}>Scanned: {scannedCode}</p>
					</>
				)}

				{bills.length === 0 ? (
					<h4>Nothing scanned!</h4>
				) : (
					bills.map(bill => (
						<BillCard key={bill._id} bill={bill} />
					))
				)}

				{bills.length > 0 && (
					<>
						<button className={styles.scannedCode} onClick={deleteBill}>
							Delete All Items
						</button>
						<button className={styles.scannedCode} onClick={deleteSales}>Delete all sales</button>
					</>
				)}

			</div>
		</>
	);
};

export default ScannerPage;
