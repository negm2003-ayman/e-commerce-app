import { ForgotService } from './../../../../core/services/forgot/forgot.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule ,Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {

  private readonly ForgotService=inject(ForgotService)
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
    isLoading:boolean = false




  step:number=1;

  forgotPassForm:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email])
  })

  verifyCodeForm:FormGroup = new FormGroup({
    resetCode : new FormControl(null , [Validators.required])
  })

  resetPassform:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email]),
    newPassword : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)])
  })

    errorMsg : string = ''
    sucessMsg : string = ''

  forgetPass(){
    let emailValue = this.forgotPassForm.get('email')?.value
    this.resetPassform.get('email')?.patchValue(emailValue)
    this.isLoading = true

    this.ForgotService.forgetPass(this.forgotPassForm.value).subscribe({
      next:(res)=>{
        this.errorMsg = ''
        this.isLoading = false

        console.log(res);
        this.sucessMsg = res.message

        setTimeout(() => {
          if(res.statusMsg == 'success'){
          this.step = 2
        }
        }, 2000);
        

        
      },error:(err)=>{
        this.isLoading = false

        console.log(err);
        this.errorMsg = err.error.message
        
      }
    })
  }

  errMsg : string =''
  sucsMsg : string =''

  verifyCode(){
        this.isLoading = true

    this.ForgotService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        this.errMsg = ''
        console.log(res);
        this.sucsMsg = res.status

        setTimeout(() => {
          if(res.status == 'Success'){
          this.step = 3
        }
        }, 1000);
        
      },error:(err)=>{
        this.isLoading = false

        console.log(err);
        this.errMsg = err.error.message
        
      }
    })
  }


  resetPass(){
        this.isLoading = true
        this.ForgotService.resetPass(this.resetPassform.value).subscribe({
        next:(res)=>{
        this.isLoading = false

        console.log(res);

        //! save data in localsrorage
        localStorage.setItem('myToken' , res.token)

        // ! decode token
        this.authService.getUserData()


          // * navigate home
        setTimeout(() => {
                  this.router.navigate(['/home'])
        }, 1000);

        
      },error:(err)=>{
        this.isLoading = false

        console.log(err);
        
      }
    })
  }

}
