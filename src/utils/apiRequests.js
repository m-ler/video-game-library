const API_KEY = 'a2bb4511c7b2410895f09afa44233447';
const BASE_URL = `https://api.rawg.io/api/`;

export const getGameList = async (page) => {
    const response = await fetch(`${BASE_URL}games?key=${API_KEY}&page=${page}&page_size=100`);
    return await response.json();
};

export const getGameDetail = async (gameId) => {
    const response = await fetch(`${BASE_URL}games/${gameId}?key=${API_KEY}`);
    return await response.json();
};

export const getGameDetailScreenshots = async (gameId) => {
    const response = await fetch(`${BASE_URL}games/${gameId}/screenshots?key=${API_KEY}`);
    return await response.json();
};