
const getCompressedImageURL = (imgURL) => {
    imgURL = imgURL.split('/media/');
    imgURL.splice(1, 0, '/media/crop/600/400/');
    return imgURL.join('');
};

export default getCompressedImageURL;