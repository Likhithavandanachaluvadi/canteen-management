// // src/pages/StudentDashboard/StudentMenu.jsx
// import React, { useEffect, useState } from "react";
// import { useCart } from "../../context/CartContextProvider";
// import "../../styles/GlobalTheme.css";
// import "../../styles/PageLayout.css";
// import "./StudentMenu.css";

// const categories = [
//   "All",
//   "Breakfast",
//   "Lunch",
//   "Dinner",
//   "Snacks",
//   "Drinks",
//   "Chocolates",
// ];

// const StudentMenu = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const { addToCart } = useCart();

//   useEffect(() => {
//     fetch("http://localhost:5000/api/menu")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setMenuItems(data);
//           setFilteredItems(data);
//         } else {
//           setMenuItems([]);
//           setFilteredItems([]);
//         }
//       })
//       .catch((err) => console.error("MENU FETCH ERROR:", err));
//   }, []);

//   const filterCategory = (category) => {
//     setActiveCategory(category);

//     if (category === "All") {
//       setFilteredItems(menuItems);
//     } else {
//       setFilteredItems(menuItems.filter((item) => item.category === category));
//     }
//   };

//   return (
//     <div className="page-container">
//       <h2 className="page-title">🍽️ Today’s Menu</h2>

//       {/* ⭐ Category Buttons */}
//       <div className="category-buttons">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             className={`category-btn ${
//               activeCategory === cat ? "active-category" : ""
//             }`}
//             onClick={() => filterCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* ⭐ Menu Cards Grid */}
//       <div className="menu-grid">
//         {filteredItems.length === 0 ? (
//           <p className="no-items">No items found in this category.</p>
//         ) : (
//           filteredItems.map((item) => (
//             <div key={item._id} className="menu-card">
//               <img
//                 src={item.image || "/default-food.jpg"}
//                 className="menu-image"
//                 alt={item.name}
//               />

//               <h3 className="item-name">{item.name}</h3>
//               <p className="item-price">₹{item.price}</p>

//               <p className="item-desc">
//                 {item.description || "A tasty treat from our canteen 💖"}
//               </p>

//               <button
//                 className="btn btn-peach add-btn"
//                 disabled={!item.available}
//                 onClick={() => addToCart(item)}
//               >
//                 {item.available ? "Add to Cart" : "Unavailable"}
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentMenu;
import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContextProvider";
import "../../styles/GlobalTheme.css";
import "../../styles/PageLayout.css";
import "./StudentMenu.css";

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Drinks",
  "Chocolates",
];

const StudentMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState(""); // ⭐ NEW
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenuItems(data);
          setFilteredItems(data);
        }
      })
      .catch((err) => console.error("MENU FETCH ERROR:", err));
  }, []);

  // ⭐ Filter items based on category + search
  const applyFilters = (category, searchText) => {
    let items = [...menuItems];

    if (category !== "All") {
      items = items.filter((item) => item.category === category);
    }

    if (searchText.trim() !== "") {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredItems(items);
  };

  const filterCategory = (category) => {
    setActiveCategory(category);
    applyFilters(category, searchText);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    applyFilters(activeCategory, text);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">🍽️ Today’s Menu</h2>

      {/* ⭐ SEARCH BAR */}
      <input
        type="text"
        placeholder="🔍 Search for an item..."
        className="search-bar"
        value={searchText}
        onChange={handleSearch}
      />

      {/* ⭐ Category Buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              activeCategory === cat ? "active-category" : ""
            }`}
            onClick={() => filterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ITEMS GRID */}
      <div className="menu-grid">
        {filteredItems.length === 0 ? (
          <p className="no-items">No items found.</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item._id} className="pastel-card menu-card">
              <img
                src={item.image || "/default-food.jpg"}
                className="menu-image"
                alt={item.name}
              />

              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">₹{item.price}</p>

              <button
                className="btn btn-peach add-btn"
                disabled={!item.available}
                onClick={() => addToCart(item)}
              >
                {item.available ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentMenu;
