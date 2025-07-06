
    let currentTag = 'all';
let glightbox;

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text");
  const draggedEl = document.getElementById(id);
  const dropTarget = ev.target.closest(".gallery-item");
  if (dropTarget && dropTarget !== draggedEl) {
    dropTarget.parentNode.insertBefore(draggedEl, dropTarget);
  }
}

async function renderGallery(tag = 'all') {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  const imageData = await loadGalleryData();

  let tagged = imageData.map((img, i) => ({ ...img, id: `img-${i}` }));

  tagged.forEach((img) => {
    if (tag === 'all' || img.tags.includes(tag)) {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.draggable = true;
      div.id = img.id;
      div.ondragstart = drag;
      div.innerHTML = `<a href="${img.src}" class="glightbox"><img src="${img.src}" /></a>`;
      gallery.appendChild(div);
    }
  });

  if (glightbox) glightbox.destroy();
  glightbox = GLightbox({ selector: '.glightbox' });
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  document.querySelectorAll("#tagFilter button").forEach(btn =>
    btn.addEventListener("click", () => renderGallery(btn.dataset.tag))
  );
});
