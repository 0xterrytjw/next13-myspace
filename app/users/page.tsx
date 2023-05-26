import React from "react";
import { prisma } from "@/lib/prisma";
import UserCard from "@/components/UserCard";

const UsersPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1 className="p-4 text-3xl font-bold">Users</h1>
      {users.map((user) => (
        <UserCard
          id={user.id}
          name={user.name}
          age={user.age}
          image={user.image}
        />
      ))}
    </div>
  );
};

export default UsersPage;
