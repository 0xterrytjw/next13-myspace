import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import FollowClient from "./FollowClient";

type FollowButtonProps = {
  targetUserId: string;
};
const FollowButton = async ({ targetUserId }: FollowButtonProps) => {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const isFollowing = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    },
  });

  console.log("isFollowing -> ", isFollowing);

  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
};

export default FollowButton;
