const {React, View, BlockInput, Shadow, Footer} = require('../template.jsx')
const Search = require('../components/search')
const TagSort = require('../components/tag/sort')
const ImageList = require('../components/image/list')
const CreateAlbum = require('../components/album/create')
const MoveAlbum = require('../components/album/move')
const ImagePreview = require('../components/image/preview')

const TagsSelector = ({ state, emit, albumId }) => <div>
    <div class="overlay" />
    <table>
        <tr><th>Tag Name</th><th>Apply Tag to Whole Album</th></tr>
        {/** TODO: get all tags for the given album that can be applied to the album */}
        {state.page.tags.map(tag => <tr>
            <td>{tag.name}</td>
            <td><button onclick={e => emit('applyTagToWholeAlbum', e, tag._id, albumId)}>Choose</button> </td>
        </tr>)}
    </table>
</div>


const Album = ({state, emit, album, depth}) => {
    const backButton = depth === 0 && album.parent ? <button class="back" onclick={e => emit('moveOut', e, album)}>Back</button> : ''
    return <div class={'album album-depth-' + depth} albumId={album._id}>
        {backButton}
        <div class="imagesPreview">
            {album.images && album.images.map(img => <img src={'/api/images/' + img.filename} onclick={e => emit('imageZoom', img._id)} />)}
        </div>
        <span>{album.title}</span>
        <button class="tagToAlbum" onclick={e => emit('openPopup', <TagsSelector state={state} emit={emit} albumId={album._id} />)}>➕</button>
        <button class="moveAlbum" onclick={e => emit('openPopup', <MoveAlbum state={state} emit={emit} albumId={album._id} />)}>➡️</button>
    </div>
}


const displayAlbums = (state, emit, albums, depth, parent) => {
    albums.forEach(album => {
        const albumTag = <Album state={state} emit={emit} depth={depth} album={album} />
        depth === 1 && albumTag.addEventListener('click', e => emit('moveIn', e))
        parent.appendChild(albumTag)
        displayAlbums(state, emit, album.children, depth + 1, albumTag)
    })
}
module.exports = (state, emit) => {
    if (state.page.imagePreview || state.page.imagePreview === 0) return ImagePreview(state, emit)
    const albums = <div class="albums" />
    displayAlbums(state, emit, state.page.mainAlbums, 0, albums)
    return <View>
        {Search(state, emit)}
        <a href="/tags">Tags</a>
        {TagSort(state, emit)}
        <button onclick={e => emit('openPopup', <CreateAlbum state={state} emit={emit} />)}>Add Album</button>
        {/* <button onclick={() => emit('newFolder')}>Add Folder</button> */}

        {ImageList(state, emit)}
        <a href="/upload">Upload Image</a><br/><br/><br/>
        {albums}
        <div id='popups'></div>
    </View>
}