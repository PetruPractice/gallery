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

    populate(store)
}

export default (state = initialState, { type, store, data }) => {
    type === 'getData' && setup(store)
    type === 'updateData' && (state = Object.merge(state, data))
    return { ...state }
}
