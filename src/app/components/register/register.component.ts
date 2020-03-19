import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {CustomvalidationserviceService} from '../../services/customvalidationservice.service';
import {User} from '../../model/user';
import {AuthService} from '../../services/auth.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loginForm:FormGroup;
  isSubmitted = false;
  ShowLogin: boolean = true;
  submitted = false;
  ShowForgetPass:boolean = false;
  formBuilder: any;

  constructor(
    private fb: FormBuilder,
    private customValidator:CustomvalidationserviceService,private authService: AuthService, private router: Router,
  ) { }

  
  SwithToRegistration(){
    this.ShowLogin = false;
    this.ShowForgetPass = false;
  }

  SwithToLogin(){
    this.ShowLogin = true;
    this.ShowForgetPass = false;
  }

  SwithToForgetPass(){
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
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  registerNewUser() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }

  
}
