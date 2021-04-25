const React = require('jsx-dom')
module.exports = (state, emit) => {

    return <div> 

        {state.images.map(image => <img src={image} alt="" width="300px" height="300px"/>)} 
        {/* nu uita sa faci styling in css */}
    </div>
}