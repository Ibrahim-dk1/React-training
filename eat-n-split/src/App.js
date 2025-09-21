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
  const [selectedFriend, setSelectedFriend] = useState("");
  function HandleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function HandleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function HandleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    //    setSelectedFriend(friend);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        {" "}
        <FriendsList
          friends={friends}
          onSelection={HandleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={HandleAddFriend} />}
        <AddButton onClick={HandleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </AddButton>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}{" "}
    </div>
  );
}
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend} // 👈 pass whole object
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  const { name, balance, image } = friend; // destructure for convenience

  function Message() {
    if (balance === 0) return <p>You and {name} are even</p>;
    else if (balance > 0)
      return (
        <p className="red">
          {name} owes you {Math.abs(balance)}$
        </p>
      );
    else
      return (
        <p className="green">
          You owe {name} {Math.abs(balance)}$
        </p>
      );
  }

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt="friendimage" />
      <h3>{name}</h3>
      {Message()}
      <AddButton onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </AddButton>
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
function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2> Split a bill with {selectedFriend.name} </h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🕴️ Your expenses</label>
      <input type="text" readOnly />

      <label>🕴️ {selectedFriend.name}'s expense</label>
      <input type="text" />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user"> you </option>
        <option value="friend"> x </option>
      </select>
      <AddButton>Split bill</AddButton>
    </form>
  );
}
