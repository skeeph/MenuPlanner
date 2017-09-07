import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { AuthService } from "app/auth/auth.service";

@Injectable()
export class SettingsService {

  settings = ["project_name", "apikey", "project_id"]
  user_settings = ["project_name", "apikey"]

  private getUrl(key: string): string {
    let tk = this.authService.getToken();
    return `https://pushreceiver-26e46.firebaseio.com/${key}.json?auth=${tk}`
  }

  private fireSet(key: string, val: string) {
    let url = this.getUrl(key);
    let setting = {}
    setting[key] = val;
    this.http.put(url, setting).subscribe(
      (resp: Response) => {
        console.log(resp);
      }
    )
  }

  private fireGet(key: string) {
    return this.http.get(this.getUrl(key)).subscribe(
      (response: Response) => {
        this.set(key, response.json()[key])
      }
    );
  }

  public loadSettings() {
    for (let i = 0; i < this.settings.length; i++) {
      let key = this.settings[i];
      if (key == null) {
        this.fireGet(key);
      }
    }
  }

  set(key: string, val: string) {
    if (!this.settings.includes(key)) {
      throw new Error("Invalid settings");
    }
    localStorage.setItem(key, val);
    this.fireSet(key, val);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  settingsCompleted(): boolean {
    for (let k = 0; k < this.user_settings.length; k++) {
      let key = this.user_settings[k];
      let val = this.get(key);
      if (val === null || val.length == 0) {
        return false;
      }
    }
    return true;
  }

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

}
