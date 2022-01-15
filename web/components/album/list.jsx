export default ({ albums }) => (
  <div class="columns is-multiline">
    {albums.map(album => (
      <div data-target={'album_' + album._id} class="column modal-trigger">
        <h4 class='has-background-primary py-6 has-text-centered is-size-2 has-text-light' style='border-radius: 1em'>{album.title}</h4>
        {/* <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a> */}
      </div>
    ))}
  </div>
)
