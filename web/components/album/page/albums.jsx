
const { EditButton } = require('./edit')
const { ListAlbums } = require('../list')
const { AlbumImage } = require('./images')

const AlbumPage = ({album, albums, emit, tags}) => {
    const page = <div class="row card modal s12" id={'album_' + album._id} style="min-height: 300px">
        <h3>{album.title}</h3>
        <ListAlbums albums={album.children} />
        {album.images.map(img => <AlbumImage img={img} />)}
        <EditButton albums={albums} emit={emit} albumId={album._id} tags={tags} />
    </div>
    M.Modal.init(page, {})
    return page
}

const ListAlbumPages = ({albums, tags, emit}) => albums.map(album => <AlbumPage album={album} albums={albums} emit={emit} tags={tags} />)

module.exports = ListAlbumPages
