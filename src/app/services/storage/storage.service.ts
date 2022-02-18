import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
 constructor() { 
    //this.clear();
  }

  async clear(){
    return await Storage.clear();
  }

  async setStorage(key_: string, value_: any){
    console.log('sata saved!')
    return await Storage.set({
      key: key_,
      value: JSON.stringify(value_),
    });
  }

  async getStorage(key_: string){
    return await Storage.get({ key: key_ });
  }

}
