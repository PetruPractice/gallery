# Basic Web Template

### Inital Setup
```bash
npm i
```

### Generate SSL certs on mac
```bash
brew install certbot
sudo certbot certonly --standalone
```

### To run development simply type


```bash
# Testing
npm test
# production or just front-end changes
npm start
```

# TODO

- [x] Hierarchy of folders and albums with hiding privious album's and folder's display
- [x] back button set the priviousy display
- [x] click on an album of pictures
- [x] click on an individual picture make it fullscreen
- [x] Exit button for zoomed images 
- [x] connect tags for images
- [x] newAlbum is not in the albums structure BUG
- [x] delete root option if its root element
- [x] delete button for albums
- [ ] connect tags for entire albums
- [ ] microsoft image analisys api
- [ ] search for images in albums and folders 
- [ ] ability to delete images ,albums and folders
- [ ] check for network(your online , offline)
- [ ] nice design of the whole app
- [ ] sort tags , sort by date, by location, by metadata
- [ ] shared albums
- [ ] share button to get a protected link 
- [ ] thumbnailing
- [ ] set per to per connection (udp) for comunication between galleries on different devices
- [ ] adapt to Cordova for mobile 

![gallery system diagram](/gallery.png)