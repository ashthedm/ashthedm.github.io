// Fetch images list from JSON and build imageData array dynamically
async function loadGalleryData() {
  const response = await fetch('images/images.json');
  const data = await response.json();
  const imageData = [];

  for (const [category, images] of Object.entries(data)) {
    images.forEach(imgName => {
      imageData.push({
        src: `images/${category}/${imgName}`,
        tags: [category]
      });
    });
  }
  return imageData;
}
