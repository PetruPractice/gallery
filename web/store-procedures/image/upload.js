const {getJSON, $} = require('../utils')

module.exports = (state, emitter) => {

    emitter.on('navigate', () => {
        emitter.emit('uploadPage')
    })     // TODO : Remove the dependence on navigate!!!!!!!!!!!!!!!!!!!!!!!!!!

    emitter.on('uploadPage', () => {
        const uploadDiv = $('uploadImages')
        if (!uploadDiv) return setTimeout(() => emitter.emit('uploadPage'), 0)
        const form = uploadDiv.querySelector('form')
        const strong = form.querySelector('strong')
        const uploader = form.querySelector('input[type="file"]')
        const span = form.querySelector('span')
        const button = form.querySelector('button')
        const enter = e => {
            uploadDiv.classList.add('uploadImagesOver')
            strong.classList.add('uploadStrongHover')
        }
        const exit = e => {
            uploadDiv.classList.remove('uploadImagesOver')
            strong.classList.remove('uploadStrongHover')

        }

        uploader.addEventListener('dragenter', enter)
        uploader.addEventListener('dragover', enter)
        uploader.addEventListener('dragleave', exit)
        uploader.addEventListener('dragend', exit)
        uploader.addEventListener('drop', e => {
            exit(e)
            const files = e.dataTransfer.files
            strong.innerText = files.length
            span.innerHTML = ' files selected for upload<br>'
            for (let i = 0; i < files.length; i++) {
                const img = document.createElement('img')
                img.width = img.height = 80
                const reader = new FileReader()
                reader.readAsDataURL(files[i])
                reader.onload = e => img.src = e.target.result
                span.appendChild(img)
            }
        })
        form.addEventListener('submit', e => {
            e.preventDefault()
            e.stopPropagation()
            button.setAttribute('disabled', 'disabled')
            button.innerText = 'Uploading ...'
            getJSON('/api/upload', { 
                body: new FormData(form),
                method: 'post'
            }).then(res => {
                button.innerText = 'Upload'
                button.removeAttribute('disabled')
                strong.innerText = 'Choose a file'
                span.innerHTML = ' or drag it here.'
                state.page.upload.files = []
                state.page.upload.isUploading = false
            })
            return false
        })

    })
}
