import { Component } from '@angular/core';
import { Router } from '@angular/router';
import url from 'src/app/domain/utils/url';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private router: Router) {}

  /**
   * redirection userHomePage
   */
  navigateToHomeUserPage() {
    this.router.navigate([url.userProducts]);
  }

  /**
   * 
   */
  navigateToFriendPage() {
    this.router.navigate([url.friend]);
  }
}
