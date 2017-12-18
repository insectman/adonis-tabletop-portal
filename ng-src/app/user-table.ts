import { Resource } from './resource';
import { IStringStringMap } from './helper.service';

export class UserTable extends Resource {

  constructor(map: IStringStringMap) {

    super(map, [
      'id',
      'userId',
      'tableId',
      'timestamp'
    ]);

  }

}
