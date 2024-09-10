// importar codigo de los siguiete archivos
import { fetchData } from './api.js';
import { renderCharacters } from './characters.js';
import { updatePagination } from './pagination.js';


let currentPageUrl = "https://rickandmortyapi.com/api/character";
const containerCharacters = document.getElementById("seccion-card");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const pageNumberElement = document.getElementById("pageNumber");
const searchInput = document.getElementById("search");

function fetchCharacters(url) {
    fetchData(url).then((data) => {
        const limitedResults = data.results.slice(0, 9);
        renderCharacters(containerCharacters, limitedResults);
        updatePagination(data, prevButton, nextButton, currentPageUrl, pageNumberElement);
        currentPageUrl = url; 
    });
}

// codigo para generar el evento clcik de cada boton

prevButton.addEventListener("click", () =>{
    const prevPageUrl = prevButton.getAttribute("data-url");
    if(prevPageUrl) fetchCharacters(prevPageUrl);
    currentPageUrl = prevPageUrl; 
})

nextButton.addEventListener("click",  () => {
    const nextPageUrl = nextButton.getAttribute("data-url");
    if(nextPageUrl) fetchCharacters(nextPageUrl);
    currentPageUrl = nextPageUrl; 
} )

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query) {
        const searchUrl = `https://rickandmortyapi.com/api/character/?name=${query}`;
        fetchData(searchUrl)
            .then(data => {
                if (data.results) {
                    const limitedResults = data.results.slice(0, 8); // Mostrar 8 resultados como límite
                    renderCharacters(containerCharacters, limitedResults);
                } else {
                    containerCharacters.innerHTML = `<p>No se encontraron personajes.</p>`;
                }
            })
            .catch(error => {
                console.error('Error en la búsqueda:', error);
                containerCharacters.innerHTML = `<p>Error al buscar personajes.</p>`;
            });
    } else {
        // Si el input está vacío, vuelve a cargar la página actual
        fetchCharacters(currentPageUrl);
    }
});

fetchCharacters(currentPageUrl);