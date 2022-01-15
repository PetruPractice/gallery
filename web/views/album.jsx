import App from '../components/app/main.jsx'
import ListAlbumPages from '../components/album/page/albums.jsx'
import ListImagePages from '../components/image/main.jsx'
import UploadPage from '../components/image/upload.jsx'
import AlbumsList from '../components/album/main.jsx'

export default () => (
  <App>
    <AlbumsList />
    <ListAlbumPages />
    <ListImagePages />
    <UploadPage />
  </App>
)
