import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const WithoutNavDrawer = () => {
  return (
    <>
      <Header></Header>
      <main className="grow w-full flex relative">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default WithoutNavDrawer;
