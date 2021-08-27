module.exports = (state, emitter) => {
    state.page = {
        upload: {
            files: [],
            isUploading: false
        },
        tags: [],
        albums: [],
        images2tags: {}
    }
}