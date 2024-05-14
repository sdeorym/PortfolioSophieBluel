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
        let nomsCategories = [];
        let container = "";
        let boutons = "";
        let boutonClick = "";
        let activeChoice = [];
        let choix = "";
        let filteredData;

        // We create the categories name lists to create the buttons.
        for (i = 0; i < data.length; i++) {
                data.forEach((item) => {
                // We put the category names within an array
                nomsCategories.push(item.category.name);
            });
        }

        let nomsProjets = new Set(nomsCategories);

        // Convertir el conjunto de nuevo a un array
        let nomsButtons = Array.from(nomsProjets);
        nomsButtons.unshift("Tous");

        //We select id portfolio to create h2, buttons and gallery
        portfolio = document.querySelector("#portfolio");

        //I create element <h2>Mes Projets</h2>
        project = document.createElement("h2");
        project.innerText = "Mes Projets";
        portfolio.appendChild(project);

        //I create a div to contain my buttons
        container = document.createElement("div");
        container.classList.add("filters");
        portfolio.appendChild(container);

        for (i = 0; i < nomsButtons.length; i++){
            boutons = document.createElement("button");
            boutons.innerText = nomsButtons[i];
            container.appendChild(boutons);
        }

        boutonClick = document.querySelectorAll("#portfolio .filters button");
        boutonClick.forEach (button => {
            button.addEventListener("click", () => {
                choix = button.innerText;

                if (choix === "Tous") {
                    filteredData = data;

                } else {
                    filteredData = data.filter(item => item.category.name === choix);
                }
                //The gallery content is reseted to 0
                parents.innerHTML = '';

                //We generate a gallery for each button
                monDiv = document.createElement("div");
                monDiv.classList.add("gallery");
                portfolio.appendChild(monDiv);
                parents = document.querySelector("#portfolio .gallery");
                for (i = 0; i < filteredData.length; i++) {
                    let project = document.createElement("figure");
                    parents.appendChild(project);
        
                    let projectImage = document.createElement("img");
                    projectImage.src = filteredData[i].imageUrl;
                    projectImage.alt = filteredData[i].title;
                    project.appendChild(projectImage);
        
                    let projectTitle = document.createElement("figcaption");
                    projectTitle.innerText = filteredData[i].title;
                    project.appendChild(projectTitle);
                }
            });
        })

    });
});