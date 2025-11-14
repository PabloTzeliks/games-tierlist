document.addEventListener('DOMContentLoaded', () => {

    const draggableItems = document.querySelectorAll('#image-pool');
    const dropZone = document.querySelectorAll('.tier-label, .image-pool');

    draggableItems.forEach(item => {

        item.addEventListener('dragstart', (event) => {

            event.dataTransfer.setData('text/plain', event.target.id);

            setTimeout(() => {

                item.classList.add('dragging');
            });
        });
    });

});