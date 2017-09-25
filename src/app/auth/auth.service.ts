import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { AfterAuthService } from "app/auth/after-auth.service";
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  private token: string;

  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private afterAuthService: AfterAuthService,
    private http: Http
  ) { }

  signinUser(username: string, password: string) {
    let url = "https://menu.khabib.me/api/v1/api-token-auth/";
    let data = {
      "username": username,
      "password": password
    };

    this.http.post(url, data).subscribe(
      (response) => {
        let token=response.json()["token"];
        this.token = token;
        localStorage.setItem("token", this.token);
        this.afterAuthService.afterLogin(token);
        this.router.navigate(["/"]);
      },
      (error) => {
        console.log(error);
        this.notificationsService.error("Error", "Error while signing in", {
          showProgressBar: true,
          timeOut: 0
        });
      },
    );

    

  }

  signupUser(username: string, password: string) {
    let url = "https://menu.khabib.me/api/v1/users/";
    let data = {
      "username": username,
      "password": password
    };

    this.http.post(url, data).subscribe(
      (response) => {
        console.log(response);
        this.notificationsService.success("Account created", "Please login", {
          showProgressBar: true,
          timeOut: 0
        });
        this.router.navigate(["/auth/signin"]);
      },
      (error) => {
        console.log(error);
        this.notificationsService.error("Error", "Error while creating account", {
          showProgressBar: true,
          timeOut: 0
        });
      },
    );
  }

  getToken() {
    if(this.token == null){
      this.token = localStorage.getItem("token");
    }
    return this.token;
  }

  isAuthed(): boolean {
    return this.getToken() != null;
  }

  logout() {
    this.afterAuthService.afterLogout();
    localStorage.removeItem("token");
    this.token = null;
  }

}
