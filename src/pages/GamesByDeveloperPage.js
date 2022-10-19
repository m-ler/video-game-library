import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import GameList from "../components/containers/GameList/GameList";
import SpinnerB from "../components/elements/loading-animations/SpinnerB";
import withRouteChangeRemounting from "../hoc/withRouteChangeRemounting";
import useApiRequest from "../hooks/useApiRequest";
import { getDeveloperDetail } from "../utils/apiRequests";

const GamesByDeveloperPage = () => {
  const developerParam = useParams()["developer"];
  const developerRequest = useApiRequest(() => getDeveloperDetail(developerParam));
  const [developerDetail, setDeveloperDetail] = useState();

  useEffect(() => {
    developerRequest.makeRequest();
  }, []);

  useEffect(() => {
    !!developerRequest.data && setDeveloperDetail(developerRequest.data);
  }, [developerRequest.data]);

  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  return developerRequest.error ? (
    <h1>SOMETHING WENT WRONG</h1>
  ) : developerRequest.loading ? (
    <SpinnerB className="w-full flex justify-center m-[20px] px-[20px]"></SpinnerB>
  ) : !!developerDetail?.id ? (
    <GameListWithRouteChangeRemounting developer={developerDetail}></GameListWithRouteChangeRemounting>
  ) : (
    <h1>Developer not found</h1>
  );
};

export default GamesByDeveloperPage;
