// const Search = require('../components/search')
// const TagSort = require('../components/tag/sort')
// const ImageList = require('../components/image/list')
const Nav = require('../components/nav')
const ListAlbumPages = require('../components/album/page/albums')
const { ImagePage } = require('../components/album/page/images')
const { AlbumsList } = require('../components/album/list')
const UploadPage = require('../components/image/upload')

const applyMaterializeHelpers = (state, view) => {
    M.Modal.init(view.querySelectorAll('#settings'), {})
    M.Modal.init(view.querySelectorAll('#uploadImages'), {})
    M.Modal.init(view.querySelectorAll('#create_album'), {})
    M.Modal.init(view.querySelectorAll('#create_tag'), {})
    M.Modal.init(view.querySelectorAll('.tag_album'), {})
    M.Modal.init(view.querySelectorAll('.album_page'), {})
    M.Modal.init(view.querySelectorAll('.move_album'), {})
    M.Modal.init(view.querySelectorAll('.delete_album'), {})
    M.Modal.init(view.querySelectorAll('.move_image'), {})
    M.Modal.init(view.querySelectorAll('.delete_image'), {})
    M.Modal.init(view.querySelectorAll('.image_page'), {})
    M.FloatingActionButton.init(view.querySelectorAll('.edit_button'), {})
    M.Sidenav.init(view.querySelectorAll('.sidenav'), {})
    return view
}

module.exports = (state, emit) => applyMaterializeHelpers(state,
    <body>
        <Nav emit={emit} />
        <AlbumsList albums={state.page.albums.filter(album => !album.parent)} />
        <ListAlbumPages albums={state.page.albums} tags={state.page.tags} emit={emit} />
        {state.page.albums.map(album => album.images.map(img => <ImagePage state={state} emit={emit} img={img} albumId={album._id} />))}
        <UploadPage state={state} emit={emit} />
    </body>
)
