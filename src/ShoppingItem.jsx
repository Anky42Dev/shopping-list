function ShoppingItem({ id, name, icon, price, qty, onPlus, onMinus }) {
  return (
    <li className={qty === 0 ? "zero" : ""}>
      <span className={"icon " + icon}></span>
      <span className="name">{name}</span>
      <span className="price">{price} G</span>
      <button className="btn" title="Добавить в корзину" onClick={() => onPlus(id)}>
        +
      </button>
      <button className="btn" title="Убрать из корзины" onClick={() => onMinus(id)}>
        −
      </button>
      <span className="qty">{qty} шт.</span>
    </li>
  );
}

export default ShoppingItem;
