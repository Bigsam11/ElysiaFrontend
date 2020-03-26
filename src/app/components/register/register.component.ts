import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {CustomvalidationserviceService} from '../../services/customvalidationservice.service';
import {User} from '../../model/user';
import {AuthGuard} from '../../guards/auth.guard';
import { Router, ActivatedRoute } from  '@angular/router';
import { AlertService, UserService, AuthenticationService } from '../../services/allservices';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isSubmitted = false;
  ShowLogin: boolean = true;
  ShowForgetPass:boolean = false;
  formBuilder: any;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private customValidator:CustomvalidationserviceService,
    private authService: AuthGuard, 
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) { 

    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  
  

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      phone: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  registerNewUser() {
    
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        console.table('this is what i am sending::::::::',this.registerForm.value);
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
   
              }
 
            }


  

