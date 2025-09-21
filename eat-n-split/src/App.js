import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function AddButton({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  function HandleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function HandleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  return (
    <div className="app">
      <div className="sidebar">
        {" "}
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={HandleAddFriend} />}
        <AddButton onClick={HandleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </AddButton>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          Namef={friend.name}
          balancef={friend.balance}
          image={friend.image}
        />
      ))}
    </ul>
  );
}
function Friend({ Namef, balancef, image }) {
  function Message() {
    if (balancef === 0) return <p>You and {Namef} are even</p>;
    else if (balancef > 0)
      return (
        <p className="red">
          {Namef} owes you {Math.abs(balancef)}$
        </p>
      );
    else if (balancef < 0)
      return (
        <p className="green">
          You owe {Namef} {Math.abs(balancef)}$
        </p>
      );
  }
  return (
    <li>
      <img src={image} alt="friendimage" />
      <h3>{Namef}</h3>
      <p>{Message({ Namef, balancef })}</p>
      <AddButton>Select</AddButton>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !{ image }) return;

    const id = crypto.randomUUID();
    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };
    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <AddButton>Add friend</AddButton>
    </form>
  );
}
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2> Split a bill with X </h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🕴️ Your expenses</label>
      <input type="text" readOnly value={7} />

      <label>X's expense</label>
      <input type="text" />

      <label>🤑 expense</label>
      <select>
        <option value="user"> you </option>
        <option value="friend"> x </option>
      </select>
      <AddButton>Split bill</AddButton>
    </form>
  );
}
