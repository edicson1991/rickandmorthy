// Con el método fetch llamo a la URL de la API
function fetchData(url) {
    return fetch(url).then((response) => response.json());
}

export { fetchData };