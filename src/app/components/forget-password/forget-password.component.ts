import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {CustomvalidationserviceService} from '../../services/customvalidationservice.service';
import {User} from '../../model/user';
import {AuthGuard} from '../../guards/auth.guard';
import { Router } from  '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private customValidator:CustomvalidationserviceService,private authService: AuthGuard, private router: Router,
     ) { }

  
  // SwithToRegistration(){
  //   this.ShowRegist = true;
  //   this.ShowLogin = false;
  //   this.ShowForgetPass = false;
  // }

  // SwithToLogin(){
  //   this.ShowRegist = false;
  //   this.ShowLogin = true;
  //   this.ShowForgetPass = false;
  // }

  // SwithToForgetPass(){
  //   this.ShowRegist = false;
  //   this.ShowLogin = false;
  //   this.ShowForgetPass = true;
  // }


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
    if (this.changePasswordForm.valid) {
      this.message = true;
      this.recievedPass = false;
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.changePasswordForm.value);
    }
  }

  reload(){
    this.message = false;
    this.recievedPass = true;
  }

  
}
