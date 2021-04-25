const tags = require('../web/store-procedures/tags')

const db = require('better-sqlite3')('gallery.db', {})


const createTable = {
    images: 'CREATE TABLE IF NOT EXISTS images(_id INTEGER PRIMARY KEY, title TEXT, desc TEXT, gallery_id INTEGER NOT NULL, location TEXT, type INTEGER, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    tags: 'CREATE TABLE IF NOT EXISTS tags(_id INTEGER PRIMARY KEY, name TEXT, color TEXT, desc TEXT)',
    images2tags: 'CREATE TABLE IF NOT EXISTS images2tags(imageID INTEGER NOT NULL, tagID INTEGER NOT NULL, PRIMARY KEY(imageID, tagID))'
}
Object.values(createTable).map(sql => db.exec(sql))

const createTag = tag => JSON.stringify(db.prepare('INSERT INTO tags(name, color, desc) VALUES(@name, @color, @desc)').run(tag))
const listTags = () => db.prepare('SELECT * FROM tags').all()
// pentru test console.log(createTag({ name: 'sky', color: '#343269', desc: 'beauty' }))

//safe db close
process.on('exit', () => db.close())
process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))
module.exports = {createTag, listTags}