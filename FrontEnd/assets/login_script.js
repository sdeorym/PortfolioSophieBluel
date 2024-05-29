document.addEventListener("DOMContentLoaded", function () { //The code will develop within this function, once the DOM is completely loaded.
    
    let promise = fetchData();
    let connection;

    //We contact the API.
    async function fetchData () {
        try {
            //We compare the introduced mail & passwords with those in the API.
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
        
            //We get an answer if email or password are incorrect.
            if (!response.ok) {
                return { status: response.status, data: null };
            }
        }

        catch (error) {
            console.error('Erreur du serveur', error);
            return { status: 500, data: null }; 
        }

    }

    //We obtain data from the form on the login page.
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // We won't be sending the form by default

        //We get the specific data from the form
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let token = localStorage.getItem('authToken');

        promise.then(function (connection) {
            switch (connection.status) {
                case 500:
                    alert("Erreur du serveur");
                    console.log("naranjas de la china");
                    break;
                case 404:
                    alert("Utilisateur inconnu.");
                    console.log("naranjas de la china, mandarinas");
                    break;
                case 401:
                    alert("Utilisateur non autorisé");
                    console.log("naranjas de la china, tangerines");
                    break;
                case 200:
                    window.location.href = './index.html';
                    console.log("naranjas de la china, pomelos");
                    break;
                default:
                    alert('Error desconocido');
                    console.log("naranjas de la china, limones");
                    window.location.href = './login.html';
                    break;
            }
        });
    });

});
