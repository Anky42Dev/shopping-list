import { useEffect, useState } from "react";
import ShoppingItem from "./ShoppingItem.jsx";

const STORAGE_KEY = "rpg-shop-2";

const startItems = [
  { id: 1, name: "Хлеб", icon: "bread", price: 5, qty: 2 },
  { id: 2, name: "Окорок", icon: "ham", price: 15, qty: 1 },
  { id: 3, name: "Яблоки", icon: "apple", price: 3, qty: 5 },
  { id: 4, name: "Сыр", icon: "cheese", price: 8, qty: 1 },
];

function loadItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {}
  return startItems;
}

function App() {
  const [items, setItems] = useState(loadItems);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {}
  }, [items]);

  function plus(id) {
    setItems(items.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  }

  function minus(id) {
    setItems(items.map((item) => (item.id === id ? { ...item, qty: Math.max(item.qty - 1, 0) } : item)));
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function buy() {
    if (total === 0) {
      setMessage("Корзина пуста!");
    } else {
      setMessage("Покупка совершена! Потрачено " + total + " G");
      setItems(items.map((item) => ({ ...item, qty: 0 })));
    }
    setTimeout(() => setMessage(""), 2500);
  }

  return (
    <div className="window">
      <div className="title" role="img" aria-label="Список покупок"></div>

      <ul>
        {items.map((item) => (
          <ShoppingItem
            key={item.id}
            id={item.id}
            name={item.name}
            icon={item.icon}
            price={item.price}
            qty={item.qty}
            onPlus={plus}
            onMinus={minus}
          />
        ))}
      </ul>

      <div className="bottom">
        <div className="total">
          Общая стоимость: {total}
          <span className="coin"></span>
        </div>
        <button className="buy" title="Сделать покупки" aria-label="Сделать покупки" onClick={buy}></button>
      </div>

      {message !== "" && <div className="message">{message}</div>}
    </div>
  );
}

export default App;
