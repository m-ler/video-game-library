export default (event, storageKey) => {
  sessionStorage.setItem(storageKey, event.target.scrollTop.toString());
};
