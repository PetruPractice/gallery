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

# Bugs

# Features
- [ ] image page
- [ ] image tags
    - [ ] tag delete
- [ ] image actions
    - [ ] move
    - [ ] delete

- [ ] connect tags for entire albums
    - [ ] make its own table for it
- [ ] search for images in albums and folders 
- [x] nice design of the whole app
- [ ] sort tags, sort by date, by location, by metadata

------ 
- [ ] shared albums
- [ ] share button to get a protected link 
- [ ] thumbnailing
- [ ] check for network(your online , offline)
- [ ] adapt basic design and functionality for mobile 
- [ ] set peer to peer connection, (udp) for comunication between galleries on different devices
- [ ] make web and mobile app distributed


![gallery system diagram](/gallery.png)