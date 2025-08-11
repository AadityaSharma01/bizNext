import { useState } from "react";
import styles from '../../styles/bill.module.css';
import { useBill } from "../../CRUD/mgmt.js";

const BillCard = ({ bill }) => {
  const { updateBill } = useBill();
  const [quantity, setQuantity] = useState(bill.quantity);

  const handleBillUpdate = async () => {
    const updatedBill = {...bill, quantity}
    updateBill(updatedBill);
  };

  return (
    <div className={styles.card}>
      <span className={styles.barcode}>{bill.barcode}</span>
      
      <input
        className={styles.quantityInput}
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button className={styles.updateBtn} onClick={() => handleBillUpdate()}>
        change
      </button>
    </div>
  );
};

export default BillCard;
