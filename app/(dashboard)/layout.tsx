import { RoomSideBar } from "./_components/roomSideBar";
import { SideBar } from "./_components/SideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <SideBar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <RoomSideBar />
          <div className="h-full flex-1">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
