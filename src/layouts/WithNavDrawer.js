import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import NavigationDrawer from "../components/navigation-drawer/NavigationDrawer";

const WithNavDrawer = () => {
  return (
    <>
      <Header withNavMenuButton={true} withUserButton={true}></Header>
      <main className="grow w-full flex relative pt-[82px] sm:pt-[52px] z-0">
        <NavigationDrawer></NavigationDrawer>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default WithNavDrawer;
