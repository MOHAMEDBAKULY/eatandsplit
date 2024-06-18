import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Abbas",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Musallem",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Mumo",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [seletedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddNewFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((curFriend) =>
      curFriend?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          onSelection={handleSelection}
          seletedFriend={seletedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} />}

        <Button onClick={handleAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {seletedFriend && <FormSplitBill seletedFriend={seletedFriend} />}
    </div>
  );
}

function Friends({ friends, onSelection, seletedFriend }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            seletedFriend={seletedFriend}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend, onSelection, seletedFriend }) {
  const isSelected = seletedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} KES {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you KES {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨🏿‍🤝‍👨🏽Fiend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌇Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Select</Button>
    </form>
  );
}

function FormSplitBill({ seletedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Form split bill {seletedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input type="text" />

      <label>🕺 Your Expense</label>
      <input type="text" />

      <label>🕴 {seletedFriend.name}'s Expense</label>
      <input type="text" disabled />

      <label>🧾Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{seletedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
