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
        let portfolio = "";
        let project = null; /*document.createElement("figure");*/ /*Parent figure for photos and captions.*/
        let projectTitle = null; /*document.createElement("figcaption");*/ /*The caption to the figure.*/
        let parents = []; /*The parent element to input our DOM elements*/
        let projectImage ="";
        let title = "";
        let monDiv = "";
        let categ = [];
        let j = 0;
        console.log(data[0].category.nom);
        

        portfolio = document.querySelector("#portfolio");

        //I create element <h2>Mes Projets</h2
        project = document.createElement("h2");
        project.innerText = "Mes Projets";
        portfolio.appendChild(project);

        //I create element <div class="gallery">Mes Projets</div>
        monDiv = document.createElement("div");
        monDiv.classList.add("gallery");
        portfolio.appendChild(monDiv);

        parents = document.querySelector("#portfolio .gallery");
        for (i = 0; i < data.length; i++) {
            let project = document.createElement("figure");
            parents.appendChild(project);

            let projectImage = document.createElement("img");
            projectImage.src = data[i].imageUrl;
            projectImage.alt = data[i].title;
            project.appendChild(projectImage);

            let projectTitle = document.createElement("figcaption");
            projectTitle.innerText = data[i].title;
            project.appendChild(projectTitle);
        }

    });
})