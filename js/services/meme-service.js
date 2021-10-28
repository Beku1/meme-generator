'use strict'

var gImgs = []
var gImgId = 19
var gMeme = []

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

function resetMemeLines(){
var meme = getMeme()
meme.lines[meme.selectedLineIdx]={
        text:'hello hello',
        size:40,
        align:'center',
        strokeColor: 'black',
        font:'Impact',
        color:'white',
        posX:pos.x/2,
        posY: 70
}
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

function updateMemes(){
    var memes = getMeme()
    var pos = getCanvasPos()
    memes.lines.forEach((meme , idx)=>{
          if(idx === 0){
              meme.posX = pos.x/2
              meme.posY = 60
          }
          else if(idx===1){
              meme.posX = pos.x /2
              meme.posY = pos.y -60
          }
          else{
              meme.posX = pos.x/2
              meme.posY = pos.y/2
          }
    });{
       
    }
}

function addTextLine() {
 
  var meme = getMeme()
  var pos = getCanvasPos()
  
   if(meme.lines.length === 0) 
       meme.lines[meme.lines.length] = {
       text:'hello hello',
       size:40,
       align:'center',
       strokeColor: 'black',
       font:'Impact',
       color:'white',
       posX:pos.x/2,
       posY: 70
       }
  else if (meme.lines.length === 1)
    meme.lines[meme.lines.length] = {
      text: 'hola hola',
      size: 40,
      align: 'center',
      strokeColor: 'black',
      font:'Impact',
      color: 'white',
      posX: pos.x / 2,
      posY: pos.y - 60,
    }
  else
    meme.lines[meme.lines.length] = {
      text: 'hola hello',
      size: 40,
      align: 'center',
      strokeColor: 'black',
      font:'Impact',
      color: 'white',
      posX: pos.x / 2,
      posY: pos.y / 2,
    }
  renderText(meme)
  switchTextLine()

}

function switchTextLine() {
  var meme = getMeme()
  
  if (meme.selectedLineIdx === meme.lines.length - 1) meme.selectedLineIdx = 0
  else meme.selectedLineIdx++
  console.log(meme.selectedLineIdx)
  inputText()
  renderText(meme)
}

function fontSizeChange(value) {
  var meme = getMeme()
  if (value === '+') meme.lines[meme.selectedLineIdx].size += 5
  else if (value === '-') meme.lines[meme.selectedLineIdx].size -= 5
  renderMeme()
  
}

function setTextColor(color) {
  var meme = getMeme()
  meme.lines[meme.selectedLineIdx].color = color
  renderText(meme)
}

function deleteLine(){
    var meme = getMeme()
    meme.lines.splice(meme.selectedLineIdx,1)
    if(meme.lines.length > 0)  {
        meme.selectedLineIdx = 0
        renderMeme()
   
}
else {
    renderMeme() 

}
inputText()
}


function  changeStrokeColor(color){
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].strokeColor = color
    renderMeme()
}

function moveText(value) {
    var meme = getMeme();
    meme = meme.lines[meme.selectedLineIdx];
    var increment = 10;
    switch (value) {
      case 'up':
        meme.posY -= increment;
        break;
      case 'down':
        meme.posY += increment;
        break;
      case 'left':
        meme.posX -= increment;
        break;
      case 'right':
        meme.posX += increment;
    }
    renderMeme();
  }


  function alignText(value){
      var meme = getMeme()
      meme.lines[meme.selectedLineIdx].align = value
      renderMeme()
  }


function getImgs() {
  return gImgs
}

function getMeme() {
  return gMeme
}

function getMemeLine() {
  var meme = getMeme()
  return meme.lines[meme.selectedLineIdx]
}

function setMeme(img) {
    var pos = getCanvasPos()
  gMeme = {
    selectedImgId: img.id,
    selectedLineIdx: 0,
    lines: [
      {
        text: 'hello',
        size: 40,
        align: 'center',
        strokeColor: 'black',
        color: 'white',
        posX: pos.x / 2,
        posY: 70,
      },
    ],


  }
  console.log(gMeme)
}

