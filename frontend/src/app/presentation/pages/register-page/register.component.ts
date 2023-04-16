import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterSchema } from 'src/app/domain/ports/EntitiesSchemas/RegisterSchema';
import { RegisterUseCase } from 'src/app/domain/useCases/RegisterUSeCase';
import messages from 'src/app/domain/utils/messages';
import url from 'src/app/domain/utils/url';
import { RegisterService } from 'src/app/infra/services/useCaseService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerFormGroup: FormGroup = new FormGroup({});

  // Affichage erreur HTML
  emailMissing: string = messages.emailMissing;
  passwordMissing: string = messages.passwordMissing;
  confirmPasswordMissing: string = messages.confirmPasswordMissing

  constructor(
    private registerUseCase: RegisterUseCase,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router, 
  ) {}

  ngOnInit() {
    this.initializeRegisterFormGroup();
  }

  /**
   * Initialisation du Formbuilder
   */
  initializeRegisterFormGroup() {
    this.registerFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  /**
   * Validation de la données
   * @returns 
   */
  validateRegisterData(): void {
    if(!this.registerFormGroup.valid) {
      return this.registerFormGroup.markAllAsTouched();
    }

    this.register({
      email: this.registerFormGroup.controls['email'].value ,
      password: this.registerFormGroup.controls['password'].value,
      confirmPassword: this.registerFormGroup.controls['password'].value 
    })
  }

  /**
   * register
   * @param registerData 
   */
  private register(registerData: RegisterSchema) {

    // Inscription
    this.registerUseCase.execute(registerData);

    // Validation Inscription
    this.registerService.registerResponseObservable.subscribe(registerResponse=>{
      if(registerResponse) {
        this.router.navigate([url.login]);
        console.log(registerResponse.user.userId);
      }
    });   
  }

}
