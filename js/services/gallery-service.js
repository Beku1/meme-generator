'use strict'

var gImgs = []
var gImgId = 19
var gId = 1

var gKeywords = { funny: 5, sleepy: 5, politics: 4, OG: 7, cute: 5 }

function initMemes() {
  gImgs = createImgs()
}

function createImg(id, keywords) {
  let meme = {
    id,
    url: `./img/memes/${id}.jpg`,
    keywords,
  }
  return meme
}

function createUploadedImg(img){
  var id = getId()
var img = {
  id,
  url:img,
  keywords:['new']
}
setId(id+1)
addImg(img)
}

function addImg(imgInfo){
  var imgs = getImgs()
  imgs.push(imgInfo)

}

function getId(){
  return gId
}

function setId(id){
  gId = id

}



function createImgs() {
  
  var keywords = [
    ['politics', 'funny'],
    ['cute', 'love'],
    ['cute', 'sleepy'],
    ['cute', 'sleepy'],
    ['cute', 'funny', 'OG'],
    ['funny', 'OG'],
    ['funny'],
    ['OG', 'funny'],
    ['cute', 'funny'],
    ['OG', 'funny', 'politics'],
    ['funny'],
    ['funny'],
    ['OG', 'epic'],
    ['OG', 'matrix', 'epic', 'funny'],
    ['OG', 'funny'],
    ['funny'],
    ['politics', 'funny'],
    ['funny'],
  ]
  let imgs = []
  for (var i = 1; i <= 18; i++) {
    var id = getId()
    imgs.push(createImg(id, keywords[id]))
    setId(++id)
  }
  return imgs
}

function getImgById(id){
  var imgs = getImgs()
  return imgs.filter(currImg => {
    
      if(currImg.id == id) {
        console.log(currImg)
        return currImg.url
      }

  })
}

function onImgInput(ev) {
 var elSaveMeme = document.querySelector('.save-meme')
 elSaveMeme.classList.add('hidden')
  var img = URL.createObjectURL(ev.target.files[0])
   
  createUploadedImg(img)
  loadImageFromInput(ev, goToOpenGen);
}
function goToOpenGen(ev){
  openGen(ev,false)

}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImg = img;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function setImgs(imgs){
  gImgs = imgs
}

function getImgs() {
  return gImgs
}


