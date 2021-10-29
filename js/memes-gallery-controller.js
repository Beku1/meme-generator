'use strict'

function initMemesGallery(){
   renderMemesGallery()
}


function renderMemesGallery(){
    var memes = loadFromStorage('savedMemes')
    
    let strHTML = ''
    let elMemesGallery = document.querySelector('.meme-gallery')
    memes.forEach((meme,idx)=>{
        strHTML += `<img src ="${meme.memeImg}" id="${meme.memeEditingInfo.selectedImgId}" onclick="openGenReady(${idx})">`
    })
    elMemesGallery.innerHTML = strHTML
}




// function renderGallery(){
//     let imgs = getImgs()
//     let strHTML = ''
//     let elGallery = document.querySelector('.gallery')
//     imgs.forEach(img =>{
//         console.log(img)
//         strHTML += `<img src ="${img.url}" id="img${img.id}" onclick="openGen(this)">`
//     })
//     elGallery.innerHTML = strHTML

// }