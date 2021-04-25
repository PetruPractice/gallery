const {React, View, BlockInput, Shadow, Footer} = require('../template.jsx')
const Search = require('../components/search')
const TagSort = require('../components/tag/sort')
const ImageList = require('../components/imagelist')
module.exports = (state, emit) => <View>
    <a href="/tags">Tags</a>
    {ImageList(state, emit)}
    {TagSort(state, emit)}
    {Search(state, emit)}
</View>