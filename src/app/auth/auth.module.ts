import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from "app/auth/signup/signup.component";
import { SigninComponent } from "app/auth/signin/signin.component";
import { AuthRoutingModule } from "app/auth/auth-routing.module";
import { AfterAuthService } from "app/auth/after-auth.service";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  providers: [
    AfterAuthService
  ]
})
export class AuthModule { }
