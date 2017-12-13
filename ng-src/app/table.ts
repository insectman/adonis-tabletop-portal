import { Resource } from './resource';
import { IStringStringOrNumberMap } from './helper.service';

export class Table extends Resource {

  constructor(map: IStringStringOrNumberMap) {

    super(map, [
      'id',
      'gameId',
      'tableName',
      'ownerId'
    ]);
  }

}
