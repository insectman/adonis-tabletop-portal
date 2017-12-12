import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, login: 'qwe', password: 'rty', username: 'sdgs'},
      { id: 12, login: 'dfg', password: 'sdf', username: 'xdh'},
      { id: 13, login: 'we', password: 'fg', username: 'dfj'},
      { id: 14, login: 'sdf', password: 'dfj', username: 'dfy'},
      { id: 15, login: 'xdfg', password: 'sdth', username: 'zseg'},
      { id: 16, login: 'xcvb', password: 'er', username: 'sth'},
      { id: 17, login: 'awd', password: 'szg', username: 'zseg'},
      { id: 18, login: 'weg', password: 'awf', username: 'SF'},
      { id: 19, login: 'awd', password: 'zsg', username: 'zseg'}
    ];
    return {users};
  }
}
