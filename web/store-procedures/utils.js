const $ = id => document.getElementById(id)
const getJSON = (...params) => fetch(...params).then(res => res.json())


module.exports = {getJSON, $}

