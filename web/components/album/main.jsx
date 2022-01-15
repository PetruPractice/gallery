import AlbumsList from './list.jsx'
import { connect } from 'react-redux'

const AlbumsMainList = ({ page }) => <AlbumsList albums={page.albums.filter(album => !album.parent)} />

export default connect(o => o)(AlbumsMainList)
