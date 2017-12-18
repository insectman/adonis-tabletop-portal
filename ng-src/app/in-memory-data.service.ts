import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { ResponseOptions } from '@angular/http';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, login: 'qwe', password: 'rty', username: 'sdgs', currentTable: 0 },
      { id: 12, login: 'dfg', password: 'sdf', username: 'xdh', currentTable: 0 },
      { id: 13, login: 'we', password: 'fg', username: 'dfj', currentTable: 0 },
      { id: 14, login: 'sdf', password: 'dfj', username: 'dfy', currentTable: 0 },
      { id: 15, login: 'xdfg', password: 'sdth', username: 'zseg', currentTable: 0 },
      { id: 16, login: 'xcvb', password: 'er', username: 'sth', currentTable: 0 },
      { id: 17, login: 'awd', password: 'szg', username: 'zseg', currentTable: 0 },
      { id: 18, login: 'weg', password: 'awf', username: 'SF', currentTable: 0 },
      { id: 19, login: 'awd', password: 'zsg', username: 'zseg', currentTable: 0 }
    ];

    const tables = [
      { id: 2, gameId: 1, tableName: 'efsefs', ownerId: 11 },
      { id: 4, gameId: 2, tableName: 'srsr', ownerId: 13 },
      { id: 7, gameId: 2, tableName: 'srgserg', ownerId: 12 },
      { id: 9, gameId: 2, tableName: 'serhser', ownerId: 15 },
      { id: 10, gameId: 1, tableName: 'eger', ownerId: 17 },
      { id: 11, gameId: 1, tableName: 'dftdfth', ownerId: 16 },
      { id: 13, gameId: 3, tableName: 'aefawefaw', ownerId: 18 },
      { id: 14, gameId: 1, tableName: 'drthdthdr', ownerId: 19 },
      { id: 16, gameId: 2, tableName: 'sddthfth', ownerId: 14 },
    ];

    const games = [
      { id: 1, name: 'brs', minPlayers: 2, maxPlayers: 2 },
      { id: 2, name: 'mrs', minPlayers: 1, maxPlayers: 5 },
      { id: 3, name: 'mypkr', minPlayers: 2, maxPlayers: 8 },
      { id: 4, name: 'economy', minPlayers: 2, maxPlayers: 8 },
      { id: 5, name: 'mytcg', minPlayers: 2, maxPlayers: 2 },
    ];

    const userTables = [
      { id: 1, tableId: 2,  userId: 11, timestamp: 2341},
      { id: 2, tableId: 4,  userId: 13, timestamp: 125},
      { id: 3, tableId: 7,  userId: 12, timestamp: 1234},
      { id: 4, tableId: 9,  userId: 15, timestamp: 2341},
      { id: 5, tableId: 10, userId: 17, timestamp: 231},
      { id: 6, tableId: 11, userId: 16, timestamp: 4561},
      { id: 7, tableId: 13, userId: 18, timestamp: 5671},
      { id: 8, tableId: 14, userId: 19, timestamp: 13430},
      { id: 9, tableId: 16, userId: 14, timestamp: 9461},
    ];

    return { users, tables, games, userTables };
  }

  protected responseInterceptor(res: ResponseOptions, ri: RequestInfo): ResponseOptions {
    // console.log('responseInterceptor:');
    // console.log(ri);
    // res.body = this.myData;
    return res;
  }
}
