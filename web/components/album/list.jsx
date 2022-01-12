const AlbumsList = ({ albums }) => <div class='container'>
  <div class='row card albums_list'>
    <ListAlbums albums={albums} />
  </div>
                                   </div>

const ListAlbums = ({ albums }) => albums.map(album => <div data-target={'album_' + album._id} class='col s6 m4 l3 card modal-trigger waves-effect waves-teal blue-text text-darken-2 z-depth-5'>
  <h4 style='padding:20px'>{album.title}</h4>
  {/* <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a> */}
                                                       </div>)

module.exports = { AlbumsList, ListAlbums }
