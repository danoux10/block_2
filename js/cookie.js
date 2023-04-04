function getCookie(name) {
  const cookie = document.cookie.split('; ');
  const value = cookie
      .find(c => c.startsWith(name))
      ?.split('=')[1];
  if (value === undefined) {
    return null;
  }
  return decodeURIComponent(value)
}

if(getCookie('userId') != null){
  btnDeconnexion.classList.remove('hidden');
  btnNavConnexion.classList.add('hidden');
  btnInscription.classList.add('hidden');
  homePage.classList.add('hidden');

  sinistreContent.classList.remove('hidden');
}

if(getCookie('userId') == null){
  btnDeconnexion.classList.add('hidden');
  btnNavConnexion.classList.remove('hidden');
  btnInscription.classList.remove('hidden');
  homePage.classList.remove('hidden');

  sinistreContent.classList.add('hidden');
}