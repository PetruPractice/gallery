const React = require('jsx-dom')
module.exports = props => <div>
	<div class="overlay" />
	<table>
		<tr><th>album name</th><th>Pick</th></tr>
		{!props.state.page.mainAlbums.some(album => album._id === props.albumId) && <tr><td>ROOT</td><td><button onclick={e => props.emit('chooseAlbum', props.albumId, -1)}>Choose</button></td></tr>}
		{props.state.page.albums.filter(album => album._id !== props.albumId).map(album =>
			<tr><td>{album.title}</td><td><button onclick={e => props.emit('chooseAlbum', props.albumId, album._id)}>Choose</button></td></tr>
		)}
	</table>
</div>