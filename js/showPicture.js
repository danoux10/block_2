function showPicture(){
  const files = picture.files;
  for(let i = 0; i < files.length; i++){
    const file = files[i];
    if(file.type.match('image.*')){
      const img = document.createElement('img');
      img.src= URL.createObjectURL(file);
      pictureContent.appendChild(img);
    }
  }
}