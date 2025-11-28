
document.addEventListener("DOMContentLoaded", () => {
  const draggableItems = document.querySelectorAll(".game-image");
  const dropzones = document.querySelectorAll(".drop-zone, .image-pool");

  draggableItems.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);

      setTimeout(() => {
        item.classList.add("hide");
      }, 0);
    });

    item.addEventListener("dragend", (event) => {
      item.classList.remove("hide");
    });
  });

  // Tratamento final
  dropzones.forEach((label) => {
    
    label.addEventListener("dragenter", (event) => {
      
      event.preventDefault();

      label.classList.add("drag-over");
    });

    label.addEventListener("dragover", (event) => {
      
      event.preventDefault();
    });

    label.addEventListener("dragleave", () => {
      
      label.classList.remove("drag-over");
    });

    label.addEventListener('drop', (event) => {
        
        event.preventDefault();
        
        label.classList.remove('drag-over');
        
        const id = event.dataTransfer.getData('text/plain');
        
        const draggableElement = document.getElementById(id);
        
        if (draggableElement) {
            label.appendChild(draggableElement);
        }
    });
  });
});