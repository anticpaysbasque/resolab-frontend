import React from "react";

function UsersList({ users }) {
  return (
    <div>
      {users.map(user => (
        <div>{user.username}</div>
      ))}
    </div>
  );
}

export default UsersList;
