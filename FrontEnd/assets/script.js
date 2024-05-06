document.addEventListener("DOMContentLoaded", function () { //The code will deroule within this function, once the DOM is completely loaded.
    
    let promise = fetchData ();

    async function fetchData () {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        console.log(data);
        return data;
    }

    promise.then(function(data) {
        let info = "";
        let i = 0;
        let project = null; /*document.createElement("figure");*/ /*Parent figure for photos and captions.*/
        let projectTitle = null; /*document.createElement("figcaption");*/ /*The caption to the figure.*/
        let parent = null; /*The parent element to input our DOM elements*/
        let projectImage = null;
        let title = ""; 
        let j = 0;

        for (i = 0; i < data.length - 1; i++) {
            parent = document.getElementById("gallery");
            project = document.createElement("figure");
        }

        for (i = 0; i < data.length - 1; i++) {
            parent = document.getElementById("figure");
                projectImage = document.createElement("img");
                projectImage.src = data[i].imageUrl;
                projectImage.alt = data[i].title;
                projectTitle = document.createElement("figcaption");
                title.innerText = data[i].title;
        }    
    });
})