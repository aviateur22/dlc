import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {

  addFriendFormGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  addFriend() {
    
  }

  ngOnInit() {
    this.addFriendFormGroup = this.fb.group({
      email: ['', Validators.required]
    })
  }
} 
