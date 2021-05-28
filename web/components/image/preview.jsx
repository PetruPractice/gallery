const {React, View} = require('../../template')
const TagsList = require('../tag/list')
module.exports = (state, emit) => {
	const img = state.page.albums.map(album => album.images).flat().find(img => img._id === state.page.imagePreview)
	const tagOptions =	<select>
		{state.page.tags.map(tag => <option value={tag._id} style={'color:' + tag.color}>{tag.name}</option>)}
	</select>
	return <View>
		<img src={'/api/images/' + img.filename} />
		<button class="close-image" onclick={e => emit('imageClose', e)}>x</button><br />
		{TagsList(state, emit, img._id)}
		<br />
		<h3>Add Image Tag</h3>
		{tagOptions}
		<button class="add-tag" onclick={e => emit('addTag', img._id, tagOptions.value)}>+</button>
	</View>
}