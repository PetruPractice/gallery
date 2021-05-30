const React = require('jsx-dom')
module.exports = ({albumId, imageId, emit, state}) => <div>
	<div class="overlay" />
	<table>
		<tr><th>album name</th><th>Pick</th></tr>
		{state.page.albums.filter(album => album._id !== albumId).map(album =>
			<tr><td>{album.title}</td><td><button onclick={e => emit('chooseAlbumForImage', imageId, album._id)}>Choose</button></td></tr>
		)}
	</table>
</div>