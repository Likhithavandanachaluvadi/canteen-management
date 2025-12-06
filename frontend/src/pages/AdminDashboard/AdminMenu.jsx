import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminMenu.css";
import "../../styles/GlobalTheme.css";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  const [editingItem, setEditingItem] = useState(null);

  const API_URL = "http://localhost:5000/api/menu";

  // Fetch Menu Items
  const fetchMenu = async () => {
    try {
      const res = await axios.get(API_URL);
      setMenuItems(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // ADD ITEM
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        name: newItem.name,
        price: Number(newItem.price),
        description: newItem.description,
        category: newItem.category,
        image: newItem.image,
        available: true
      };

      const res = await axios.post(API_URL, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) alert("Item added ✔");

      setNewItem({ name: "", price: "", description: "", category: "", image: "" });
      fetchMenu();
    } catch (error) {
      console.error("ADD ERROR:", error.response?.data || error);
      alert("Failed to add item");
    }
  };

  // UPDATE ITEM
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_URL}/${editingItem._id}`,
        editingItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) alert("Item updated ✔");

      setEditingItem(null);
      fetchMenu();
    } catch (error) {
      console.error("UPDATE ERROR:", error.response?.data || error);
      alert("Failed to update");
    }
  };

  // DELETE ITEM
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        alert("Item Deleted ✔");
        fetchMenu();
      }
    } catch (error) {
      console.error("DELETE ERROR:", error.response?.data || error);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="admin-menu">
      <h2 className="page-title">🍔 Admin Menu Management</h2>

      <form
        className="menu-form pastel-card"
        onSubmit={editingItem ? handleUpdate : handleAdd}
      >
        {/* NAME */}
        <input
          type="text"
          placeholder="Item Name"
          value={editingItem ? editingItem.name : newItem.name}
          onChange={(e) =>
            editingItem
              ? setEditingItem({ ...editingItem, name: e.target.value })
              : setNewItem({ ...newItem, name: e.target.value })
          }
          required
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price ₹"
          value={editingItem ? editingItem.price : newItem.price}
          onChange={(e) =>
            editingItem
              ? setEditingItem({ ...editingItem, price: e.target.value })
              : setNewItem({ ...newItem, price: e.target.value })
          }
          required
        />

        {/* CATEGORY DROPDOWN — FIXED ✔ */}
        <select
          className="category-select"
          value={editingItem ? editingItem.category : newItem.category}
          onChange={(e) =>
            editingItem
              ? setEditingItem({ ...editingItem, category: e.target.value })
              : setNewItem({ ...newItem, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
          <option value="Drinks">Drinks</option>
          <option value="Chocolates">Chocolates</option>
        </select>

        {/* IMAGE URL */}
        <input
          type="text"
          placeholder="Image URL"
          value={editingItem ? editingItem.image : newItem.image}
          onChange={(e) =>
            editingItem
              ? setEditingItem({ ...editingItem, image: e.target.value })
              : setNewItem({ ...newItem, image: e.target.value })
          }
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={editingItem ? editingItem.description : newItem.description}
          onChange={(e) =>
            editingItem
              ? setEditingItem({ ...editingItem, description: e.target.value })
              : setNewItem({ ...newItem, description: e.target.value })
          }
        />

        {/* SUBMIT BUTTON */}
        <button className="btn btn-purple" type="submit">
          {editingItem ? "Update Item" : "Add Item"}
        </button>

        {editingItem && (
          <button
            type="button"
            className="btn btn-pink"
            onClick={() => setEditingItem(null)}
          >
            Cancel
          </button>
        )}
      </form>

      {/* MENU LIST */}
      <div className="menu-list">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item._id} className="menu-card pastel-card">
              <img src={item.image} className="menu-card-img" alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p>{item.description}</p>

              <div className="menu-actions">
                <button className="btn btn-blue" onClick={() => setEditingItem(item)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-pink" onClick={() => handleDelete(item._id)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
