import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  private readonly authService = inject(AuthService)

  private readonly router = inject(Router)

  isLoading:boolean = false

  errorMsg : string = ''
  sucessMsg : string = ''

  registerForm : FormGroup = new FormGroup ({

    name : new FormControl (null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email : new FormControl (null , [Validators.required , Validators.email]),
    password : new FormControl (null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
    rePassword : new FormControl (null , [Validators.required]),
    phone : new FormControl (null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , { validators: this.confirmPaswword })


  confirmPaswword(group :AbstractControl){
    const password = group.get('password')?.value
    const rePass = group.get('rePassword')?.value

    if (password === rePass) {
      return null
    }else{
      return {mismatch:true}
    }

  }

  submitForm(){
    if (this.registerForm.valid) {
          this.isLoading = true
          this.authService.signUp(this.registerForm.value).subscribe({
      next:(res)=>{
            this.isLoading = false
            this.errorMsg = ''
        console.log(res);

        this.sucessMsg = res.message

        setTimeout(() => {
                  this.router.navigate(['/login'])
        }, 1000);
      },
      error:(err)=>{
            this.isLoading = false
        console.log(err);
        this.errorMsg = err.error.message
      }
    })  
    }else{
      this.registerForm.markAllAsTouched()
    }
  }

}
