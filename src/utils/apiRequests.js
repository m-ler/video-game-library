const API_KEY = "a2bb4511c7b2410895f09afa44233447";
const RAWG_KEY = "c542e67aec3a4340908f9de9e86038af";
const BASE_URL = `https://api.rawg.io/api/`;

export const getGameList = async (page, params) => {
  const platformIsParent = params.platform?.platforms?.length > 0;
  const platformFilter =
    !!params.platform && !!params.platform.id
      ? platformIsParent
        ? `&parent_platforms=${params.platform.id}`
        : `&platforms=${params.platform.id}`
      : "";

  const response = await fetch(
    `${BASE_URL}games${params.category}?ordering=${params.order}${platformFilter}${!!params.genre ? `&genres=${params.genre}` : ""}${
      !!params.developer ? `&developers=${params.developer}` : ""
    }&page=${page}&page_size=100&key=${RAWG_KEY}`
  );
  return await response.json();
};

export const getGameDetail = async gameIdOrSlug => {
  const response = await fetch(`${BASE_URL}games/${gameIdOrSlug}?key=${RAWG_KEY}`);
  return await response.json();
};

export const getGameDetailScreenshots = async gameIdOrSlug => {
  const response = await fetch(`${BASE_URL}games/${gameIdOrSlug}/screenshots?key=${RAWG_KEY}`);
  return await response.json();
};

export const getGameSearchList = async query => {
  const response = await fetch(`${BASE_URL}games?page_size=10&search=${query}&search_precise=true&page=1&key=${RAWG_KEY}`);
  return await response.json();
};

export const getParentPlatformList = async () => {
  const response = await fetch(`${BASE_URL}platforms/lists/parents?key=${RAWG_KEY}`);
  return await response.json();
};

export const getGenreList = async () => {
  const response = await fetch(`${BASE_URL}genres?key=${RAWG_KEY}`);
  return await response.json();
};

export const getDeveloperList = async page => {
  const response = await fetch(`${BASE_URL}developers?page=${page}&page_size=100&key=${RAWG_KEY}`);
  return await response.json();
};

export const getDeveloperDetail = async developerIdOrSlug => {
  const response = await fetch(`${BASE_URL}developers/${developerIdOrSlug}?key=${RAWG_KEY}`);
  return await response.json();
};
