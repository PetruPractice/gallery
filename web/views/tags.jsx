const {React, View, BlockInput, Shadow, Footer} = require('../template.jsx')
const createTag = require('../components/tag/create')
module.exports = (state, emit) => <View>
    <a href="/">Home</a>
    {state.tags.map(tag => <p>{JSON.stringify(tag)}</p>)}
    <br />
    {createTag(state, emit)}
</View>