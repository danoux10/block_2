function register(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var data = new FormData(this);
  xhr.open('POST', 'controller/function/login&register.php?task=register');
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var responce = JSON.parse(this.responseText);
      if (responce.error == 0) {
        registerForm.classList.add('hidden');
        btnInscription.classList.remove('active');
      }
      if (responce.error == 1) {
        responseRegister.classList.add('error');
        responseRegister.classList.remove('hidden');
        responseRegister.innerHTML = 'Mot de passe et confirm Mot de passe ne sont pas identique';
      }
    } else if (xhr.readyState == 4) {
      console.log('error register');
    }
  }
  return false;
}

function login(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var data = new FormData(this);
  xhr.open('POST', 'controller/function/login&register.php?task=login');
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var responce = JSON.parse(this.responseText);
      var result = JSON.stringify();
      console.log(result);
      if (responce.error == 0) {
        btnDeconnexion.classList.remove('hidden');
        btnNavConnexion.classList.add('hidden');
        btnInscription.classList.add('hidden');
        homePage.classList.add('hidden');
        loginForm.classList.add('hidden');

        sinistreContent.classList.remove('hidden');
      }
      if(responce.error == 1) {
        responseLogin.classList.add('error');
        responseLogin.classList.remove('hidden');
        responseLogin.innerHTML = 'Mot de passe Faux';
      }
    } else if (xhr.readyState == 4) {
      console.log('error login');
    }
  }
  return false;
}

function unconnect(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var data = new FormData(this);
  xhr.open('POST', 'controller/function/login&register.php?task=deconnect');
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var responce = JSON.parse(xhr.responseText);
      if (responce.error) {

      }
    } else if (xhr.readyState == 4) {
      console.log('error deconnexion');
    }
  }
  return false;
}

registerForm.addEventListener('submit', register);
loginForm.addEventListener('submit', login);
deconnexionForm.addEventListener('submit', unconnect);