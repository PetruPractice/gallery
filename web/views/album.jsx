// const Search = require('../components/search')
// const TagSort = require('../components/tag/sort')
// const ImageList = require('../components/image/list')
import App from '../components/app/main.jsx'
// const Nav = require('../components/nav')
// const ListAlbumPages = require('../components/album/page/albums')
// const { ImagePage } = require('../components/album/page/images')
// const { AlbumsList } = require('../components/album/list')
// const UploadPage = require('../components/image/upload')
import AlbumList from '../components/album/list.jsx'

export default (state, emit) => (
  <App>
    <AlbumList />
    {/* <Nav emit={emit} /> */}
    {/* <AlbumsList albums={state.page.albums.filter(album => !album.parent)} /> */}
    {/* <ListAlbumPages albums={state.page.albums} tags={state.page.tags} emit={emit} /> */}
    {/* {state.page.albums.map(album => album.images.map(img => <ImagePage state={state} emit={emit} img={img} albumId={album._id} />))} */}
    {/* <UploadPage state={state} emit={emit} /> */}
  </App>
)
