import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSchema } from 'src/app/domain/ports/EntitiesSchemas/LoginSchema';
import { LoginUseCase } from 'src/app/domain/useCases/LoginUseCase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  // Données Formulaire
  loginFormGroup: FormGroup = new FormGroup({});

  constructor(    
    private loginUseCase: LoginUseCase,    
    private router: Router,    
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeLoginFormGroup();
  }

  /**
   * Construction du formgroup
   */
  initializeLoginFormGroup() {    
    this.loginFormGroup = this.fb.group({     
      // Email
      email: ['', Validators.required],

      // Password
      password: ['', Validators.required]
    })
  }

  /**
   * Validation des données 
   * @returns { void }
   */
  validateLoginData(): void {   
   console.log(this.loginFormGroup.controls['email'].value)
    if (!this.loginFormGroup.valid) {
      console.log(this.loginFormGroup)
      return this.loginFormGroup.markAllAsTouched();
    }
    
    this.login({
      email: this.loginFormGroup.controls['email'].value,
      password: this.loginFormGroup.controls['password'].value
    })
  }

  /**
   * Connexion
   * @param {LoginSchema} loginData 
   */
  private login(loginData: LoginSchema) {
    this.loginUseCase.execute(loginData);
  }
}
