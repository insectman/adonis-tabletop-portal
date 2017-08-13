'use strict'

const Table = use('App/Model/Table')

class LobbyController {

    * list(request, response) {
    
      var tables = yield Table.query().orderBy('id', 'desc').opened();

      console.log(tables);

      yield response.sendView('gameLobby', { 
        user: request.user,
        tables : tables 
      });
      return;

    }

    * create(request, response) {

      const userData = request.all();

      if(userData['name']) {

        var table = yield request.user.tables().create({name : userData['name']});

        response.redirect('/table/'+table.attributes.id);
        return;

      }

      yield response.sendView('createTable', {table : table, user: request.user});
      return;

    }

    * table(request, response) {

      var table = yield Table.find(request.param('id'));

      if(!table) {

        response.redirect('/gamelobby');
        return;

      }
      
      yield response.sendView('viewTable', { 
        user: request.user,
        table : table 
      });
      return;

    }

}

module.exports = LobbyController
