import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GameList from "../../components/game-list";
import SpinnerB from "../../components/loading-animations/SpinnerB";
import RequestError from "../../components/state-messages/RequestError";
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

  return developerRequest.error ? (
		<RequestError></RequestError>
	) : developerRequest.loading ? (
		<SpinnerB className="w-full flex justify-center m-[20px] px-[20px]"></SpinnerB>
	) : !!developerDetail ? (
		<GameList developer={developerDetail}></GameList>
	) : (
		''
	);
};

export default GamesByDeveloperPage;
