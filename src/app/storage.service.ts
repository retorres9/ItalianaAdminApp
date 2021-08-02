import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    return await this._storage?.keys();
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async getItem(key:string): Promise<any> {
    const item = await this._storage?.get( key );

    if (item.value) {
      return JSON.parse(unescape(atob(item.value)));
    } else {
      return null;
    }
  }
}
