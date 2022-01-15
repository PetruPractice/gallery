import AlbumsList from './list.jsx'
import { connect } from 'react-redux'
export default connect(o => o)(({page}) => <AlbumsList albums={page.albums.filter(album => !album.parent)} />)
