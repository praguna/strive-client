import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../auth/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  isSubmitted  =  false;
  haserror:any;
  signIn: boolean=false;
  constructor(private authService : AuthService,private router : Router, private formBuilder : FormBuilder) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) this.router.navigate(['/problems'])
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmpassword: ['', Validators.required]
  }, 
  {
      validator: MustMatch('password', 'confirmpassword')
  });
  }

  get formControls() { return this.registerForm.controls; }
  register(){
    const res:User={
      username :this.registerForm.value.username, 
      password :this.registerForm.value.password,
      email :this.registerForm.value.email}
    this.isSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }
    this.signIn=true;
    this.authService.register(res).subscribe(data=>{
      this.router.navigateByUrl('/problems');
    },
    error=>{
      this.haserror=error.error;
      this.signIn=false;  
     if(this.haserror=="[object ProgressEvent]") this.haserror="network error"
	
    }
    )
  }

}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
