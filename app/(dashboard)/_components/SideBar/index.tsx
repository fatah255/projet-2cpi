import { RoomsList } from "./List";
import { SideBarButton } from "./SideBarButton";
export const SideBar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-[#18009ecd] h-full w-[60px] flex p-3 flex-col gap-y-4">
      <RoomsList />
      <SideBarButton />
    </aside>
  );
};
