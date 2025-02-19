let APIKEY = "5jnRoiokTcyGqEnGr3yOtNiEMFyMwV5l"; 

document.addEventListener("DOMContentLoaded" , init);
function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault();
        let limit = 10;
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${limit}&q=`;
        let str = document.getElementById("search").value.trim();
        if (!str) {
            alert("please enter a search term!");
        }
        url = url.concat(str);
        console.log(url);
        fetch(url)
        .then(response => response.json() )
        .then(content => {
            console.log(content.data)
            console.log('META' , content.meta);

            let out = document.querySelector(".out");
            out.innerHTML = "";

            content.data.forEach(gif => {
            let fig = document.createElement('figure');
            let img = document.createElement('img');
            let fc = document.createElement('figcaption');

            img.src = gif.images.downsized.url;
            img.alt = gif.title;
            fc.textContent = gif.title;
            
            fig.appendChild(img);
            fig.appendChild(fc);
            out.appendChild(fig);
            });
            document.querySelector("#search").value = "";
        })
        .catch(err => {
            console.log(err);
        })
    });
}