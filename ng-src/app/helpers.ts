export interface IStringTMap<T> { [key: string]: T; }
export interface INumberTMap<T> { [key: number]: T; }

export type IStringAnyMap = IStringTMap<any>;
export type INumberAnyMap = INumberTMap<any>;

export type IStringStringMap = IStringTMap<string>;
export type INumberStringMap = INumberTMap<string>;
export type IStringStringOrNumberMap = IStringTMap<string|number>;

export type IStringNumberMap = IStringTMap<number>;
export type INumberNumberMap = INumberTMap<number>;

export type IStringBooleanMap = IStringTMap<boolean>;
export type INumberBooleanMap = INumberTMap<boolean>;


export function mapToQueryString(map: IStringStringOrNumberMap) {

  const queryChunks = [];

  for (const param in map) {
    if (Object.prototype.hasOwnProperty.call(map, param)) {
      queryChunks.push(map + '=' + map[param]);
    }
  }

  return queryChunks.join('&');

}
