import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// to create a new relationship between users during a "follow" event
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const { targetUserId } = await request.json();
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const followRecord = await prisma.follows.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  return NextResponse.json(followRecord);
}

// to create a new relationship between users during an "unfollow" event
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const currentUserEmail = session?.user?.email!;
  const targetUserId = request.nextUrl.searchParams.get("targetUserId")!;

  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const deletedRecord = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    },
  });

  return NextResponse.json(deletedRecord);
}
