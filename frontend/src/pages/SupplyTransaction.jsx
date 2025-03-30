import { useState, useEffect } from "react";
import axios from "axios";

const SupplyTransaction = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]);
  const [formData, setFormData] = useState({
    Supplier_ID: "",
    Item_ID: "",
    Price: "",
  });

  useEffect(() => {
    fetchSuppliers();
    fetchItems();
    fetchSupplierItems();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("/api/suppliers");
      setSuppliers(res.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchSupplierItems = async () => {
    try {
      const res = await axios.get("/api/supplier-items");
      setSupplierItems(res.data);
    } catch (error) {
      console.error("Error fetching supplier items:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/supplier-items", formData);
      alert("✅ Supplier-Item linked successfully!");
      setFormData({ Supplier_ID: "", Item_ID: "", Price: "" });
      fetchSupplierItems();
    } catch (error) {
      console.error("Error linking supplier and item:", error);
    }
  };

  return (
    <div>
      <h2>Supply Transaction</h2>
      <form onSubmit={handleSubmit}>
        <select name="Supplier_ID" value={formData.Supplier_ID} onChange={handleChange} required>
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.Supplier_ID} value={supplier.Supplier_ID}>
              {supplier.Name}
            </option>
          ))}
        </select>

        <select name="Item_ID" value={formData.Item_ID} onChange={handleChange} required>
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.Item_ID} value={item.Item_ID}>
              {item.Name}
            </option>
          ))}
        </select>

        <input type="number" name="Price" placeholder="Price" value={formData.Price} onChange={handleChange} required />

        <button type="submit">Add Transaction</button>
      </form>

      <h3>Supplier-Item Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {supplierItems.map((record, index) => (
            <tr key={index}>
              <td>{record.SupplierName}</td>
              <td>{record.ItemName}</td>
              <td>${record.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplyTransaction;
