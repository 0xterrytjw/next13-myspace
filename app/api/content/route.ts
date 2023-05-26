import { NextResponse } from "next/server";
import { posts } from "@/utils/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return NextResponse.json(posts);
}
