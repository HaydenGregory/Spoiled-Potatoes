

function renderMovies(movieArray) {
    // console.log(movieArray);
    return movieHTMLArray = movieArray.map((currentMovie) => {
        return `
        <div class="movieStyle">
            <h5 class="movie-title">${currentMovie.Title}</h5>
        </div>`;
    }).join('');
}

function renderContent(data) {
    return movieContainer.innerHTML = renderMovies(data);
}

