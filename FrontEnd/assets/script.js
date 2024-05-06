document.addEventListener("DOMContentLoaded", function () { //The code will deroule within this function, once the DOM is completely loaded.
    
    let promise = fetchData ();

    async function fetchData () {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        console.log(data);
        return data;
    }

    promise.then(function(data) {
        console.log(data);
        let info = "";
        let i = 0;
        let project = null; /*document.createElement("figure");*/ /*Parent figure for photos and captions.*/
        let projectTitle = null; /*document.createElement("figcaption");*/ /*The caption to the figure.*/
        let parents = []; /*The parent element to input our DOM elements*/
        let projectImage ="";
        let title = ""; 

        parents = document.getElementsByClassName("gallery");
        for (i = 0; i < data.length; i++) {
            project = document.createElement("figure");
            parents[0].appendChild(project);
        }

        parents = document.getElementsByTagName("figure");
        for (i = 0; i < data.length; i++) {            
            projectImage = document.createElement("img");
            parents[i].appendChild(projectImage);
            projectImage.src = data[i].imageUrl;
            projectImage.alt = data[i].title;
            projectTitle = document.createElement("figcaption");
            parents[i].appendChild(projectTitle);
            projectTitle.innerText = data[i].title;
        } 

    });
})