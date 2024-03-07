const input = document.querySelector("input");
const favoriteBtn = document.querySelector(".btn-favorite");
const submitBtn = document.querySelector(".submit");
const Key = "905f57b3";
const ul = document.querySelector("ul");



function getMovie() {
    if (input.value !== "") {
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
                    <button>&#129505;</button>       
                    `;
                    ul.appendChild(li);

                });

            })
            .catch(e => console.error(e));
    }
}

submitBtn.addEventListener("click", getMovie);
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getMovie();
    }
});