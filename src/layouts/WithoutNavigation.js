import { Outlet } from "react-router-dom";
import Header from "../components/header";

const WithoutNavigation = () => {
  return (
    <>
      <Header></Header>
      <main className="grow w-full flex relative z-0">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default WithoutNavigation;
