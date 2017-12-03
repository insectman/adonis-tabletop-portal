import { Resource } from './resource';
import { IStringStringOrNumberMap } from './helpers';

export class User extends Resource {

  constructor(map: IStringStringOrNumberMap) {

    super(map, [
      'login',
      'password',
      'username'
    ]);
  }

}
