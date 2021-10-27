'use strict'
var gElCanvas
var gCtx


function initCanvas(){
    getCanvas()

}


function getCanvas(){
    gElCanvas = document.querySelector('.meme-gen-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function resizeCanvas(img){
    gElCanvas.width = 300
    gElCanvas.height = gElCanvas.width * img.height / img.width
}

function openGen(img){
    toggleGen(true)
    setMeme(img)
    resizeCanvas(img)
    var ctx = getCtx()
    ctx.drawImage(img,0,0,gElCanvas.width, gElCanvas.height)

}



function getCanvasPos(){
    var pos = {
      x:gElCanvas.width,
     y:gElCanvas.height
    }
   return pos


}


function renderText(textIdx){
 
  var meme = getMeme()
  
}


function getCtx(){
    return gCtx
}

function getElCanvas(){
    return gElCanvas
}

