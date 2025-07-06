let currentTag = 'all';
let glightbox = GLightbox({ selector: '.glightbox' });

function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  const draggedId = ev.dataTransfer.getData("text");
  const draggedEl = document.getElementById(draggedId);
  const dropTarget = ev.target.closest('.gallery-item');
  if (dropTarget && dropTarget !== draggedEl) {
    const container = document.getElementById("gallery");
    container.insertBefore(draggedEl, dropTarget);
    saveOrder();
  }
}
function saveOrder() {
  const ids = Array.from(document.querySelectorAll('.gallery-item')).map(el => el.id);
  localStorage.setItem('imageOrder', JSON.stringify(ids));
}
function loadOrder(images) {
  const saved = JSON.parse(localStorage.getItem('imageOrder') || '[]');
  if (!saved.length) return images;
  const reordered = [];
  saved.forEach(id => {
    const match = images.find(img => img.id === id);
    if (match) reordered.push(match);
  });
  return reordered.concat(images.filter(img => !saved.includes(img.id)));
}
function renderGallery(tag = 'all') {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = '';
  let tagged = imageData.map((img, index) => ({ ...img, id: `img-${index}` }));
  tagged = loadOrder(tagged);
  tagged.forEach((img, index) => {
    if (tag === 'all' || img.tags.includes(tag)) {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.draggable = true;
      div.id = img.id;
      div.ondragstart = drag;
      div.innerHTML = `<a href="${img.src}" class="glightbox"><img src="${img.src}" alt="" /></a>`;
      gallery.appendChild(div);
    }
  });
  glightbox.reload();
}
document.querySelectorAll('#tagFilter button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentTag = btn.dataset.tag;
    renderGallery(currentTag);
  });
});
window.onload = () => {
  renderGallery();
};
