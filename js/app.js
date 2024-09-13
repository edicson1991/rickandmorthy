// importar codigo de los siguiete archivos
import { fetchData } from './api.js';
import { renderCharacters } from './characters.js';
import { updatePagination } from './pagination.js';


let currentPageUrl = "https://rickandmortyapi.com/api/character";
let currentSearchQuery = ""; // Término de búsqueda global
const containerCharacters = document.getElementById("seccion-card");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const pageNumberElement = document.getElementById("pageNumber");
const searchInput = document.getElementById("search");

// Función para cargar personajes con soporte para búsqueda y paginación
function fetchCharacters(url) {
    fetchData(url).then((data) => {
        const limitedResults = data.results.slice(0, 8); // Mostrar 8 resultados como límite
        renderCharacters(containerCharacters, limitedResults);
        updatePagination(data, prevButton, nextButton, url, pageNumberElement);
        currentPageUrl = url; 
    });
}

// Manejador del input de búsqueda
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    currentSearchQuery = query; // Guardar la búsqueda
    if (query) {
        const searchUrl = `https://rickandmortyapi.com/api/character/?name=${query}`;
        fetchCharacters(searchUrl);
    } else {
        fetchCharacters("https://rickandmortyapi.com/api/character");
    }
});

// Paginación con soporte para búsqueda
prevButton.addEventListener("click", () => {
    const prevPageUrl = prevButton.getAttribute("data-url");
    if (prevPageUrl) {
        const url = currentSearchQuery ? `${prevPageUrl}&name=${currentSearchQuery}` : prevPageUrl;
        fetchCharacters(url);
    }
});

nextButton.addEventListener("click", () => {
    const nextPageUrl = nextButton.getAttribute("data-url");
    if (nextPageUrl) {
        const url = currentSearchQuery ? `${nextPageUrl}&name=${currentSearchQuery}` : nextPageUrl;
        fetchCharacters(url);
    }
});

// Cargar la primera página
fetchCharacters(currentPageUrl);
