btnDeconnexion.classList.add('hidden');
sinistreContent.classList.add('hidden');

loginForm.classList.add('hidden');
registerForm.classList.add('hidden');

responseLogin.classList.add('hidden');
responseRegister.classList.add('hidden');

function showRegister(){
  if(!btnInscription.classList.contains('active')){
    btnInscription.classList.add('active');
    registerForm.classList.remove('hidden');
  }else{
    btnInscription.classList.remove('active');
    registerForm.classList.add('hidden');
  }
}

function showLogin(){
  if(!btnNavConnexion.classList.contains('active') || !btnBodyConnexion.classList.contains('active')){
    btnNavConnexion.classList.add('active');
    btnBodyConnexion.classList.add('active');

    loginForm.classList.remove('hidden');
  }else{
    btnNavConnexion.classList.remove('active');
    btnBodyConnexion.classList.remove('active');

    loginForm.classList.add('hidden');
  }
}

btnInscription.addEventListener('click',showRegister);
btnNavConnexion.addEventListener('click',showLogin);
btnBodyConnexion.addEventListener('click',showLogin);