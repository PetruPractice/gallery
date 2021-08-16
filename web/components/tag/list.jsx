module.exports = (state, emit, imageId) => {
	return <div>
		{Array.isArray(state.page.images2tags[imageId]) && state.page.images2tags[imageId].map(tag => <p>{tag.name}</p>)}
	</div>
}