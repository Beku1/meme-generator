'use strict'
var gElCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initCanvas() {
  setCanvas()
  addMouseListeners()
}

function openGen(img, isSaveable = false) {
  var deleteButton = document.querySelector('.delete-meme')
  deleteButton.classList.add('hidden')
  if (isSaveable) {
    var elSaveMeme = document.querySelector('.save-meme')
    elSaveMeme.classList.remove('hidden')
  }
  toggleGen(true)
  setImg(img)
  setMemeImg(img)

  resizeCanvas()
  updateMemes()
  inputText()
  setMemeIdx()
  var ctx = getCtx()
  ctx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function openGenReady(memeIdx) {
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

function setCanvas() {
  gElCanvas = document.querySelector('.meme-gen-canvas')
  gCtx = gElCanvas.getContext('2d')
}

function getCanvas() {
  return document.querySelector('.meme-gen-canvas')
}

function resizeCanvas() {
  //    if(!elMemeGen.contains('.hidden')){
  var img = getImg()
  var elCanvas = getCanvas()
  var elContainer = document.querySelector('.canvas-container')
  elCanvas.width = elContainer.offsetWidth - 50
  elCanvas.height = (elCanvas.width * img.height) / img.width
  updateMemes()
  var meme = getMeme()

  renderMeme(meme)
}

function addMouseListeners() {
  window.addEventListener('resize', () => {
    resizeCanvas()
  })
}

function inputText() {
  var meme = getMeme()
  if (meme.lines.length === 0) {
    resetMemeLines()
    return
  }
  var input = document.querySelector('.meme-text')
  input.value = meme.lines[meme.selectedLineIdx].text
}

function renderMeme(meme, isSaving = false) {
  clearCanvas()
  setMeme(meme)

  renderImage(meme.selectedImgId)
  renderText(meme)
  renderSelectedLine(isSaving)
}

function getCanvasPos() {
  var pos = {
    x: gElCanvas.width,
    y: gElCanvas.height,
  }
  return pos
}

function renderImage() {
  var img = getImg()

  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderText(meme) {
  var ctx = getCtx()
  meme.lines.forEach((memeInfo) => {
    ctx.lineWidth = 2
    ctx.setLineDash([0, 0])
    ctx.fillStyle = memeInfo.color
    ctx.strokeStyle = memeInfo.strokeColor
    ctx.textAlign = memeInfo.align
    ctx.font = `${memeInfo.size}px ${memeInfo.font}`
    ctx.fillText(memeInfo.text.toUpperCase(), memeInfo.posX, memeInfo.posY)
    ctx.strokeText(memeInfo.text.toUpperCase(), memeInfo.posX, memeInfo.posY)
  })
  setMeme(meme)
}

function isTextClicked(clickedPos) {
  var memes = getMeme()
  var rectPos = getRectPos(memes)

  var clickedIdx
  rectPos.forEach((pos) => {
    console.log('clickedPos.x',clickedPos.x ,'\n pos.posXRectStart',pos.posXRectStart,'\npos.posXend',pos.posXend,'\nclickedPos.y',clickedPos.y,'\npos.posYRectStart ',pos.posYRectStart,'\npos.posYend',pos.posYend)
    if (
      clickedPos.x >= pos.posXRectStart &&
      clickedPos.x <= pos.posXend &&
      clickedPos.y >= pos.posYRectStart &&
      clickedPos.y <= pos.posYend
    )
      clickedIdx = pos.memeIdx
  })

  if (clickedIdx > -1) {
    memes.selectedLineIdx = clickedIdx
    renderClickedText(
      rectPos[clickedIdx].posXRectStart,
      rectPos[clickedIdx].posXRectEnd,
      rectPos[clickedIdx].posYRectStart,
      rectPos[clickedIdx].posYRectEnd
    )
    setMeme(memes)
    return true
  }
}
function renderClickedText(posXstart, posXend, posYstart, posYend) {
  var ctx = getCtx()
  ctx.strokeStyle = 'black'
  ctx.setLineDash([5, 5])
  ctx.strokeRect(posXstart, posYstart, posXend, posYend)
}

function getRectPos(memes, idx = '') {
  var ctx = getCtx()
  var rectPos = []
  memes.lines.forEach((meme, memeIdx) => {
    console.log('posY',meme.posY)
    var textSize = ctx.measureText(meme.text).width
    var fontSize = meme.size
    var posX = meme.posX
    var posY = meme.posY
    var posXstart = posX - textSize / 2 - 20
    var posYstart = posY - fontSize 
    var posXend = posX + textSize / 2 + 20
    var posYend = posY + fontSize / 1.5
    var posXRectStart = posX - textSize / 2 - 30
    var posYRectStart = posY - fontSize - 15
    var posXRectEnd = textSize + 60
    var posYRectEnd = fontSize * 2
    var posXend = posXRectStart + posXRectEnd 
    var posYend = posYRectStart + posYRectEnd 
    rectPos.push({
      posXstart,
      posYstart,
      posXend,
      posYend,
      memeIdx,
      posYRectEnd,
      posXRectEnd,
      posXRectStart,
      posYRectStart,
    })
  })
  return rectPos
}

function addMouseListeners() {
  var canvas = getElCanvas()
  canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove);
  window.addEventListener('resize', () => {
    resizeCanvas()
  })
  
    canvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  var canvas = getElCanvas()
    
  canvas.addEventListener('touchstart', onDown)
  canvas.addEventListener('touchmove', onMove);
    canvas.addEventListener('touchend', onUp);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function getCtx() {
  return gCtx
}

function getElCanvas() {
  return gElCanvas
}

function toggleMenu() {
  document.querySelector('.screen').classList.toggle('open')
  document.querySelector('.main-menu').classList.toggle('open-menu')
  document.querySelector('.nav-list').classList.toggle('nav-open')
  document.querySelector('.nav-list').classList.toggle('opacity')
}

function closeMenu() {
  document.querySelector('.screen').classList.remove('open')
  document.querySelector('.main-menu').classList.remove('open-menu')
  document.querySelector('.nav-list').classList.remove('nav-open')
  document.querySelector('.nav-list').classList.remove('opacity')
}
