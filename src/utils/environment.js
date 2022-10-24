export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isScreenMobile = () => {
  return window.matchMedia("(max-width: 767px)").matches;
};
