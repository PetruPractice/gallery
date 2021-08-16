const {React, View } = require('../template.jsx')
// const Search = require('../components/search')
// const TagSort = require('../components/tag/sort')
// const ImageList = require('../components/image/list')
const ImagePreview = require('../components/image/preview')
const Nav = require('../components/nav')
const ListAlbumPages = require('../components/album/page/albums')
const { AlbumsList } = require('../components/album/list')
module.exports = (state, emit) => {
    if (state.page.imagePreview || state.page.imagePreview === 0) return ImagePreview(state, emit)
    return <View>
        {Nav(state, emit)}
        <AlbumsList albums={state.page.mainAlbums} />
        <ListAlbumPages albums={state.page.albums} tags={state.page.tags} emit={emit} />
    </View>
}