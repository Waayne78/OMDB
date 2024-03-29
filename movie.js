const input = document.querySelector("input");
const favoriteBtn = document.querySelector(".btn-favorite");
const submitBtn = document.querySelector(".submit");
const Key = "905f57b3";
const ul = document.querySelector("ul");

function displayMovie() {
    if (input.value !== "") {
        ul.innerHTML = "";
        const URL = `http://www.omdbapi.com/?s=${input.value}&apikey=${Key}`;
        axios.get(URL)
            .then(res => {
                const body = res.data.Search;
                console.log(body);
                body.forEach(element => {
                    const title = element.Title;
                    const year = element.Year;
                    const poster = element.Poster;
                    const li = document.createElement("li");
                    li.innerHTML = ` 
                    <img src="${poster}" alt="poster">
                    <h2>${title}</h2>
                    <h3>${year}</h3>  
                    <button class="btn-add">Add to favorite</button>       
                    `;
                    ul.appendChild(li);
                });
            }).catch(e => console.error(e));
    }
}

function addFavorite() {
    const btnAdd = document.querySelectorAll(".btn-add");
    btnAdd.forEach(btn => {
        btn.addEventListener("click", () => {
            const li = btn.parentElement;
            const title = li.querySelector("h2").textContent;
            const year = li.querySelector("h3").textContent;
            const poster = li.querySelector("img").src;
            const liFav = document.createElement("li");
            liFav.innerHTML = ` 
            <img src="${poster}" alt="poster">
            <h2>${title}</h2>
            <h3>${year}</h3>  
            <button class="btn-remove">Remove</button>  
            `;
            ul.appendChild(liFav);
            btn.remove();
        });
    });
}

function removeFavorite() {
    const btnRemove = document.querySelectorAll(".btn-remove");
    btnRemove.forEach(btn => {
        btn.addEventListener("click", () => {
            const li = btn.parentElement;
            li.remove();
        });
    });
}

favoriteBtn.addEventListener("click", () => {
    ul.innerHTML = "";
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.forEach(movie => {
        const li = document.createElement("li");
        li.innerHTML = ` 
        <img src="${movie.poster}" alt="poster">
        <h2>${movie.title}</h2>
        <h3>${movie.year}</h3>  
        <button class="btn-remove">Remove</button>  
        `;
        ul.appendChild(li);
    });

    removeFavorite();
});

submitBtn.addEventListener("click", displayMovie);

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        displayMovie();
    }
});

