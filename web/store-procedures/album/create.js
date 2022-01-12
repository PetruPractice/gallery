const { getJSON } = require('../utils')

module.exports = (state, emitter) => {
    emitter.on('newAlbum', e => {
        e.preventDefault()
        const form = e.target
        const albumName = form.querySelector('input')
        const albumDesc = form.querySelector('textarea')
        const button = form.querySelector('button')

        button.setAttribute('disabled', 'disabled')
        button.innerText = 'Creating new album ...'
        getJSON('/api/album/new/' + albumName.value + '/' + albumDesc.value).then(res => {
            const newAlbum = {
                _id: res.lastInsertRowid,
                title: albumName.value,
                desc: albumDesc,
                timestamp: new Date().toString(),
                images: [],
                children: []
            }
            state.page.albums.push(newAlbum)
            button.innerText = 'Created album'
            button.style.border = '2px solid limegreen'
            albumName.value = ''
            albumDesc.value = ''
            setTimeout(() => {
                button.removeAttribute('disabled')
                button.innerText = 'Create Album'
                button.style.border = ''
                emitter.emit('render')
            }, 500)
        })
        return false
    })
}
