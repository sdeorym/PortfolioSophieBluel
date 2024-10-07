//The code will develop within this function, once the DOM is completely loaded:
document.addEventListener('DOMContentLoaded', function () {     
    var token;

    //We contact the API (asynchrone function).
    async function login(email, password) {
        //let token = localStorage.getItem('authToken');

        try {

            //We compare the introduced mail & passwords with those in the API.
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            //We process the response as JSON only if the request was successful
            const data = await response.json();
        
            //Different response options
            switch (response.status) {
                case 500:
                    alert('Erreur du serveur');
                    console.log('naranjas de la china');
                    break;
                case 404:
                    alert('Utilisateur inconnu.');
                    console.log('naranjas de la china, mandarinas');
                    break;
                case 401:
                    alert('Utilisateur non autorisé');
                    console.log('naranjas de la china, tangerines');
                    break;
                case 200:
                    // Store the token in the local storage (so we can reuse them in the 'admin' calls)
                    localStorage.setItem('authToken', data.token);
                    token = data.token;
                    window.location.href = './index.html';
                    console.log('naranjas de la china, pomelos');
                    break;
                default:
                    alert('Erreur unconnue');
                    console.log('naranjas de la china, limones');
                    window.location.href = './login.html';
                    break;
            }            
        }

        catch (error) {
            console.log('Erreur du serveur', error);
            return { status: 500, data: null }; 
        }
    }

    //We obtain data from the form on the login page.
    const form = document.getElementById('loginform');
    console.log('form', form);
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // We won't be sending the form by default

        //We get the specific data from the form
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        
        login(email, password);
    });

});
