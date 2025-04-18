// LinkWay - Script de géolocalisation avec stockage local

// Sélecteurs DOM
const getLocationBtn = document.getElementById("getLocationBtn");
const locationHistoryList = document.getElementById("locationHistory");

// Fonction pour obtenir la position de l'utilisateur
function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(saveLocation, showError);
  } else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
  }
}

// Sauvegarder la position dans le localStorage
function saveLocation(position) {
  const coords = position.coords;
  const timestamp = new Date().toLocaleString();

  const entry = {
    lat: coords.latitude,
    lon: coords.longitude,
    time: timestamp
  };

  // Récupérer l'historique actuel
  let history = JSON.parse(localStorage.getItem("locationHistory")) || [];

  // Ajouter la nouvelle position
  history.push(entry);

  // Enregistrer à nouveau dans le localStorage
  localStorage.setItem("locationHistory", JSON.stringify(history));

  // Afficher l'entrée dans la liste
  displayHistory();
}

// Afficher l'historique
function displayHistory() {
  const history = JSON.parse(localStorage.getItem("locationHistory")) || [];
  locationHistoryList.innerHTML = ""; // Effacer la liste existante

  history.reverse().forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.time} — Lat: ${item.lat.toFixed(5)}, Lon: ${item.lon.toFixed(5)}`;
    locationHistoryList.appendChild(li);
  });
}

// Gestion des erreurs
function showError(error) {
  alert("Erreur de géolocalisation : " + error.message);
}

// Écouteur d’événement sur le bouton
getLocationBtn.addEventListener("click", getLocation);

// Affichage initial de l'historique au chargement de la page
displayHistory();
