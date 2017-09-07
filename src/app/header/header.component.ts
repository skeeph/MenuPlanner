import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/auth/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private router: Router,
    private notificationsService:NotificationsService
  ) { }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(["/auth/signin"]);
    this.notificationsService.info("You have logged out", "")
  }
}
