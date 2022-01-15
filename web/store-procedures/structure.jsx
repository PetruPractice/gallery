import './utils.js'

const GET = new Proxy({}, { get: (target, name, receiver) => name === 'setup' ? (baseURL, opts) => Object.assign(target, { baseURL, opts }) : url => fetch(target.baseURL + url, target.opts).then(res => res[name]()).catch(console.error) })

const initialState = {
    upload: {
        files: [],
        isUploading: false
    },
    tags: [],
    albums: [],
    images2tags: {}
}

const addChildParent = (albums, parent, albumId) => {
    const childAlbum = albums.find(album => albumId === album._id)
    childAlbum.parent = parent
    return childAlbum
}

const populate = async store => {
    const albums = await GET.json('/api/album/all')
    const tags = await GET.json('/api/tag/list')
    albums.forEach(album => album.children = album.children.map(albumId => addChildParent(albums, album, albumId)))
    store.dispatch({ type: 'updateData', data: { albums, tags } })
}


const droppedImages = (e, uploadPopup) => {
    const form = uploadPopup.querySelector('form')
    const strong = form.querySelector('strong')
    const uploader = form.querySelector('input[type="file"]')
    const span = form.querySelector('span')
    uploadPopup.classList.remove('uploadImagesOver')
    strong.classList.remove('uploadStrongHover')
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
    const select = form.querySelector('select')
    select.options[0].selected = true
    uploader.style.width = '0px'
}

const uploadPage = e => {
    e.preventDefault()
    const form = e.target
    const strong = form.querySelector('strong')
    const uploader = form.querySelector('input[type="file"]')
    const span = form.querySelector('span')
    const button = form.querySelector('button')
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
        uploader.style.width = '100%'
        // state.page.upload.files = []
        // state.page.upload.isUploading = false
    })

    return false
}

const setup = async (store, state) => {
    const baseURL = 'http://localhost:8080'
    GET.setup(baseURL, { header: {} })

    await populate(store)

    for (const popup of document.querySelectorAll('.modal-trigger')) {
        const id = popup.getAttribute('data-target')
        const element = document.getElementById(id)
        popup.onclick = () => element?.classList.add('is-active')
    }
    document.body.addEventListener('dragenter', () => {
        const uploadPopup = document.getElementById('uploadImages')
        uploadPopup.classList.add('is-active')
        uploadPopup.addEventListener('drop', e => droppedImages(e, uploadPopup))
    })

}

const createTag = async e => {
    e.preventDefault()

    const form = new FormData(e.target)

    const name = form.get('tagName')
    const color = form.get('tagColor').replace('#', '')
    const desc = form.get('tagDesc')
    const res = await GET.json('/api/tag/create/' + [name, color, desc].join('/'))
    console.log('tag create res', res)
}


const findAndDeleteAlbum = (albums, albumId) => {
    for (let i = 0; i < albums.length; i++) {
        const album = albums[i]
        if (album._id == albumId) {
            albums.splice(i, 1)
            return album
        }
        const found = findAndDeleteAlbum(album.children, albumId)
        if (found) return found
    }
}

const addChildToParent = (albums, parentAlbumId, childAlbum) => {
    albums.forEach(album => {
        if (parentAlbumId == album._id) {
            album.children.push(childAlbum)
            return
        }
        addChildToParent(album.children, parentAlbumId, childAlbum)
    })
}

const getAlbumById = albumId => state.page.albums.find(album => album._id === albumId)

const chooseAlbum = async (albumId, parentAlbumId, albums, dispatch, e) => {
    const res = await GET.json('/api/folder/new/' + parentAlbumId + '/' + albumId)
    // abstract this into a function to explain what it does
    for (const album of albums) {
        album.children = album.children.filter(child => child._id != albumId)
    }
    const isRoot = parentAlbumId === -1

    const albumPage = isRoot ? document.querySelector('.albums_list') : document.getElementById('album_' + parentAlbumId)
    const albumButton = document.querySelector('[data-target="album_' + albumId + '"]')
    // add new album Button
    albumPage.insertBefore(albumButton, albumPage.firstElementChild.nextSibling)

    // toggle root
    const chooseRoot = document.querySelector('#move_album_' + albumId).querySelectorAll('.row')[1]
    if (!isRoot) {
        getAlbumById(parentAlbumId).children.push(getAlbumById(albumId))
        chooseRoot.style.removeProperty('display')
    } else {
        chooseRoot.style.display = 'none'
    }
}

const newAlbum = async (e, dispatch, albums) => {
    e.preventDefault()
    const form = e.target
    const albumName = form.querySelector('input')
    const albumDesc = form.querySelector('textarea')
    const button = form.querySelector('button')

    button.setAttribute('disabled', 'disabled')
    button.innerText = 'Creating new album ...'
    const res = await GET.json('/api/album/new/' + albumName.value + '/' + albumDesc.value)
    const newAlbum = {
        _id: res.lastInsertRowid,
        title: albumName.value,
        desc: albumDesc,
        timestamp: new Date().toString(),
        images: [],
        children: []
    }
    albums.push(newAlbum)
    dispatch({type: 'updateData', data: { albums }})
    button.innerText = 'Created album'
    button.style.border = '2px solid limegreen'
    albumName.value = ''
    albumDesc.value = ''
    setTimeout(() => {
        button.removeAttribute('disabled')
        button.innerText = 'Create Album'
        button.style.border = ''
    }, 500)
    return false
}

const applyTagToWholeAlbum = async (albumId, tagId, albums, tags, dispatch, e) => {
    //TODO
}

const deleteAlbum = async (albumId, albums, dispatch, e) => {
    await GET.json('/api/album/remove/' + albumId)
    albums = albums.filter(album => album._id !== albumId)
    document.querySelector('[data-target="album_' + albumId + '"]').remove()
    document.getElementById('album_' + albumId).remove()
    dispatch({type: 'updateData', data: {albums}})
}

const chooseAlbumForImage = async (imageId, albumId) => {
    await GET.json('/api/image/move/' + imageId + '/' + albumId)
    document.getElementById('album_' + albumId).appendChild(document.querySelector('[data-target="image_' + imageId + '"]'))
}

const deleteImage = async imageId => {
    await GET.json('/api/image/delete/' + imageId)
    document.querySelector('[data-target="image_' + imageId + '"]').remove()
    document.getElementById('image_' + imageId).remove()
}


const tagAdd = async (tagId, imageId) => await GET.json(baseURL + '/api/tag/link/' + tagId + '/' + imageId)

const tagDelete = async (tagId, imageId, albums, dispatch) => {
    await GET.json(baseURL + '/api/tag/delete/' + tagId + '/' + imageId)
    const imagesMap = album => album.images.map(img => ({...img, tags: Array.isArray(img.tags) && img._id === imageId ? img.tags : img.tags.filter(tag => tag._id !== tagId)}))
    dispatch({type: 'updateData', data: {albums: albums.map(album => ({...album, images: imagesMap(album)})) } })
}


export default (state = initialState, { type, store, data, e, dispatch, albumId, parentAlbumId, tagId }) => {
    type === 'getData' && setup(store, state)
    type === 'updateData' && (state = Object.merge(state, data))

    // Tags
    type === 'createTag' && createTag(e)

    // Albums
    type === 'newAlbum' && newAlbum(e, dispatch, state.albums)
    type === 'chooseAlbum' && chooseAlbum(albumId, parentAlbumId, state.albums, dispatch, e)
    type === 'applyTagToWholeAlbum' && applyTagToWholeAlbum(albumId, tagId, state.albums, state.tags, dispatch, e)
    type === 'deleteAlbum' && deleteAlbum(albumId, state.albums, dispatch, e)
    type === 'uploadPage' && uploadPage(e)
    return { ...state }
}
