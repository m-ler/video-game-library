import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import GameList from "../../components/game-list";
import SpinnerB from "../../components/loading-animations/SpinnerB";
import RequestError from "../../components/state-messages/RequestError";
import withRouteChangeRemounting from "../../hoc/withRouteChangeRemounting";
import useApiRequest from "../../hooks/useApiRequest";
import { getDeveloperDetail } from "../../api/apiRequests";

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
    <RequestError></RequestError>
  ) : developerRequest.loading ? (
    <SpinnerB className="w-full flex justify-center m-[20px] px-[20px]"></SpinnerB>
  ) : !!developerDetail ? (
    <GameListWithRouteChangeRemounting developer={developerDetail}></GameListWithRouteChangeRemounting>
  ) : (
    ""
  );
};

export default GamesByDeveloperPage;
