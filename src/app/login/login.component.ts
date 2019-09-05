import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  signIn=false;
  haserror:any;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(data=>{if(data)  this.router.navigate(['/problems'])}) 
    this.loginForm  =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(7)]]
  });
  }
		
  get formControls() { return this.loginForm.controls; }
  
  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.signIn=true;
    this.authService.login(this.loginForm.value).subscribe(data=>{
      this.router.navigateByUrl('/problems');
    },err=>{ this.signIn=false; this.haserror=err.error;
	 if(this.haserror=="[object ProgressEvent]") this.haserror="network error"
   }
    )
    
  }

}
