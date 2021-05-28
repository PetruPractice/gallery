
const $ = id => document.getElementById(id)

module.exports = (state, emitter) => {
    state.page = {
        upload: {
            files: [],
            isUploading: false
        },
        tags: [],
        folders: [],
        albums: [],
        mainAlbums: [],
        images2tags: {}
    }

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
            fetch('/api/upload', { 
                body: new FormData(form),
                method: 'post'
            }).then(res => res.json()).then(res => {
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



    emitter.on('newAlbum', e => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.target
        const albumName = form.querySelector('input')
        const albumDesc = form.querySelector('textarea')
        const button = form.querySelector('button')

        button.setAttribute('disabled', 'disabled')
        button.innerText = 'Creating new album ...'
        fetch('/api/album/new/' + albumName.value + '/' + albumDesc.value).then(res => res.json()).then(res => {
            button.innerText = 'Created album'
            button.style.border = '2px solid limegreen'
            albumName.value = ''
            albumDesc.value = ''
            setTimeout(() => {
                button.removeAttribute('disabled')
                button.innerText = 'Create Album'
                button.style.border = ''
            }, 3000)

        })
    })

    emitter.on('openPopup', popup => {
        $('popups').appendChild(popup)
        const overlay = popup.querySelector('.overlay')
        overlay.addEventListener('click', e => {
            popup.remove()
        })
    })

    emitter.on('chooseAlbum', (albumId, parentAlbumId) => {
        // TODO: Do the actual move in DB, refresh album list in main page
        fetch('/api/folder/new/' + parentAlbumId + '/' + albumId).then(res => res.json()).then(res => {
            $('popups').firstChild.remove()
            emitter.emit('getAll')
            // what do do when new album added to the folder ...
        })
    })


    const traverseTree = (albums, parent, child) => {
        for (let i = 0; i < albums.length; i++) {
            if (albums[i]._id === parent._id) {
                albums[i] = child
            }
        }
    }

    emitter.on('moveIn', e => {
       const albumId = parseInt(e.target.getAttribute('albumId'))
       const album = state.page.albums.find(album => album._id === albumId)
        traverseTree(state.page.mainAlbums, album.parent, album)
        
        emitter.emit('render')
    })

    emitter.on('moveOut', (e, album) => {
        traverseTree(state.page.mainAlbums, album, album.parent)
        emitter.emit('render')
    })

    const getRootParents = folders => {
        const parents = new Set(folders.map(folder => folder.parentAlbumID))
        const children = new Set(folders.map(folder => folder.albumID))
        return new Set([...parents].filter(id => !children.has(id)))
    }
    
    const addNonFolderAlbums = (folders, albums, parents) => {
        const ids = new Set()
        folders.forEach(folder => ids.add(folder.parentAlbumID) && ids.add(folder.albumID))
        albums.forEach(album => !ids.has(album._id) && parents.add(album._id))
    }

    const getAlbumChildren = albumId => state.page.albums.filter(album =>
        state.page.folders.filter(folder => folder.parentAlbumID === albumId && folder.albumID === album._id).length
    )
    
    const createAlbumTree = albums => {
        albums.forEach(album => {
            album.children = getAlbumChildren(album._id)
            album.children.forEach(child => child.parent = album)
            album.images.forEach(child => child.parent = album)
            createAlbumTree(album.children)
        })
    }

    emitter.on('getAll', () => {
        fetch('/api/album/folders').then(res => res.json()).then(folders => {
            fetch('/api/album/list').then(res => res.json()).then(albums => {
                albums = albums.map(album => {
                    album.images = []
                    return album
                })
                Promise.all(albums.map(album => 
                    fetch('/api/album/images/' + album._id).then(res => res.json()).then(albumImages => {
                        album.images = albumImages
                        // console.log('albumId', album._id, 'images', albumImages)
                    })
                )).then(() => {
                    // console.log('folders', folders)
                    // console.log('albums', albums)
                    const parents = getRootParents(folders)
                    addNonFolderAlbums(folders, albums, parents)
                    state.page.mainAlbums = albums.filter(album => parents.has(album._id))
                    state.page.albums = albums
                    state.page.folders = folders

                    createAlbumTree(state.page.mainAlbums)

                    emitter.emit('render')
                })
            })
        })
    })
    emitter.emit('getAll')
    emitter.on('navigate', () => {
        emitter.emit('uploadPage')
    })

    emitter.on('tags:forImage', imageId => {
        fetch('/api/tags/' + imageId).then(res => res.json()).then(tags => {
            state.page.images2tags[imageId] = tags
            emitter.emit('render')
        })
    })

    emitter.on('imageZoom', imageId => {
        state.page.imagePreview = imageId
        emitter.emit('tags:forImage', imageId)
    })

    emitter.on('imageClose', e => {
        delete state.page.imagePreview
        emitter.emit('render')
        
    })
}