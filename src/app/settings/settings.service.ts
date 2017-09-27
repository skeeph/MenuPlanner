import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Authable } from 'app/shared/authable.mixin';
import { Mixin } from 'app/shared/mixin.decorator';

@Injectable()
@Mixin([Authable])
export class SettingsService implements Authable{

  settings = ["project_name", "apikey", "project_id"]
  user_settings = ["project_name", "apikey"]

  tk: string=null;
  getAuthHeader:()=>RequestOptions;
  setToken(tk: string) {
    this.tk = tk;
  }


  private getUrl(): string {
    return `https://menu.khabib.me/api/v1/settings/`
  }


  public loadSettings() {
    for (let i = 0; i < this.settings.length; i++) {
      let key = this.settings[i];
      if (this.get(key) == null) {
        this.loadSettingsRest();
      }
    }
  }

  private loadSettingsRest() {
    this.http.get(this.getUrl(), this.getAuthHeader()).subscribe(
      (respone: Response) => {
        let settings = respone.json();
        for (let i = 0; i < this.user_settings.length; i++) {
          let key = this.user_settings[i];
          let val = settings[key];
          this.set(key, val);
        }
      },
      (error) => {
        console.info(error);
      }
    );
  }

  set(key: string, val: string) {
    if (!this.settings.includes(key)) {
      throw new Error("Invalid settings");
    }
    localStorage.setItem(key, val);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  saveSettings() {
    let data = {};
    for (let i = 0; i < this.user_settings.length; i++) {
      let key = this.user_settings[i];
      let val = this.get(key);
      data[key] = val;
    }

    this.http.post(this.getUrl(), data, this.getAuthHeader()).subscribe(
      (respone: Response) => { console.log(respone); },
      (error) => { console.log(error); }
    );
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

  clearCache() {
    for (let i = 0; i < this.settings.length; i++) {
      localStorage.removeItem(this.settings[i]);
    }
  }

  constructor(
    private http: Http
  ) { }

}