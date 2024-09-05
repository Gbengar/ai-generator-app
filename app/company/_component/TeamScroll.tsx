import Image from "next/image";

const TeamScroll = () => {
  const users = [
    {
      name: "Sophie Chamberlain",
      role: "Specialized Support",
      image: "/headshot/Image-user-1.jpg",
    },
    {
      name: "Lana Steiner",
      role: "VP of Customer Success",
      image: "/headshot/Image-user-2.jpg",
    },
    {
      name: "Orlando Diggs",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-3.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-4.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-5.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-6.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-7.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-8.jpg",
    },
    // Add more users...
  ];

  return (
    <div className="flex overflow-x-scroll space-x-4 py-4">
      {users.map((user, index) => (
        <div
          key={index}
          className="min-w-[200px] bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
        >
          <div className="w-32 h-32 relative">
            <Image
              src={user.image}
              alt={user.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.role}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamScroll;
