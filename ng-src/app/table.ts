import { Resource } from './resource';
import { User } from './user';
import { IStringStringMap } from './helper.service';

export class Table extends Resource {

public users: User[];
public isCurrentTable: boolean;
public ownerName: string;
public gameName: string;

  constructor(map: IStringStringMap) {

    super(map, [
      'id',
      'gameId',
      'tableName',
      'ownerId'
    ]);

    this.users = [];
    this.isCurrentTable = false;
    this.ownerName = '';
    this.gameName = '';
  }

}
