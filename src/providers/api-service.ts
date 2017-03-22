export abstract class APIService {

  private _url: string = 'http://192.168.0.175:3030';

  get url(): string {
    return this._url;
  }
}
