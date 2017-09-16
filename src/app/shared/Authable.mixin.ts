import { RequestOptions, Headers } from "@angular/http";

export class Authable {
    tk:string;
    
    getAuthHeader() {
        if (this.tk === null) {
          this.tk = localStorage.getItem("token");
        }
        let headers = new Headers();
        headers.append('Authorization', `Token ${this.tk}`);
        return new RequestOptions({ headers: headers });
      }
}