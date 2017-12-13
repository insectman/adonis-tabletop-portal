import { Resource } from './resource';
import { IStringStringOrNumberMap } from './helper.service';

export class Game extends Resource {

  constructor(map: IStringStringOrNumberMap) {

    super(map, [
      'id',
      'name',
      'minPlayers',
      'maxPlayers'
    ]);
  }

}
