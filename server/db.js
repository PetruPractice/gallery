const db = require('better-sqlite3')('gallery.db', {})
const createTable = {
    images: 'CREATE TABLE IF NOT EXISTS images(_id INTEGER PRIMARY KEY, title TEXT, desc TEXT, size INTEGER DEFAULT 0, filename TEXT NOT NULL UNIQUE, gallery_id INTEGER DEFAULT 0, location TEXT, type INTEGER, md5 TEXT, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    tags: 'CREATE TABLE IF NOT EXISTS tags(_id INTEGER PRIMARY KEY, name TEXT, color TEXT, desc TEXT)',
    images2tags: 'CREATE TABLE IF NOT EXISTS images2tags(imageID INTEGER NOT NULL, tagID INTEGER NOT NULL, PRIMARY KEY(imageID, tagID))',
    album: 'CREATE TABLE IF NOT EXISTS album(_id INTEGER PRIMARY KEY, title TEXT, desc TEXT, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    folder: 'CREATE TABLE IF NOT EXISTS folder(parentAlbumID INTEGER NOT NULL, albumID INTEGER NOT NULL, PRIMARY KEY(parentAlbumID, albumID))'
}

Object.values(createTable).map(sql => db.exec(sql))
const query = (sql, ...args) => JSON.stringify(db.prepare(sql).all(...args))
const run = (sql, ...args) => JSON.stringify(db.prepare(sql).run(...args))
const createAlbum = album => run('INSERT INTO album(title, desc) VALUES(@title, @desc)', album)
const addImage = image => run('INSERT INTO images(filename, md5, size) VALUES(@name, @md5, @size)', image)


const getImagesFromAlbum = albumID => query('SELECT * FROM images WHERE gallery_id=?', albumID)
const getAlbumsFromFolder = albumID => query('SELECT * FROM album INNER JOIN folder ON album._id=folder.albumID AND folder.parentAlbumID=?', albumID)
const getFolders = () => query('SELECT * FROM folder')
const getAllAlbums = () => query('SELECT * FROM album')
const createTag = tag => run('INSERT INTO tags(name, color, desc) VALUES(@name, @color, @desc)', tag)
const listTags = () => query('SELECT * FROM tags')
const addFolderAlbum = folder => {
    if (folder.parentAlbumID === '-1') {
        return run('DELETE FROM folder WHERE albumID=@albumID', folder)
    }
    const folders = JSON.parse(query('SELECT parentAlbumID FROM folder WHERE albumID=@albumID', folder))
    const updateQuery = 'UPDATE folder SET parentAlbumID=@parentAlbumID WHERE albumID=@albumID'
    const insertQuery = 'INSERT INTO folder(parentAlbumID, albumID) VALUES(@parentAlbumID, @albumID)'
    return run(folders.length ? updateQuery : insertQuery, folder)
}
const linkTag = o => run('INSERT INTO images2tags(imageID, tagID) VALUES(@imageId, @tagId)', o)
const tagsOfImage = imageId => query('SELECT tags._id as _id, tags.name as name, tags.color as color, tags.desc as desc FROM images2tags INNER JOIN tags ON images2tags.tagID=tags._id WHERE images2tags.imageID=?', imageId)
    // pentru test console.log(createTag({ name: 'sky', color: '#343269', desc: 'beauty' }))


run('INSERT OR IGNORE INTO album(_id, title, desc) VALUES(0, @title, @desc)', { title: 'camera roll', desc: 'default album' })
    //safe db close
process.on('exit', () => db.close())
process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))
module.exports = { 
    createTag, listTags, createAlbum, getImagesFromAlbum, getAlbumsFromFolder,
    getFolders, getAllAlbums, addImage, addFolderAlbum, linkTag, tagsOfImage
}
