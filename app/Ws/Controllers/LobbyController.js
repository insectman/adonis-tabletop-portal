'use strict'

class LobbyController {

  constructor (socket) {
    this.socket = socket
  }

  onMessage (message) {
    // listening for message event
  }

  * joinRoom (room) {
  	console.log(room);
    const user = this.socket.currentUser
    console.log(user);
    // throw error to deny a socket from joining room
  }

}