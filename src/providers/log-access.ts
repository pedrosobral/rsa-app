import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const LOGACCESS = 'APPS.PEDROSOBRAL.RSA.LOGACCESS.ROOMS';

@Injectable()
export class LogAccessProvider {
  private LIMIT_LOG_ACCESS = 10;

  constructor(public storage: Storage) { }

  get history() {
    return this.getFromDatabase(LOGACCESS);
  }

  addHistory(entry) {
    this.history.then((data: Array<any>) => {
      if (!data) {
        data = [];
      }
      const index = data.findIndex(x => x.code === entry.code);

      if (index === -1) {
        // add entry at top
        data.unshift(entry);
      } else if (index > 0) {
        // move entry from index to 0
        data.splice(index, 1);
        data.unshift(entry);
      }

      // limit to last 10 access
      data.splice(this.LIMIT_LOG_ACCESS, 1);

      // save
      this.saveHistory(data);
    });
  }

  saveHistory(data) {
    return this.saveToDatabase(LOGACCESS, data);
  }

  private saveToDatabase(key, data) {
    return this.storage.set(key, JSON.stringify(data));
  }

  private getFromDatabase(key) {
    return this.storage.get(key).then(data => {
      return JSON.parse(data);
    });
  }
}
