'use strict'

var gImgs = []
var gImgId = 19
var gId = 1

var gKeywords = {}

function initMemes() {
  gImgs = createImgs()
  createImg()
}

// function getKeywords() {
//   return gKeywords
// }

function createImg(id, keywords) {
  let meme = {
    id,
    url: `./img/memes/${id}.jpg`,
    keywords: keywords,
  }
  return meme
}

function createUploadedImg(img) {
  var id = getId()
  var img = {
    id,
    url: img,
    keywords: ['new'],
  }
  setId(id + 1)
  addImg(img)
}

function addImg(imgInfo) {
  var imgs = getImgs()
  imgs.push(imgInfo)
}

function getId() {
  return gId
}

function setId(id) {
  gId = id
}

function createImgs() {
  var keywords = [
    ['politics', 'funny'],
    ['cute', 'love'],
    ['cute', 'sleepy'],
    ['cute', 'sleepy'],
    ['cute', 'OG'],
    ['funny', 'OG'],
    ['funny'],
    ['OG'],
    ['cute', 'funny'],
    ['OG', 'politics'],
    ['nice'],
    ['funny'],
    ['OG', 'epic'],
    ['OG', 'matrix', 'epic'],
    ['OG'],
    ['funny'],
    ['politics'],
    ['funny'],
    ['funny'],
  ]
  let imgs = []
  keywords.forEach((keyword) => {
    var id = getId()
    imgs.push(createImg(id, keyword))
    setId(++id)
  })
  keywords.forEach((keyword) => {
    keyword.forEach((key) => {
      if (!gKeywords[key]) gKeywords[key] = 0
      gKeywords[key]++
    })
  })

  return imgs
}

// function keywordClicked(keyword) {

// }

// function keywordSizeUp(keyword) {
//   gKeywords[keyword]++
  
// }



function getImgById(id) {
  var imgs = getImgs()
  return imgs.filter((currImg) => {
    if (currImg.id == id) {
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
  loadImageFromInput(ev, goToOpenGen)
}
function goToOpenGen(ev) {
  openGen(ev, false)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = function (event) {
    var img = new Image()
    img.onload = onImageReady.bind(null, img)
    img.src = event.target.result
    gImg = img
  }
  reader.readAsDataURL(ev.target.files[0])
}

function setImgs(imgs) {
  gImgs = imgs
}

function getImgs() {
  return gImgs
}
