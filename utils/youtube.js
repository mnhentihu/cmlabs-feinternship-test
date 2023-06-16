export function convertToEmbedURL(url) {
  const videoId = url.split("watch?v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}
