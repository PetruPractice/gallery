const {React, View, BlockInput, Shadow, Footer} = require('../template.jsx')
const UploadImage = require('../components/image/upload')
module.exports = (state, emit) => <View id="uploadPage">
    <a href="/">Home</a>
    {UploadImage(state, emit)}
</View>