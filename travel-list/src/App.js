import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "boxers", quantity: 5, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function Handleitems(item) {
    setItems((items) => [...items, item]);
  }
  function Deleteitems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function ToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function ClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to clear everything??"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={Handleitems} />
      <PackingList
        items={items}
        onDeleteItems={Deleteitems}
        ToggleItem={ToggleItem}
        ClearItems={ClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1> 🌴 Far Away 💼 </h1>;
}
function Form({ onAddItems }) {
  const [description, setDiscription] = useState("");
  const [quantity, setquantity] = useState(1);

  function HandleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDiscription("");
    setquantity(1);
  }

  return (
    <form className="add-form" onSubmit={HandleSubmit}>
      <h3>What do you need for your trip😍</h3>
      <select
        value={quantity}
        onChange={(e) => setquantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDiscription(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, ToggleItem, ClearItems }) {
  const [sortBy, setsortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            ToggleItem={ToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setsortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={ClearItems}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, ToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => ToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
        {" "}
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        💼 You have {numItems} items on your list , and you already packed{" "}
        {numPacked} ({percentage}%)
      </em>
    </footer>
  );
}
