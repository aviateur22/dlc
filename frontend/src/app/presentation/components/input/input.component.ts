import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }]
})
export class InputComponent implements ControlValueAccessor {

  @ViewChild('input', {static: false}) input!: ElementRef;

  @Input() autoFocus = false;

  @Input() id: string = '';

  @Input() type: string = '';

  @Input() formControlName: string = '';

  @Input() placeHolder: string = '';

  @Input() name: string = '';

  @Input() errorMessage: string ='';

  @Input() labelText: string = ''

  @Input() formGroup: FormGroup = new FormGroup({});

  @Input() 
  hasDisplaPasswordOption: boolean = false;
  
  ngAfterViewInit() {
    if(this.autoFocus) {
      this.onFocus()
    }
  }

  /**
   * Affichage mot de passe en clair
   */
  showPassword(){
    this.type = 'text';    
    setTimeout(()=>{
      this.type = 'password'
    }, 5000);
  }

  //#region ControlValueAccessor
    value = '';

    @Input() isDisabled!: boolean;

    onChange!: (value?: any) => void;

    onTouch!: (event: any) => void;

    writeValue(obj: any): void {
      this.value = obj;
    }

    registerOnChange(fn: any): void {
      this.onChange = fn
    }  

    registerOnTouched(fn: any): void {
      this.onTouch = fn
    }

    setDisabledState?(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
    }
    
    onInput(value: any) {
      if(this.onChange) {
        this.onChange(value);
      }
    }

    onTouched(value: any) {
      if(this.onTouch) {
        this.onTouch(value)
      }
    }
   
  //#endregion
  

  onFocus() {
    //Normal Focus Method
    this.input.nativeElement.focus();

    // Another Method for set Focus
    //  this.input.nativeElement.select();
  }
}
