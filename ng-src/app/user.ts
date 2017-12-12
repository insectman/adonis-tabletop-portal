import { Resource } from './resource';
import { IStringStringOrNumberMap } from './helper.service';

export class User extends Resource {

  constructor(map: IStringStringOrNumberMap) {

    super(map, [
      'id',
      'login',
      'password',
      'username'
    ]);
  }

}
