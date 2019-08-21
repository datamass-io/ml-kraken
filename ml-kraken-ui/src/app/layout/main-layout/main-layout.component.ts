import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  title = 'ML Kraken';
  abbreviation = 'ML K';
  active = false;

  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
  }
}
