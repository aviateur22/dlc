import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
 
  @Input() id: string = '';

  @Input() type: string = '';

  @Input() formControlName: string = '';

  @Input() placeHolder: string = '';

  @Input() name: string = '';

  @Input() errorMessage: string ='';

  @Input() labelText: string = ''

  @Input() formGroup: FormGroup = new FormGroup({});

  ngOnInit(){
      console.log(this.formControlName)
  }

}
