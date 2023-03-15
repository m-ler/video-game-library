import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameList from "../../components/game-list";
import SpinnerB from "../../components/loading-animations/SpinnerB";
import RequestError from "../../components/state-messages/RequestError";
import withRouteChangeRemounting from "../../hoc/withRouteChangeRemounting";
import useApiRequest from "../../hooks/useApiRequest";
import { getPublisherDetail } from "../../api/apiRequests";

const GamesByPublisherPage = () => {
  const publisherParam = useParams()["publisher"];
  const publisherRequest = useApiRequest(() => getPublisherDetail(publisherParam));
  const [publisherDetail, setPublisherDetail] = useState();

  useEffect(() => {
    publisherRequest.makeRequest();
  }, []);

  useEffect(() => {
    !!publisherRequest.data && setPublisherDetail(publisherRequest.data);
  }, [publisherRequest.data]);

  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  return publisherRequest.error ? (
    <RequestError></RequestError>
  ) : publisherRequest.loading ? (
    <SpinnerB className="w-full flex justify-center m-[20px] px-[20px]"></SpinnerB>
  ) : !!publisherDetail ? (
    <GameListWithRouteChangeRemounting publisher={publisherDetail}></GameListWithRouteChangeRemounting>
  ) : (
    ""
  );
};

export default GamesByPublisherPage;
