'use strict'

var gImgs = []
var gImgId = 19

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
    imgs.push(createImg(i, keywords[i - 1]))
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

function getImgs() {
  return gImgs
}


