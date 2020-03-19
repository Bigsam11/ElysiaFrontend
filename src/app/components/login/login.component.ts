import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {CustomvalidationserviceService} from '../../services/customvalidationservice.service';
import {User} from '../../model/user';
import {AuthService} from '../../services/auth.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loginForm:FormGroup;
  isSubmitted = false;
  ShowLogin: boolean = true;
  ShowRegist:boolean = false;
  submitted = false;
  ShowForgetPass:boolean = false;
  formBuilder: any;

  constructor(
    private fb: FormBuilder,
    private customValidator:CustomvalidationserviceService,private authService: AuthService, private router: Router,
  ) { }

  
  SwithToRegistration(){
    this.ShowRegist = true;
    this.ShowLogin = false;
    this.ShowForgetPass = false;
  }

  SwithToLogin(){
    this.ShowRegist = false;
    this.ShowLogin = true;
    this.ShowForgetPass = false;
  }

  SwithToForgetPass(){
    this.ShowRegist = false;
    this.ShowLogin = false;
    this.ShowForgetPass = true;
  }


  ngOnInit() {

     this.loginForm  =  this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  
  }

  

  get loginFormControls() {
     return this.loginForm.controls;
     }

  loginUser() {
    this.submitted = true;
    if (this.loginForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.loginForm.value);
      
    }
  }


}
