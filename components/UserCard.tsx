import Link from "next/link";

type UserCardProps = {
  id: string;
  name: string | null;
  age: number | null;
  image: string | null;
};

const UserCard = ({ id, name, age, image }: UserCardProps) => {
  return (
    <div className="p-4">
      <img
        src={image ?? "/images/quack.jpg"}
        alt={`${name}'s profile`}
        className="h-20 w-20"
      />
      <div className="">
        <h3>
          <Link
            href={`/users/${id}`}
            className="underline hover:text-gray-400 transition-all"
          >
            {name}
          </Link>
        </h3>
        <p>Age: {age}</p>
      </div>
    </div>
  );
};

export default UserCard;
