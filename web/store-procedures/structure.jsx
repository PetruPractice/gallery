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

const setup = store => {
    const baseURL = 'http://localhost:8080'
    GET.setup(baseURL, { header: {} })


    setTimeout(() => {
        for (const popup of document.querySelectorAll('.modal-trigger')) {
            const id = popup.getAttribute('data-target')
            const element = document.getElementById(id)
            popup.onclick = () => element?.classList.add('is-active')
        }
    }, 1000)

    populate(store)
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

export default (state = initialState, { type, store, data, e, dispatch }) => {
    type === 'getData' && setup(store)
    type === 'updateData' && (state = Object.merge(state, data))

    // Tags
    type === 'createTag' && createTag(e)

    // Albums
    type === 'newAlbum' && newAlbum(e, dispatch, state.albums)
    
    return { ...state }
}
