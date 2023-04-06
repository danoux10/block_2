function initMap() {
  // Centrer la carte sur Paris
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.8566, lng: 2.3522},
    zoom: 12
  });

  infoWindow = new google.maps.InfoWindow();

  // Récupérer la position de l'utilisateur (si possible)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Centrer la carte sur la position de l'utilisateur
      infoWindow.setPosition(pos);
      infoWindow.setContent('Votre position actuelle.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      // En cas d'erreur lors de la récupération de la position
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Si la géolocalisation n'est pas supportée par le navigateur
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
      'Erreur: la géolocalisation a échoué.' :
      'Erreur: votre navigateur ne supporte pas la géolocalisation.');
  infoWindow.open(map);
}

function getDepanneurs() {
  var service = new google.maps.places.PlacesService(map);

  // Récupérer les dépanneurs dans un rayon donné autour de la position actuelle
  service.nearbySearch({
    location: map.getCenter(),
    radius: 10000, // rayon en mètres
    type: ['car_repair'] // type de lieu recherché
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Afficher les résultats dans une liste
      var list = document.createElement('ul');
      results.forEach(function(result) {
        var item = document.createElement('li');
        item.innerHTML = result.name + " - " + result.vicinity;
        list.appendChild(item);
      });
      viewDepanneur.appendChild(list);
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
// sinistreForm.addEventListener('submit',getDepanneurs);