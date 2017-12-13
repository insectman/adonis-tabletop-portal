import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, login: 'qwe', password: 'rty', username: 'sdgs', currentTable: 0},
      { id: 12, login: 'dfg', password: 'sdf', username: 'xdh', currentTable: 0},
      { id: 13, login: 'we', password: 'fg', username: 'dfj', currentTable: 0},
      { id: 14, login: 'sdf', password: 'dfj', username: 'dfy', currentTable: 0},
      { id: 15, login: 'xdfg', password: 'sdth', username: 'zseg', currentTable: 0},
      { id: 16, login: 'xcvb', password: 'er', username: 'sth', currentTable: 0},
      { id: 17, login: 'awd', password: 'szg', username: 'zseg', currentTable: 0},
      { id: 18, login: 'weg', password: 'awf', username: 'SF', currentTable: 0},
      { id: 19, login: 'awd', password: 'zsg', username: 'zseg', currentTable: 0}
    ];

    const tables = [
      { id: 2, gameId: 1, tableName: 'efsefs', ownerId: 11},
      { id: 4, gameId: 2, tableName: 'srsr', ownerId: 13},
      { id: 7, gameId: 2, tableName: 'srgserg', ownerId: 12},
      { id: 9, gameId: 2, tableName: 'serhser', ownerId: 15},
      { id: 10, gameId: 1, tableName: 'eger', ownerId: 17},
      { id: 11, gameId: 1, tableName: 'dftdfth', ownerId: 16},
      { id: 13, gameId: 3, tableName: 'aefawefaw', ownerId: 18},
      { id: 14, gameId: 1, tableName: 'drthdthdr', ownerId: 19},
      { id: 16, gameId: 2, tableName: 'sddthfth', ownerId: 14},
    ];

    return {users, tables};
  }
}
