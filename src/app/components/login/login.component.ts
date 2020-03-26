import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {CustomvalidationserviceService} from '../../services/customvalidationservice.service';
import {User} from '../../model/user';
import {AuthGuard} from '../../guards/auth.guard';
import { Router, ActivatedRoute } from  '@angular/router';
import { AlertService, AuthenticationService } from '../../services/allservices';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  isSubmitted = false;
  otheroutes = true;
  Islogin = true;
  loading = false;
  submitted = false;
  returnUrl: string;
  ShowLogin: boolean = true;
  ShowRegist:boolean = false;
  ShowForgetPass:boolean = false;
  formBuilder: any;

  constructor(
    private fb: FormBuilder,
    private customValidator:CustomvalidationserviceService,
    private authService: AuthGuard,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }

   }

  
  


  ngOnInit() {

     this.loginForm  =  this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  

  get loginFormControls() {
     return this.loginForm.controls;
     }

  loginUser() {
    // this.submitted = true;
    // this.Islogin = false;
    // this.loading = true;
    // if (this.loginForm.valid) {
    //   //alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    //   this.loading = false;
    //   console.table(this.loginForm.value);
      

    this.submitted = true;
    this.otheroutes = false;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    console.table("this are the credentials:::::",this.loginFormControls.email.value, this.loginFormControls.password.value)
   
    this.authenticationService.login(this.loginFormControls.email.value, this.loginFormControls.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/dashboard']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
                this.otheroutes = true;
            });

    }
  }



