import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {CustomvalidationserviceService} from '../../services/customvalidationservice.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loginForm:FormGroup;
  ShowLogin: boolean = true;
  ShowRegist:boolean = false;
  submitted = false;
  ShowForgetPass:boolean = false;

  constructor(
    private fb: FormBuilder,
    private customValidator:CustomvalidationserviceService
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
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      phone: ['', Validators.required],
    });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      
    });
  
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


  get loginFormControl() {
    return this.loginForm.controls;
  }
  

  registerNewUser() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }

  loginUser() {
    this.submitted = true;
    if (this.loginForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.loginForm.value);
    }
  }


}
