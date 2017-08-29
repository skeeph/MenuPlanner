import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { SettingsService } from "app/settings/settings.service";
import { NotificationsService } from "angular2-notifications";

@Injectable()
export class SettingsGuardService implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    let completed = this.settingsService.settingsCompleted();
    if (completed) {
      return completed;
    } else {
      this.router.navigate(["/settings"]);
      this.notificationsService.warn("Bad settings", "Please set shopping list project name and Todoist API Key")
      return completed;
    }
  }

  constructor(
    private settingsService: SettingsService, 
    private router: Router,
    private notificationsService:NotificationsService
  ) { }

}
