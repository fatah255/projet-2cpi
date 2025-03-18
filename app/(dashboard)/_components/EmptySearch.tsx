import Image from "next/image";

//a component that renders in the case of empty search
const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-search.svg" width={140} height={140} alt="empty" />
      <h2 className="text-2xl font-semibold mt-6 text-blue-800">
        No Results Found
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};

export default EmptySearch;
