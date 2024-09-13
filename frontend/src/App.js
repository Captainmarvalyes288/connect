import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/api/items');
    setItems(response.data);
  };

  const addItem = async () => {
    await axios.post('http://localhost:5000/api/items', { name: newItem });
    setNewItem('');
    fetchItems();
  };

  const updateItem = async (id, newName) => {
    await axios.put(`http://localhost:5000/api/items/${id}`, { name: newName });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  return (
    <div className="crud-container">
      <h1>CRUD Application</h1>
      <div className="input-group">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item name"
        />
        <button className="add-btn" onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <span className="item-name">{item.name}</span>
            <div className="btn-group">
              <button className="update-btn" onClick={() => updateItem(item._id, prompt('New name:'))}>
                Update
              </button>
              <button className="delete-btn" onClick={() => deleteItem(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;