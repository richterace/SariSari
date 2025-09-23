export const getBookData = (name) => {
    return new URL(`../assets/items/${name}`, import.meta.url).href;
}; //correct way in vite for faster image import