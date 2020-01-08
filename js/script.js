//'http://www.omdbapi.com/?apikey=ac0ca88d&s='

let name;
let page;
let idClicked;

function ShowMovies() {
    name = document.querySelector('input').value;
    page = 1;
    let el = document.querySelector(".items-inner");
    while (el.firstChild) el.removeChild(el.firstChild);

    fetch("http://www.omdbapi.com/?apikey=ac0ca88d&tomatoes=false&s=" + name + '&page=' + page)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            const results = json.Search;

            for (let index = 0; index < results.length; index++) {
                const movie = results[index];

                RenderMovie(movie.imdbID, movie.Poster, movie.Title, movie.Year);
            }
        });

    document.querySelector('.next').style.display = 'block';
}

function ShowNextResults() {
    ++page;
    fetch("http://www.omdbapi.com/?apikey=ac0ca88d&s=" + name + '&page=' + page)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            const results = json.Search;

            for (let index = 0; index < results.length; index++) {
                const movie = results[index];

                RenderMovie(movie.imdbID, movie.Poster, movie.Title, movie.Year);
            }
        });
}

function RenderMovie(imdbID, image, title, year) {
    const MovieTemplate = document.getElementById("MovieCard");

    let MovieEl = document.createElement('div');
    MovieEl.className = 'item';
    MovieEl.innerHTML = MovieTemplate.innerHTML;
    MovieEl.id = imdbID;

    MovieEl.querySelector('.poster').src = image;
    MovieEl.querySelector('.item-title').innerHTML = title;
    MovieEl.querySelector('.item-year').innerHTML = year;

    document.querySelector(".items-inner").appendChild(MovieEl);
}

function CloseModalWindow() {
    document.querySelector('.modal-window').style.display = 'none';
}

function OpenModalWindow() {
    document.querySelector('.modal-window').style.display = 'flex';
    idClicked = event.srcElement.parentNode.id;
    fetch("http://www.omdbapi.com/?apikey=ac0ca88d&plot=full&i=" + idClicked)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            let element = document.querySelector('.modal-window');
            element.querySelector('.title').innerHTML = 'Title: '+json.Title;
            element.querySelector('.year').innerHTML = 'Year: '+json.Year;
            element.querySelector('.genre').innerHTML = 'Genre: '+json.Genre;
            element.querySelector('.actors').innerHTML = 'Actors: '+json.Actors;
            element.querySelector('.plot').innerHTML = json.Plot;
            element.querySelector('img').src = json.Poster;
        });
}

function runScript(e) {
    if(e.keyCode==13) {
        ShowMovies();
    }
}

function AddToFavorites() {
    fetch("http://www.omdbapi.com/?apikey=ac0ca88d&plot=full&i=" + idClicked)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            let item = {};
            item.title = 'Title: '+json.Title;
            item.year = 'Year: '+json.Year;
            item.genre = 'Genre: '+json.Genre;
            item.actors = 'Actors: '+json.Actors;
            item.plot = json.Plot;
            item.poster = json.Poster;
            localStorage.setItem(idClicked, JSON.stringify(item));
        });
    
}

function AddToFavorites2() {
    idClicked = event.srcElement.parentNode.id;
    console.log(idClicked);
    fetch("http://www.omdbapi.com/?apikey=ac0ca88d&plot=full&i=" + idClicked)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            let item = {};
            item.title = 'Title: '+json.Title;
            item.year = 'Year: '+json.Year;
            item.genre = 'Genre: '+json.Genre;
            item.actors = 'Actors: '+json.Actors;
            item.plot = json.Plot;
            item.poster = json.Poster;
            localStorage.setItem(idClicked, JSON.stringify(item));
        });
}

function ShowFavItems() {
    const MovieTemplate = document.getElementById("MovieFavCard");
    for (let index = 0; index < localStorage.length; index++) {
        let child = document.createElement('div');
        child.className = 'fav-item';
        child.id = localStorage.key(index);
        child.innerHTML = MovieTemplate.innerHTML;
        let data = JSON.parse(localStorage.getItem(localStorage.key(index)));
        child.querySelector('img').src = data.poster;
        child.querySelector('.title').innerHTML = data.title;
        child.querySelector('.year').innerHTML = data.year;
        child.querySelector('.genre').innerHTML = data.genre;
        child.querySelector('.actors').innerHTML = data.actors;
        child.querySelector('.plot').innerHTML = data.plot;
        document.querySelector('.fav-items-inner').appendChild(child);
    }
}

function Remove() {
    localStorage.removeItem(event.srcElement.parentElement.parentElement.parentElement.id);
    event.srcElement.parentElement.parentElement.parentElement.remove();
}
