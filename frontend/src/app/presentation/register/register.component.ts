import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterSchema } from 'src/app/domain/ports/EntitiesSchemas/RegisterSchema';
import { RegisterUseCase } from 'src/app/domain/useCases/RegisterUSeCase';
import { RegisterService } from 'src/app/infra/services/useCaseService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerFormGroup: FormGroup = new FormGroup({});

  constructor(
    private registerUseCase: RegisterUseCase,
    private registerService: RegisterService,
    private fb: FormBuilder
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

    // Validation Inscription
    this.registerService.isRegisterSuccessObservable.subscribe(registerStatus=>{
      if(registerStatus) {
        console.log(registerStatus);
      }
    });

    // Inscription
    this.registerUseCase.execute(registerData);
  }

}
