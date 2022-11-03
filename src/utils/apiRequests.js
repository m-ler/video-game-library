import { collection, getDocs, limit, query, startAfter, startAt, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import handlePromise from "./handlePromise";

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
    }${!!params.publisher ? `&publishers=${params.publisher}` : ""}&page=${page}&page_size=100&key=${RAWG_KEY}`
  );
  return await response.json();
};

export const getGameDetail = async idOrSlug => {
  const response = await fetch(`${BASE_URL}games/${idOrSlug}?key=${RAWG_KEY}`);
  return await response.json();
};

export const getGameDetailScreenshots = async idOrSlug => {
  const response = await fetch(`${BASE_URL}games/${idOrSlug}/screenshots?key=${RAWG_KEY}`);
  return await response.json();
};

export const getGameSearchList = async (query, page = 1, pageSize = 10) => {
  const response = await fetch(`${BASE_URL}games?page_size=${pageSize}&search=${query}&page=${page}&key=${RAWG_KEY}`);
  return await response.json();
};

export const getParentPlatformList = async () => {
  const response = await fetch(`${BASE_URL}platforms/lists/parents?key=${RAWG_KEY}`);
  return await response.json();
};

export const getPlatformList = async page => {
  const response = await fetch(`${BASE_URL}platforms?page=${page}&page_size=100&key=${RAWG_KEY}`);
  return await response.json();
};

export const getGenreList = async () => {
  const response = await fetch(`${BASE_URL}genres?key=${RAWG_KEY}`);
  return await response.json();
};

export const getGenreDetail = async idOrSlug => {
  const response = await fetch(`${BASE_URL}genres/${idOrSlug}?key=${RAWG_KEY}`);
  return await response.json();
};

export const getDeveloperList = async page => {
  const response = await fetch(`${BASE_URL}developers?page=${page}&page_size=100&key=${RAWG_KEY}`);
  return await response.json();
};

export const getDeveloperDetail = async idOrSlug => {
  const response = await fetch(`${BASE_URL}developers/${idOrSlug}?key=${RAWG_KEY}`);
  return await response.json();
};

export const getPublisherList = async page => {
  const response = await fetch(`${BASE_URL}publishers?page=${page}&page_size=100&key=${RAWG_KEY}`);
  return await response.json();
};

export const getPublisherDetail = async idOrSlug => {
  const response = await fetch(`${BASE_URL}publishers/${idOrSlug}?key=${RAWG_KEY}`);
  return await response.json();
};

export const getUserFavoriteGames = async (lastDoc, userUID) => {
  if (!userUID) return;

  const getFirstPage = async () => {
    const first = query(collection(db, "videogames"), where("likes", "array-contains", userUID), limit(100));
    return await getDocs(first);
  };

  const getNextPage = async () => {
    const first = query(collection(db, "videogames"), where("likes", "array-contains", userUID), startAfter(lastDoc), limit(100));
    return await getDocs(first);
  };

  const response = !!lastDoc ? await getNextPage() : await getFirstPage();

  return {
    results: !!response ? response.docs.map(doc => doc.data()) : null,
    lastDoc: !!response ? response.docs[response.docs.length - 1] : null,
    empty: response.empty,
  };
};
