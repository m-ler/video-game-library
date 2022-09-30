export const getMidCompressedImageURL = imgURL => {
  if (typeof imgURL !== "string") return;
  imgURL = imgURL.split("/media/");
  imgURL.splice(1, 0, "/media/crop/600/400/");
  return imgURL.join("");
};

export const getHighCompressedImageURL = imgURL => {
  if (typeof imgURL !== "string") return;
  imgURL = imgURL.split("/media/");
  imgURL.splice(1, 0, "/media/resize/200/-/");
  return imgURL.join("");
};
