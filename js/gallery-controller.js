'use strict'

function init(){
    initMemes()
    var imgs = getImgs()
    renderGallery()
    initCanvas()
    initMemesGallery()

}



function renderGallery(){
    let imgs = getImgs()
    let strHTML = ''
    console.log(imgs)
    let elGallery = document.querySelector('.gallery')
    imgs.forEach(img =>{
        strHTML += `<img src ="${img.url}" id="${img.id}" onclick="openGen(this)">`
    })
    elGallery.innerHTML = strHTML

}






function toggleGen(isGen = ''){
    let gallery = document.querySelector('.main-gallery')
    let memeGen = document.querySelector('.meme-gen')
    let memeGallery  = document.querySelector('.main-memes')
    let deleteButton = document.querySelector('.delete-meme')
    if(isGen){
    gallery.classList.add('hidden')
    memeGen.classList.remove('hidden')
    memeGallery.classList.add('hidden')
    deleteButton.classList.add('hidden')
    }
    else if(isGen === false){
        gallery.classList.remove('hidden')
        memeGen.classList.add('hidden')
        memeGallery.classList.add('hidden')
        deleteButton.classList.add('hidden')
    }
    else{
        gallery.classList.add('hidden')
        memeGen.classList.add('hidden')
        memeGallery.classList.remove('hidden')
        deleteButton.classList.add('hidden')
        renderMemesGallery()
    }

    
}
