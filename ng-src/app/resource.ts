import { IStringStringOrNumberMap } from './helpers';

export class Resource {
  fieldNames: string[];
  fieldsAreSet: boolean;
  id: number | string;
  values: IStringStringOrNumberMap;

  constructor(map: IStringStringOrNumberMap, fields?: string[]) {
    this.values = {};
    this.fieldsAreSet = !!fields;
    this.fieldNames = fields;

    if (!this.fieldsAreSet) {
      // this.values = Object.assign({}, map);
      this.values = map;
      return;
    }

    for (const param in map) {
      if (Object.prototype.hasOwnProperty.call(map, param)) {
        if (this.fieldNames.indexOf(param) !== -1) {
          this.values[param] = map.param;
        }
      }
    }
  }

}
