'use strict'
var gElCanvas
var gCtx
var gImg

function initCanvas(){
    setCanvas()
    addMouseListeners()
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
    renderMeme()
}

function changeFonts(value){
   var meme = getMeme()
   meme.lines[meme.selectedLineIdx].font = value
   renderMeme()
}

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


function shareImg(){
    var imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl){
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)

    }
   doUploadImg(imgDataUrl,onSuccess)
}
function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then((url)=>{
        console.log('Got back live url:', url);
        onSuccess(url)
    })
    .catch((err) => {
        console.error(err)
    })
}

function addMouseListeners() {
    window.addEventListener("resize", () => {
      resizeCanvas();
    });
  }

function openGen(img){
    toggleGen(true)
    setImg(img)
    setMeme(img) 
    resizeCanvas()
    updateMemes()
    inputText()
    
    var ctx = getCtx()
    ctx.drawImage(img,0,0,gElCanvas.width, gElCanvas.height)
    
    
}

function getImg(){
    return gImg
}

function setImg(img){
    gImg = img
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



function renderMeme(){
     clearCanvas()
     var meme = getMeme()
     renderImage(meme.selectedImgId)
    renderText(meme)
}




function getCanvasPos(){
    var pos = {
      x:gElCanvas.width,
     y:gElCanvas.height
    }
   return pos

}

function changeText(text){
    var meme = getMeme()
    if(meme.lines.length === 0 ) {
        addTextLine()
    }
  meme.lines[meme.selectedLineIdx].text = text
  renderMeme()
}

function renderImage(){
    var img = getImg()
  
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

