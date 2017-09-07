import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "app/auth/auth.service";
import { NotificationsService } from "angular2-notifications";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let authed = this.authService.isAuthed()
    if (authed) {
      return authed; 
    } else {
      this.router.navigate(["/auth/signin"]);
      this.notificationsService.warn("Please log in", "")
      return authed;
    }
  }

  constructor(
    private authService:AuthService,
    private router: Router,
    private notificationsService:NotificationsService
  ) { }

}
