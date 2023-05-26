"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type FollowClientProps = {
  targetUserId: string;
  isFollowing: boolean;
};
const FollowClient = ({ targetUserId, isFollowing }: FollowClientProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // a special hook which tells us if we have a loading state
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const follow = async () => {
    setIsFetching(true);

    console.log("targetUserId -> ", targetUserId);

    const res = await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsFetching(false);

    console.log("followed! -> ", res);

    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();
    });
  };

  const unfollow = async () => {
    setIsFetching(true);

    const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE",
    });

    setIsFetching(false);

    console.log("unfollowed! -> ", res);

    startTransition(() => router.refresh());
  };

  if (isFollowing) {
    return (
      <button onClick={unfollow}>{!isMutating ? "Unfollow" : "..."}</button>
    );
  } else {
    return <button onClick={follow}>{!isMutating ? "Follow" : "..."}</button>;
  }
};

export default FollowClient;
