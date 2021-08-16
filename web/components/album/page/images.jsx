const AlbumImage = ({img}) => <div class="col s4">
    <img class="responsive-img card materialbox" src={'/api/images/' + img.filename} />
</div>

module.exports = { AlbumImage }
