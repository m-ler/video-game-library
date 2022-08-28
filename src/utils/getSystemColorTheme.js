
const getSystemColorTheme = () => {
    const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    return theme;
};

export default getSystemColorTheme;