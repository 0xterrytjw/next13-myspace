"use client"; // has to be a client component to handle client-side features like validation and form submission

import React from "react";

type ProfileFormProps = {
  user: any;
};
const ProfileForm = ({ user }: ProfileFormProps) => {
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      age: formData.get("age"),
      image: formData.get("image"),
    };

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data => ", data);
  };

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form onSubmit={updateUser} className="flex flex-col w-1/2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={user?.name ?? ""}
          className="text-black"
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          cols={30}
          rows={10}
          defaultValue={user?.bio ?? ""}
          className="text-black"
        ></textarea>
        <label htmlFor="age">Age</label>
        <input
          type="text"
          name="age"
          defaultValue={user?.age ?? 0}
          className="text-black"
        />
        <label htmlFor="image">Profile Image URL</label>
        <input
          type="text"
          name="image"
          defaultValue={user?.image ?? ""}
          className="text-black"
        />

        <button type="submit" className="border border-white p-2 mt-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
