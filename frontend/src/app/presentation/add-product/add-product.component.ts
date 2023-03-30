import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { AddProductUseCase } from 'src/app/domain/useCases/AddProductUseCase';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  addProductFormGroup: FormGroup = new FormGroup({});

  // Preview
  previewImage: string ='';



  constructor(
    private fb: FormBuilder,
    private addProductUseCase: AddProductUseCase
  ) {}

  ngOnInit() {
    this.initializeAddProductFormGroup();
  }

  /**
   * Initialisation formBuider
   */
  initializeAddProductFormGroup() {
    this.addProductFormGroup = this.fb.group({
      image: ['', Validators.required]
    })
  }

  /**
   * 
   * @returns 
   */
  validateProductData() {
    if(!this.addProductFormGroup.valid) {
      return this.addProductFormGroup.markAllAsTouched();
    }

    this.addProduct();
  }

  private addProduct() {
   this.addProductUseCase.execute({
    image: this.addProductFormGroup.get('image')!.value,
    openDate: new Date()
   })
  }

  /**
   * 
   * @param file 
   */
  loadSelectedImage(file: File | undefined) {
    if(file){
      const fileReader = new FileReader();
      // Lecture image
      fileReader.readAsDataURL(file);
      fileReader.onload = event=>   {
        this.previewImage = fileReader.result as string;
      }
    }   
  }

}
