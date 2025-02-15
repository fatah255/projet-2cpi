"use client";
import { useOrganizationList } from "@clerk/nextjs";
import { Item } from "./Item";

export const RoomsList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!userMemberships.data?.length) return null;
  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((m) => (
        <Item
          key={m.organization.id}
          id={m.organization.id}
          name={m.organization.name}
          imageUrl={m.organization.imageUrl}
        />
      ))}
    </ul>
  );
};
