'use strict'

const jokes = require('./jokes.json')

const makeMeLaugh = () => jokes[Math.floor(Math.random() * jokes.length - 1)]

module.exports = { makeMeLaugh }
