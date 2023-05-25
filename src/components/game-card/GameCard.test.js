import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import GameCard from '.';
import { store } from '../../store';
import mockGameData from './mocks/gameData';

const mockGameCard = (
	<Provider store={store}>
		<BrowserRouter>
			<GameCard game={mockGameData} />
		</BrowserRouter>
	</Provider>
);

it('Should load main game data', () => {
	render(mockGameCard);

	const gameBgImg = screen.getByTestId('game-card-bg-image');
	const gameTitle = screen.getByText(mockGameData.name);
	const likeButton = screen.getByTestId('game-card-like-button');
	const platformIcons = screen.getByTestId('game-card-platforms');
	const metascore = screen.getByTitle('Metascore');

	expect(gameBgImg.src).toBeTruthy();
	expect(gameTitle.innerHTML).toBe(mockGameData.name);
	expect(likeButton).toBeInTheDocument();
	expect(platformIcons.childElementCount).toBe(mockGameData.parent_platforms.length);
	expect(metascore.innerHTML).toBe(mockGameData.metacritic.toString());
});

it('Should show images slideshow on hover', () => {
	render(mockGameCard);

	const gameCard = screen.getByTestId('game-card');

	const slideshow = screen.getByTestId('game-card-slideshow');
	const slideshowImgCount = within(slideshow).queryAllByRole('img', { hidden: true }).length;

	expect(slideshow.style.display).toBe('none');
	expect(slideshowImgCount).toBe(mockGameData.short_screenshots.length);

	userEvent.hover(gameCard);

	expect(slideshow.style.display).toBe('block');
});

it('Should show detail on hover', () => {
	render(mockGameCard);

	const gameCardDetail = screen.getByTestId('game-card-detail');

	expect(gameCardDetail.classList.contains('opacity-0')).toBeTruthy();
	expect(gameCardDetail.classList.contains('scale-y-0')).toBeTruthy();

	userEvent.hover(gameCardDetail);

	expect(gameCardDetail.classList.contains('opacity-100')).toBeTruthy();
	expect(gameCardDetail.classList.contains('scale-y-100')).toBeTruthy();
	expect(gameCardDetail.classList.contains('visible')).toBeTruthy();
});
