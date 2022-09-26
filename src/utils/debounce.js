export default (func, delay) => {
  let debounceHandler;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceHandler);
    debounceHandler = setTimeout(() => func.apply(context, args), delay);
  };
};
