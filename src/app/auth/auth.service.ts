import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { AfterAuthService } from "app/auth/after-auth.service";

@Injectable()
export class AuthService {
  private token: string;

  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private afterAuthService:AfterAuthService
  ) { }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser.getToken().then(
          (token: string) => {
            this.token = token;
            this.afterAuthService.loadUserData(token)
          }
        )
        this.router.navigate(["/"]);
      })
      .catch(error => {
        console.log(error);
        this.notificationsService.error("Error", "Error while signing in", {
          showProgressBar: true,
          timeOut: 0
        });
      });
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
      response => {
        console.log(response);
        this.notificationsService.error("Account created", "Please login", {
          showProgressBar: true,
          timeOut: 0
        });
        this.router.navigate(["/auth/login"]);
      }
      )
      .catch(
      (error) => {
        console.log(error);
        this.notificationsService.error("Error", "Error while creating account", {
          showProgressBar: true,
          timeOut: 0
        });
      }
      );
  }

  getToken() {
    let user = firebase.auth().currentUser;
    if (user) {
      user.getToken()
        .then(
        (token: string) => {
          this.token = token;
        }
        );
    }
    return this.token;
  }

  isAuthed(): boolean {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

}
