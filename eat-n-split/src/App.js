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
  const [showAddFriend, setShowAddFriend] = useState(false);
  function HandleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        {" "}
        <FriendsList friends={initialFriends} />
        {showAddFriend && <FormAddFriend />}
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
  return (
    <li>
      <img src={image} alt="friendimage" />
      <h3>{Namef}</h3>
      <p>{Message({ Namef, balancef })}</p>
      <AddButton>Select</AddButton>
    </li>
  );
}
function Message({ Namef, balancef }) {
  if (balancef === 0) return <h4>You and {Namef} are even</h4>;
  else if (balancef > 0)
    return (
      <h4 className="red">
        {Namef} owes you {Math.abs(balancef)}$
      </h4>
    );
  else if (balancef < 0)
    return (
      <h4 className="green">
        You owe {Namef} {Math.abs(balancef)}$
      </h4>
    );
}

function FormAddFriend() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  return (
    <form className="form-add-friend">
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
