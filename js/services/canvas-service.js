'use strict'


var gImg
var gMeme = []
var gMemeIdx = ''


function getImg(){
    return gImg
}


function setImg(img){
    gImg = img
}


function resetMemeLines(){
    var meme = getMeme()
    var elCanvas = getElCanvas()
    var pos = {x:elCanvas.width,y:elCanvas.height}
 
    meme.lines[meme.selectedLineIdx]={
            text:'hello hello',
            size:30,
            align:'center',
            strokeColor: 'black',
            font:'Impact',
            color:'white',
            posX:pos.x/2,
            posY: 70
    }
    setMeme(meme)
    }

    function updateMemes(){
        var meme = getMeme()
        var pos = getCanvasPos()
        
        meme.lines.forEach((currMeme , idx)=>{
           
              if(idx === 0){
                  
                  currMeme.posX = pos.x/2
                  currMeme.posY = 60
              }
              else if(idx===1){
                  currMeme.posX = pos.x /2
                  currMeme.posY = pos.y -60
              }
              else{
                  currMeme.posX = pos.x/2
                  currMeme.posY = pos.y/2
              }
        });{
           
        }
        setMeme(meme)
    }

   function setMemeIdx(idx = ''){
gMemeIdx = idx
if(idx === '') gMemeIdx = ''

    }

function addTextLine() {
 
    var meme = getMeme()
    var pos = getCanvasPos()
    
     if(meme.lines.length === 0) 
         meme.lines[meme.lines.length] = {
         text:'hello hello',
         size:30,
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
        size: 30,
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
        size:30,
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
  
    inputText()
    renderText(meme)
    
  }

  function getMemeIdx(){
    return gMemeIdx
  }

  
function fontSizeChange(value) {
    var meme = getMeme()
    if (value === '+') meme.lines[meme.selectedLineIdx].size += 5
    else if (value === '-') meme.lines[meme.selectedLineIdx].size -= 5
    renderMeme(meme)
    
    
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
          renderMeme(meme)
     
  }
  else {
    renderMeme(meme)
  
  }
  inputText()
  }
  
  
  function  changeStrokeColor(color){
      var meme = getMeme()
      meme.lines[meme.selectedLineIdx].strokeColor = color
      renderMeme(meme)
      
  }


  function deleteMeme(){
      var memeIdx = getMemeIdx()
      var savedMemes = loadFromStorage('savedMemes')
      savedMemes.splice(memeIdx,1)
      saveToStorage('savedMemes',savedMemes)
      setMemeIdx()
      toggleGen()
  }

  function saveMeme(){
      var meme = getMeme()
      var memeImg = getElCanvas().toDataURL()
      var savedMemes = []
      var fullMeme = {
          memeImg,
          memeEditingInfo:meme
      }
    if(loadFromStorage('savedMemes'))  savedMemes = loadFromStorage('savedMemes')
     if(getMemeIdx() != '') savedMemes[getMemeIdx()] = fullMeme
      else if(getMemeIdx()==='') savedMemes.push(fullMeme)

    saveToStorage('savedMemes',savedMemes)

  }
  
  function moveText(value) {
      var meme = getMeme();
      
      var increment = 10;
      switch (value) {
        case 'up':
          meme.lines[meme.selectedLineIdx].posY -= increment;
          break;
        case 'down':
          meme.lines[meme.selectedLineIdx].posY += increment;
          break;
        case 'left':
          meme.lines[meme.selectedLineIdx].posX -= increment;
          break;
        case 'right':
          meme.lines[meme.selectedLineIdx].posX += increment;
      }
      renderMeme(meme)
      
    }

    function changeFonts(value){
        var meme = getMeme()
        meme.lines[meme.selectedLineIdx].font = value
        
        renderMeme(meme)
        
     }
  

     
function changeText(text){
    var meme = getMeme()
    if(meme.lines.length === 0 ) {
        addTextLine()
    }
  meme.lines[meme.selectedLineIdx].text = text
  renderMeme(meme)
  
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


  
    function alignText(value){
        var meme = getMeme()
        meme.lines[meme.selectedLineIdx].align = value
        renderMeme(meme)
        
    }


    function setMeme(meme){
      saveToStorage('currMeme',meme)
    }

    function getMeme() {
        return loadFromStorage('currMeme')
      }
      
      
function getMemeLine() {
    var meme = getMeme()
    return meme.lines[meme.selectedLineIdx]
  }

  
function setMemeImg(img) {
    
    var pos = getCanvasPos()
    var meme 
  meme = {
    selectedImgId: img.id,
    selectedLineIdx: 0,
    lines: [
      {
        text: 'hello',
        size:  30,
        align: 'center',
        strokeColor: 'black',
        color: 'white',
        posX: pos.x / 2,
        posY: 70,
      },
    ],


  }
   setMeme(meme)
}

function setEditedMeme(meme) {
   setMeme(meme)
}