'use strict'

function init(){
    initMemes()
    var imgs = getImgs()
    renderGallery()
    initCanvas()

}



function renderGallery(){
    let imgs = getImgs()
    let strHTML = ''
    let elGallery = document.querySelector('.gallery')
    imgs.forEach(img =>{
        console.log(img)
        strHTML += `<img src ="${img.url}" id="img${img.id}" onclick="openGen(this)">`
    })
    elGallery.innerHTML = strHTML

}




function toggleGen(isGen){
    let gallery = document.querySelector('.main-gallery')
    let memeGen = document.querySelector('.meme-gen')
    if(isGen){
    gallery.classList.toggle('hidden')
    memeGen.classList.toggle('hidden')
    }
    else {
        gallery.classList.remove('hidden')
        memeGen.classList.add('hidden')
    }
    
}
