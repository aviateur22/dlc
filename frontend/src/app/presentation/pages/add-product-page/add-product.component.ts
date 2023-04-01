import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProductUseCase } from 'src/app/domain/useCases/AddProductUseCase';
import url from 'src/app/domain/utils/url';
import { AddProductService } from 'src/app/infra/services/useCaseService/add-product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  addProductFormGroup: FormGroup = this.fb.group({
    image: ['', Validators.required]
  })

  // Preview image sélectionnée
  previewImageBase64: string ='';

  // Image a envoyer backend
  imageSelected!: File;

  constructor(
    private fb: FormBuilder,
    private addProductUseCase: AddProductUseCase,
    private addProductService: AddProductService,
    private router: Router
  ) {}

  /**
   * Validation données
   */
  validateProductData():  void {
    if(!this.addProductFormGroup.valid) {
      return this.addProductFormGroup.markAllAsTouched();
    }

    this.addProduct();
  }

  /**
   * Ajout produit
   */
  private addProduct() {

    // Suivi reponse 
    this.addProductService.addProductResponseObservable.subscribe(addProductResponse=>{
      if(addProductResponse) {
        this.router.navigate([url.userProducts]);
      }
    });

    // Ajout produit
    this.addProductUseCase.execute(this.imageSelected);
  }

  /**
   * Affichage preview
   * @param {File} file 
   */
  loadSelectedImage(file: File | undefined) {
    if(file){
      this.imageSelected = file;
      const fileReader = new FileReader();
      // Lecture image
      fileReader.readAsDataURL(file);
      fileReader.onload = event=>   {
        this.previewImageBase64 = fileReader.result as string;
      }
    }   
  }

}
