import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  settings = ["project_name", "apikey"]

  set(key: string, val: string) {
    if (!this.settings.includes(key)) {
      throw new Error("Invalid settings");
    }
    localStorage.setItem(key, val);
  }

  get(key: string) {
    return localStorage.getItem(key);;
  }

  constructor() { }

}
