async function BluelProjects() {
    let projets = await fetch ("http://localhost:5678/api/works");
    console.log(projets);
}

async function mesProjets() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok) {
        throw new Error("Le réponse n'a pas eu de succès");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Il y a eu une erreur', error);
    }
}


