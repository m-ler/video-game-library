import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FullScreenImageSlideshow from './';

const mockImageList = ['foo.png', 'bar.png'];

it('Should load all received images', () => {
	render(<FullScreenImageSlideshow images={mockImageList} selectedIndex={0} />);

	const selectedImage = screen.getByTestId('selected-image-slideshow');
	const imageList = screen.getByTestId('image-list-slideshow');

	expect(selectedImage).toBeInTheDocument();
	expect(selectedImage.src).toContain(mockImageList[0]);
	expect(imageList).toBeInTheDocument();
	expect(imageList.childElementCount).toBe(mockImageList.length);
});

it('Should show empty state component when no images are received', () => {
	render(<FullScreenImageSlideshow images={[]} selectedIndex={0} />);

	const emptyState = screen.getByTestId('slideshow-empty-state');
	const mainImageSection = screen.queryByTestId('slideshow-main-image-section');
	const imageList = screen.queryByTestId('image-list-slideshow');

	expect(emptyState).toBeInTheDocument();
	expect(mainImageSection).not.toBeInTheDocument();
	expect(imageList).not.toBeInTheDocument();
});

it('Should select image when clicking any image in the list', () => {
	render(<FullScreenImageSlideshow images={mockImageList} selectedIndex={0} />);

	const imageList = screen.getByTestId('image-list-slideshow');
	const selectedImage = screen.getByTestId('selected-image-slideshow');

	expect(selectedImage.src).toContain(mockImageList[0]);

	const secondImage = within(imageList).getAllByRole('img')[1];
	userEvent.click(secondImage);

	expect(screen.getByTestId('selected-image-slideshow').src).toContain(mockImageList[1]);
});

it('Should select image when click previous and next image buttons', () => {
	render(<FullScreenImageSlideshow images={mockImageList} selectedIndex={0} />);

	const prevImgButton = screen.getByTestId('select-prev-image');
	const nextImgButton = screen.getByTestId('select-next-image');

	userEvent.click(nextImgButton);
	expect(screen.getByTestId('selected-image-slideshow').src).toContain(mockImageList[1]);

	userEvent.click(prevImgButton);
	expect(screen.getByTestId('selected-image-slideshow').src).toContain(mockImageList[0]);
});

it('Should select image when click previous and next with keyboard arrow buttons', () => {
	render(<FullScreenImageSlideshow images={mockImageList} selectedIndex={0} />);

	fireEvent.keyDown(document, { key: 'ArrowRight' });
	expect(screen.getByTestId('selected-image-slideshow').src).toContain(mockImageList[1]);

	fireEvent.keyDown(document, { key: 'ArrowLeft' });
	expect(screen.getByTestId('selected-image-slideshow').src).toContain(mockImageList[0]);
});

it('Should trigger onHide callback when clicking close button', () => {
	const onHide = jest.fn();
	render(<FullScreenImageSlideshow images={mockImageList} selectedIndex={0} onHide={onHide} />);

	const closeButton = screen.getByTestId('slideshow-close-button');
	userEvent.click(closeButton);

	expect(onHide).toHaveBeenCalled();
});
