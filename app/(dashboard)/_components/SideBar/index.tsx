import { RoomsList } from "./RoomsList";
import { SideBarButton } from "./SideBarButton";
export const SideBar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[80px] flex p-3 flex-col gap-y-4">
      <RoomsList />
      <SideBarButton />
    </aside>
  );
};
