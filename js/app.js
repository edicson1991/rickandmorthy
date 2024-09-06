// importar codigo de los siguiete archivos
import { fetchData } from './api.js';
import { renderCharacters } from './characters.js';
import { updatePagination } from './pagination.js';


let currentPageUrl = "https://rickandmortyapi.com/api/character";
const containerCharacters = document.getElementById("seccion-card");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const pageNumberElement = document.getElementById("pageNumber");

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


fetchCharacters(currentPageUrl);