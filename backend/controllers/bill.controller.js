import Bill from "../model/bill.model.js";

// CREATE
export const createBillItem = async (req, res) => {
  const { name, barcode, quantity = 1 } = req.body;

  if (!barcode) {
    return res.status(400).json({ message: "Barcode is required" });
  }

  try {
    const newItem = new Bill({
      username: req.userID, // from authMiddleware
      name,
      barcode,
      quantity
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating bill item:", error);
    res.status(500).json({ message: "Failed to create bill item" });
  }
};

// GET ALL
export const getAllBillItems = async (req, res) => {
  try {
    const bills = await Bill.find({ username: req.userID });
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Failed to fetch bills" });
  }
};

// UPDATE
export const updateBillItems = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBill = await Bill.findOneAndUpdate(
      { _id: id, username: req.userID },
      req.body,
      { new: true }
    );
    if (!updatedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).json({ message: "Failed to update bill" });
  }
};

// DELETE ONE
export const deleteBillItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Bill.findOneAndDelete({
      _id: id,
      username: req.userID
    });
    if (!deleted) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json({ message: "Bill deleted" });
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.status(500).json({ message: "Failed to delete bill" });
  }
};

// DELETE ALL (for that user)
export const deleteBill = async (req, res) => {
  try {
    await Bill.deleteMany({ username: req.userID });
    res.status(200).json({ message: "All bills deleted" });
  } catch (error) {
    console.error("Error deleting all bills:", error);
    res.status(500).json({ message: "Failed to delete all bills" });
  }
};
