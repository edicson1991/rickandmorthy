function updatePagination (data, prevButton, nextButton, currentPageUrl, pageNumberElement )
{
    prevButton.disabled = data.info.prev === null;
    nextButton.disabled = data.info.next === null;

    prevButton.setAttribute("data-url", data.info.prev);
    nextButton.setAttribute("data-url", data.info.next);

    const pageNumber = new URLSearchParams(new URL(currentPageUrl).search).get("page") || 1;
    pageNumberElement.textContent = `Página actual: ${pageNumber}`;


};

export { updatePagination };
