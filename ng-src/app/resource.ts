import { IStringStringMap } from './helper.service';

export class Resource {
  fieldNames: string[];
  fieldsAreSet: boolean;
  // id: string;
  values: IStringStringMap;
  fetchSuccess: boolean;
  fetchError: string;

  constructor(map: IStringStringMap, fields?: string[]) {
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
          this.values[param] = '' + map[param];
        }
      }
    }

    if (Object.keys(this.values).length !== this.fieldNames.length) {
      this.fetchSuccess = false;
      this.fetchError = 'some fields are missing from resource';
    } else {
      this.fetchSuccess = true;
    }
  }

}
