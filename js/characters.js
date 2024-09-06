// Funcion para mostrar las caracteristicas de los personajes

function renderCharacters(container, character){
    container.innerHTML = ""; // En este punto limpiamos el contenedor que tenemos en el archivo html

    character.forEach((dataItems) => {

        const characterArticle = document.createElement("article");
        characterArticle.classList.add("hero-card__items");

        characterArticle.innerHTML = `
        <img src="${dataItems.image}" alt="Imagen del personaje ${dataItems.name}"> 
        <div>
        <p>Nombre: ${dataItems.name}</p>
        <p>Especie: ${dataItems.species}</p>
        <p>Estado: ${dataItems.status}</p>
        <p>Origen: ${dataItems.origin.name}</p>
      </div>
    `;
        container.appendChild(characterArticle);
    });

    
};

export { renderCharacters };