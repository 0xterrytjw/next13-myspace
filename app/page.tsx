import Image from "next/image";
import { Raleway } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

const raleway = Raleway({ subsets: ["latin-ext"] });

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
    // return <p>You must be signed in...</p>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-3xl font-bold p-24">
      Home page
    </main>
  );
};

export default HomePage;
