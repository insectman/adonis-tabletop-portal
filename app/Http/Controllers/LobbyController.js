'use strict'

const Table = use('App/Model/Table')
const Event = use('Event')

class LobbyController {

    * list(request, response) {
    
      var tables = yield Table.query().orderBy('id', 'desc').opened();

      yield response.sendView('gameLobby', { 
        user: request.user,
        tables : tables 
      });
      return;

    }

    * create(request, response) {

      const userData = request.all()

      if(userData['name'] && userData['game_id']) {

        const table = yield Table.create({name : userData['name'], created_by : request.user.id, game_id : userData['game_id']})

        yield this._jointable(request.user, table)

        response.redirect('/table/'+table.attributes.id)
        return;

      }

      const Game = use('App/Model/Game')
      const games = yield Game.pair('id', 'name')

      yield response.sendView('createTable', {user: request.user, games: games})
      return;

    }

    * table(request, response) {

      var table =  yield (request.table || Table.find(request.param('id')));

      if(!table) {

        response.redirect('/gamelobby');
        return;

      }
      
      var game = yield table.game().fetch();

      yield response.sendView('viewTable', { 
        user: request.user,
        table : table,
        game : game
      });
      return;

    }

    * _jointable(user, table) {

      user.table().associate(table)
      yield user.save()

      Event.fire('user.joinedtable', user, table) 

      return;

    }



}

module.exports = LobbyController
