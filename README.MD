# Tradfri AR Project

This is meant as a proof of concept on controlling Ikea TRÅDFRI lights using Augmented Reality.
It might not be very practical since controlling your lights with a physical switch (or the Ikea app) is way faster. But nonetheless I found it a nice project for myself started with AR.

### Libraries used

  - AR.js - [GitHub](https://github.com/jeromeetienne/AR.js) -> this project includes a custom build which contains a fix for custom markers
  - node-tradfri-argon - [NPM](https://www.npmjs.com/package/node-tradfri-argon)

### Application architecture 

It uses NodeJS to serve a static webpage. Using ExpressJS to expose a simple API to control the TRÅDFRI lights. 
The node-tradfri-argon package relies on libcoap.

### Installation

 - Clone this repo
 - Install libcoap (instructions [here](https://www.npmjs.com/package/node-tradfri-argon#compiling-libcoap))
 - Modify the package.json 'start' script, set your params: COAP_CLIENT_PATH, HUB_IP_ADDRESS and SECURITY_ID (the ID on the bottom of your Ikea Hub)

```sh
$ npm install
$ npm start
```

### What works so far
It has 2 entities, each has its own marker (Hiro and custom marker).
The custom marker can switch my dining room light on (in 3 'colors').

### Todo
- Make the "on" and "off" object clickable (to switch the light on/off)
- Make the object clickable using touchscreen instead of the small black circle pointer

