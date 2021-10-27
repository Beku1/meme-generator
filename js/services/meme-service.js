'use strict'

var gImgs = []
var gImgId= 19
var gMeme = []


function initMemes(){
   gImgs = createImgs()
   
}


function createImg(id,keywords){
    let meme = {
        id,
        url:`/img/memes/${id}.jpg`,
        keywords
    }
    return meme
}

function createImgs(){
    var keywords = [['politics','funny'],['cute','love'],['cute','sleepy'],['cute','sleepy'],['cute','success','funny','OG'],['aliens','funny','OG'],['surprised','funny'],['OG','funny'],
         ['cute','funny'],['OG','funny','politics'],['sports'],['israel','funny'],['OG','epic'],['OG','matrix','epic','funny'],['OG','funny'],['funny'],['politics','funny'],['funny']]
         let imgs = []
    for(var i = 1 ; i <= 18 ;i++){
      imgs.push(createImg(i,keywords[i-1]))
    }
    return imgs
}


function getImgs(){
    return gImgs;
}


function getMeme(){
    return gMeme
}

function setMeme(img){
   gMeme = {
       selectedImgId:img.id,
       selectedLineIdx:0,
        lines:{
            text:'hello',
            size:40,
            align: 'center',
            color:'white',
            posX:getCanvasPos().x,
            posY:getCanvasPos().y
        }
 
      
   }
   console.log(gMeme)
}
