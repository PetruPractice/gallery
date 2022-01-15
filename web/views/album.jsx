// const Search = require('../components/search')
// const TagSort = require('../components/tag/sort')
// const ImageList = require('../components/image/list')
import App from '../components/app/main.jsx'
import Nav from '../components/app/nav/index.jsx'
import ListAlbumPages from '../components/album/page/albums.jsx'
// const { ImagePage } = require('../components/album/page/images')
// const { AlbumsList } = require('../components/album/list')
// const UploadPage = require('../components/image/upload')
import AlbumsList from '../components/album/main.jsx'

export default () => (
  <App>
    <AlbumsList />
    <ListAlbumPages />
    {/* {state.page.albums.map(album => album.images.map(img => <ImagePage state={state} emit={emit} img={img} albumId={album._id} />))} */}
    {/* <UploadPage state={state} emit={emit} /> */}
  </App>
)
