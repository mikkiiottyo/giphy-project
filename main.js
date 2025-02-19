let APIKEY = "5jnRoiokTcyGqEnGr3yOtNiEMFyMwV5l"; 

document.addEventListener("DOMContentLoaded" , init);
function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault();
        let loader = document.querySelector(".loader");
        let out = document.querySelector(".out");
        let limit = 10;
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${limit}&q=`;
        let str = document.getElementById("search").value.trim();
        if (!str) {
            alert("please enter a search term!");
            return
        }
        url = url.concat(str);
        console.log(url);

        loader.style.display = "block";
        out.innerHTML = "";

        fetch(url)
        .then(response => response.json() )
        .then(content => {
            loader.style.display = "none";
            console.log(content.data)
            console.log('META' , content.meta);

            
            out.innerHTML = "";

           if (content.data.length > 0) {
            let gifs = content.data.sort(() => Math.random() -0.5).slice(0, 3);
            gifs.forEach(gif => {
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
           } else {
            out.innerHTML = "No results found!";
           }
            document.querySelector("#search").value = "";
        })
        .catch(err => {
            console.log(err);
        })
    });
}