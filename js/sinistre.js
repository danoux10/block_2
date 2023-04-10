function findDepanneurs() {
  // Récupérer la position actuelle de l'utilisateur
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getDepanneurs);
  } else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
  }
}

// Trouver les dépanneurs à proximité de la position actuelle de l'utilisateur
function getDepanneurs(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Récupérer les dépanneurs dans un rayon défini autour de la position actuelle
  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.nearbySearch({
    location: {lat: latitude, lng: longitude},
    radius: 10000,//distance en metre (10km)
    type: ['car_repair']
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var viewDepanneur = document.getElementById("view-depanneur");
      viewDepanneur.innerHTML = "";

      // Ajouter un bloc pour chaque dépanneur trouvé
      for (var i = 0; i < results.length; i++) {
        var place = results[i];

        var depanneurElement = document.createElement("div");
        depanneurElement.classList.add("depanneur-element");

        var name = document.createElement("p");
        name.classList.add('name');
        name.innerHTML = place.name;
        depanneurElement.appendChild(name);

        var address = document.createElement("p");
        address.classList.add('address');
        address.innerHTML = place.vicinity;
        depanneurElement.appendChild(address);

        viewDepanneur.appendChild(depanneurElement);
      }
    }
  });
}
function getSinistre(event){
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var data = new FormData(this);
  xhr.open('POST','controller/function/accident.php?task=sinistre');
  xhr.send(data);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){

    }else if(xhr.readyState == 4){
      console.log('error sinistre');
    }
  }
  return false;
}

sinistreForm.addEventListener('submit',getSinistre);
sinistreForm.addEventListener('submit',findDepanneurs);