const imageContainer = document.getElementById('image_container');
const loader = document.getElementById('loader')

let ready = false;
let imagesloaded = 0;
let totalimages = 0

//Unsplash API
const count = 30;
const apiKey = 'h9YQal63DnzdC4q8qV32hF8-i6qYYfmDwGpgeklf5Uo';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Check if all images are loaded or not

function imageLoaded(){  
  imagesloaded++;
  if(imagesloaded===totalimages){
    ready = true;
    loader.hidden = true;
  }
}


//Get photos from UnSplash API

async function getPhotos(){

  try {
    const response = await fetch(apiUrl)
    let photosArray= await response.json();
    displayPhotos(photosArray);
  } catch (error) {
    
  }

}

//Helper Function to setAttributes

function setAttributes(element,attributes){

  for (const attr in attributes){
    element.setAttribute(attr,attributes[attr]); 
  }

}


//Create Elements for the links and link it to the screen placeholders
function displayPhotos(photosArray){ 

  imagesloaded = 0;
  photosArray.forEach((photo) => {
    totalimages = photosArray.length;    
    const item = document.createElement("a");
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
   
    setAttributes(item,{
      href:photo.links.html,
      target: '_blank'
    });

    //Create <img> for photo
  
    const img = document.createElement("img");
  
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);
    
    setAttributes(img,{
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.alt_description

    });

    img.addEventListener('load',imageLoaded);
    //Put the image inside the anchor element then put both inside image container element
  
    item.appendChild(img);
    document.getElementById('image_container').appendChild(item);
    });
}


//Check if the scroll is near the end and trigger the function

window.addEventListener('scroll',()=>{
 
  if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
    ready = false;
    getPhotos();
    console.log('Scrolled');

  }
})

getPhotos();

//displayPhotos()