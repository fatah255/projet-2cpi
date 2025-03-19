"use client";

import EmptySearch from "./EmptySearch";
import EmptyFavorites from "./EmptyFavorites";
import EmptyBoards from "./EmptyBoards";
import BoardCard from "./BoardCard";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import NewBoardCard from "./NewBoardCard";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  //getting the boards of the current organization
  const data = useQuery(api.boards.get, { orgId, ...query });

  // undefind beacause convex return undefined when loading and null when empty
  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite Boards" : "Team Boards"}
        </h2>
        {/* grid to render the skeletons and the disabled newBoard button */}
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardCard orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  //handling empty search, empty favorites, and empty boards
  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite Boards" : "Team Boards"}
      </h2>
      {/* grid to render the boards and a card to create a new board */}
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardCard orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            title={board.title}
            id={board._id}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
export default BoardList;
