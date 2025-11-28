
document.addEventListener("DOMContentLoaded", () => {
  const draggableItems = document.querySelectorAll(".game-image");
  const dropzones = document.querySelectorAll(".drop-zone, .image-pool");

  loadTierList();

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

            saveTierList();
        }
    });
  });

  // --- FUNÇÕES DE LOCALSTORAGE ---

  function saveTierList() {
    const estado = {};

    dropzones.forEach(zone => {

      const carrosNaZona = [];
      const carros = zone.querySelectorAll('.game-image');
      
      carros.forEach(carro => {
        carrosNaZona.push(carro.id);
      });

      estado[zone.id] = carrosNaZona;
    });

    localStorage.setItem('minhaTierList', JSON.stringify(estado));
    console.log('Jogo Salvo!', estado);
  }

  function loadTierList() {
    const dadosSalvos = localStorage.getItem('minhaTierList');

    if (!dadosSalvos) return;

    const estado = JSON.parse(dadosSalvos);

    Object.keys(estado).forEach(zoneId => {
      const zona = document.getElementById(zoneId);
      const idsDosCarros = estado[zoneId];

      idsDosCarros.forEach(carId => {
        const carro = document.getElementById(carId);
        if (carro && zona) {
          zona.appendChild(carro);
        }
      });
    });
    console.log('Jogo Carregado!');
  }
});

function resetarTierList() {
    
    localStorage.removeItem('minhaTierList');
    location.reload();
  
  }