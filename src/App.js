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

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <Friends />
      </div>
    </div>
  );
}

function Friends() {
  const friends = initialFriends;

  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} KES {friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} KES {friend.balance}
        </p>
      )}
      {friend.balance === 0 && (
        <p className="">
          You owe {friend.name} KES {friend.balance}
        </p>
      )}
    </li>
  );
}
