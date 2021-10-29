'use strict'
var gElCanvas
var gCtx



function initCanvas(){
    setCanvas()
    addMouseListeners()
}


function openGen(img){
    toggleGen(true)
    setImg(img)
    setMemeImg(img) 
    resizeCanvas()
    updateMemes()
    inputText()
    setMemeIdx()
    var ctx = getCtx()
    ctx.drawImage(img,0,0,gElCanvas.width, gElCanvas.height)  
}

function openGenReady(memeIdx){
    toggleGen(true)
    var deleteButton = document.querySelector('.delete-meme')
    var savedMemes = getMemesGallery()
    var imgId = savedMemes[memeIdx].memeEditingInfo.selectedImgId
    var elImg = document.getElementById(imgId)
    setImg(elImg)
    setEditedMeme(savedMemes[memeIdx].memeEditingInfo) 
    resizeCanvas()
    deleteButton.classList.remove('hidden')
    setMemeIdx(memeIdx)
}




function setCanvas(){
    gElCanvas = document.querySelector('.meme-gen-canvas')
    gCtx = gElCanvas.getContext('2d')
}


function getCanvas(){
    return document.querySelector('.meme-gen-canvas')
}

function resizeCanvas(){
   
    var img = getImg()
    var elCanvas = getCanvas()
    var elContainer = document.querySelector(".canvas-container");
    elCanvas.width = elContainer.offsetWidth - 50;
    elCanvas.height = (elCanvas.width * img.height) / img.width;
    updateMemes()
    var meme = getMeme()
    
    renderMeme(meme)
    
        
    
    
}



function addMouseListeners() {
    window.addEventListener("resize", () => {
      resizeCanvas();
    });
  }



function inputText() {
    var meme = getMeme();
    if(meme.lines.length === 0 )  {

        resetMemeLines()
        return
    }
    var input = document.querySelector('.meme-text');
    input.value = meme.lines[meme.selectedLineIdx].text;
     
  }



function renderMeme(meme){
     clearCanvas()
     renderImage(meme.selectedImgId)
    renderText(meme)
    setMeme(meme)
}




function getCanvasPos(){
    var pos = {
      x:gElCanvas.width,
     y:gElCanvas.height
    }
   return pos

}



function renderImage(){
    var img = getImg()
    console.log(img)
   gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
}

function renderText(meme){
  meme.lines.forEach((memeInfo)=>{
      gCtx.lineWidth = 2
      gCtx.fillStyle = memeInfo.color
      gCtx.strokeStyle = memeInfo.strokeColor
      gCtx.textAlign = memeInfo.align
      gCtx.font =`${memeInfo.size}px ${memeInfo.font}`
      gCtx.fillText(memeInfo.text.toUpperCase(),memeInfo.posX , memeInfo.posY)
      gCtx.strokeText(memeInfo.text.toUpperCase(),memeInfo.posX,memeInfo.posY)
  })
  setMeme(meme)
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  }

function getCtx(){
    return gCtx
}

function getElCanvas(){
    return gElCanvas
}

