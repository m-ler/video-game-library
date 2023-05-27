import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameList from '../../components/game-list';
import SpinnerB from '../../components/loading-animations/SpinnerB';
import RequestError from '../../components/state-messages/RequestError';
import useApiRequest from '../../hooks/useApiRequest';
import { getGenreDetail } from '../../api/apiRequests';

const GamesByGenrePage = () => {
	const genreParam = useParams()['genre'];
	const [selectedGenre, setSelectedGenre] = useState();
	const genreRequest = useApiRequest(() => getGenreDetail(genreParam));

	useEffect(() => {
		genreRequest.makeRequest();
	}, []);

	useEffect(() => {
		setSelectedGenre(genreRequest.data);
	}, [genreRequest.data]);

	return genreRequest.error ? (
		<RequestError></RequestError>
	) : genreRequest.loading ? (
		<SpinnerB className="w-full flex justify-center m-[20px] px-[20px]"></SpinnerB>
	) : !!selectedGenre ? (
		<GameList genre={selectedGenre}></GameList>
	) : (
		''
	);
};
export default GamesByGenrePage;
