import { Outlet } from "react-router-dom";
import NavigationDrawer from "../components/navigation-drawer/NavigationDrawer";

const WithNavDrawer = () => {
  return (
    <>
      <NavigationDrawer></NavigationDrawer>
      <Outlet></Outlet>
    </>
  );
};

export default WithNavDrawer;
