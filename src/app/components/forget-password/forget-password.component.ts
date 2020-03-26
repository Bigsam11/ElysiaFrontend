import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {CustomvalidationserviceService, UserService, AuthenticationService, AlertService} from '../../services/allservices';
import {User} from '../../model/user';
import {AuthGuard} from '../../guards/auth.guard';
import { Router } from  '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isSubmitted = false;
  recievedPass = true;
  ShowLogin: boolean = true;
  message = false;
  ShowRegist:boolean = false;
  submitted = false;
  ShowForgetPass:boolean = false;
  formBuilder: any;
  loading: boolean = false;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];


  constructor(
    private fb: FormBuilder,
    private customValidator:CustomvalidationserviceService,
    private authService: AuthGuard, 
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
     ) { 
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.table('the current users ::::',this.currentUser)

     }

  
  


  ngOnInit() {
    this.changePasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    
  });
      
  }

  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  

  changePassword() {
    
      this.submitted = true;
      //this.otheroutes = false;
  
      // stop here if form is invalid
      if (this.changePasswordForm.invalid) {
          return;
      }
  
      this.loading = true;
      console.log("this are the credentials:::::",this.changePasswordForm.value.email)
     
      this.authenticationService.changePassword(this.changePasswordForm.value.email)
          .subscribe(
              data => {
                this.alertService.success('password exist registered ', true);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
                  //this.otheroutes = true;
              });
  
      }

  reload(){
    this.message = false;
    this.recievedPass = true;
  }

  
}
