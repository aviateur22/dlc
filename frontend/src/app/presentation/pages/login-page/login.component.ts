import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSchema } from 'src/app/domain/ports/EntitiesSchemas/LoginSchema';
import { LoginUseCase } from 'src/app/domain/useCases/LoginUseCase';
import messages from 'src/app/domain/utils/messages';
import url from 'src/app/domain/utils/url';
import { LoginService } from 'src/app/infra/services/useCaseService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  // Données Formulaire
  loginFormGroup: FormGroup = new FormGroup({});

  // Affichage erreur HTML
  emailMissing: string = messages.emailMissing;
  passwordMissing: string = messages.passwordMissing;

  constructor(
    private loginService: LoginService,
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
    
    if (!this.loginFormGroup.valid) {
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
    // Login 
    this.loginUseCase.execute(loginData);

    // Validation Inscription
    this.loginService.loginResponseObservable.subscribe(loginResponse=>{
      if(loginResponse) {
        this.router.navigate([url.userProducts]);
      }
    });
  }
}
