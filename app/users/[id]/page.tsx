// import FollowButton from "@/components/FollowButton/FollowButton";
import FollowButton from "@/components/FollowButton/FollowButton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

type UserProfilePageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params,
}: UserProfilePageProps): Promise<Metadata> => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
};

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const { name, bio, image, id } = user ?? {};

  return (
    <div>
      <h1>{name}</h1>

      <img
        width={300}
        src={image ?? "/images/quack.jpg"}
        alt={`${name}'s profile`}
      />

      <h3>Bio</h3>
      <p>{bio}</p>

      {/* @ts-expect-error Server Component */}
      <FollowButton targetUserId={id!} />
    </div>
  );
};

export default UserProfilePage;
