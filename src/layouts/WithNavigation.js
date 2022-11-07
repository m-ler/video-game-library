import { Outlet } from "react-router-dom";
import Header from "../components/header";
import NavigationDrawer from "../components/navigation-drawer";

const WithNavigation = () => {
  return (
    <>
      <Header withNavMenuButton={true} withUserButton={true}></Header>
      <main className="grow w-full flex relative  z-0">
        <NavigationDrawer></NavigationDrawer>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default WithNavigation;
