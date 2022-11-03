import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async gameObj => {
  const gameData = {
    background_image: gameObj.background_image,
    genres: gameObj.genres,
    id: gameObj.id,
    metacritic: gameObj.metacritic,
    name: gameObj.name,
    parent_platforms: gameObj.parent_platforms,
    platforms: gameObj.platforms,
    released: gameObj.released,
    short_screenshots: gameObj.short_screenshots,
    slug: gameObj.slug,
    likes: []
  };

  const docRef = doc(db, "videogames", gameData.id.toString());
  await setDoc(docRef, gameData);
};
