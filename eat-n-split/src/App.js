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
export default function App() {
  return (
    <div>
      {" "}
      <FriendsList friends={initialFriends} />
    </div>
  );
}
function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend Idf={friend.id} Namef={friend.name} balancef={friend.balance} />
      ))}
    </ul>
  );
}
function Friend({ Idf, Namef, balancef }) {
  return (
    <li>
      {Namef} (ID: {Idf}) — balancef: {balancef}
    </li>
  );
}
