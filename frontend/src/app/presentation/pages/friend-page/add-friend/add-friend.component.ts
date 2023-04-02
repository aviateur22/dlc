import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {

  addFriendFormGroup: FormGroup = new FormGroup({});

  @Output()
  addFriendEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addFriendFormGroup = this.fb.group({
      email: ['', Validators.required]
    })
  }

  /**
   * 
   */
  ValidateFriendEmail() {
    if(!this.addFriendFormGroup.valid) {
      return this.addFriendFormGroup.markAllAsTouched()
    }
    console.log('ff')
    this.addFriendEmitter.emit(this.addFriendFormGroup.controls['email'].value)
  }

  
} 
