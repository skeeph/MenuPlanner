import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  settings = ["project_name", "apikey", "project_id"]
  user_settings = ["project_name", "apikey"]

  set(key: string, val: string) {
    if (!this.settings.includes(key)) {
      throw new Error("Invalid settings");
    }
    localStorage.setItem(key, val);
  }

  get(key: string) {
    return localStorage.getItem(key);;
  }

  settingsCompleted(): boolean {
    for (let k = 0; k < this.user_settings.length; k++) {
      let key = this.user_settings[k];
      let val = this.get(key);
      if ( val === null || val.length == 0) {
        return false;
      }
    }
    return true;
  }

  constructor() { }

}
