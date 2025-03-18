import Image from "next/image";

//a component that renders in the case of empty favorites
const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-favorite.svg" width={140} height={140} alt="empty" />
      <h2 className="text-2xl font-semibold mt-6 text-blue-800">
        No Favorite Boards
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try add a favorite board
      </p>
    </div>
  );
};

export default EmptyFavorites;
