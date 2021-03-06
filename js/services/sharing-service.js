'use strict'

function downloadImg(elBtn) {
  renderMeme(getMeme(), true)
  let elLink = elBtn.firstChild
  console.log('elBtn', elBtn, 'elLink', elLink)
  var imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function shareImg() {
  renderMeme(getMeme(), true)
  var imgDataUrl = gElCanvas.toDataURL('image/jpeg')
  function onSuccess(uploadedImgUrl) {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
    )
  }
  doUploadImg(imgDataUrl, onSuccess)
}
function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url)
      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}
