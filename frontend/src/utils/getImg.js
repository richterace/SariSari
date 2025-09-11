export const getImageUrl = (path) => {
    return new URL(`../assets/${path}`, import.meta.url).href;
}; //correct way in vite for faster image import