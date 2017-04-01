export abstract class APIService {

  // private _url: string = 'http://192.168.0.175:3030';

  // digital ocean
  // private _url: string = 'http://174.138.64.141:3030';

  // heroku
  // private _url: string = 'https://rsa-app.herokuapp.com';

  private _url: string = 'http://localhost:3030';

  get url(): string {
    return this._url;
  }
}
