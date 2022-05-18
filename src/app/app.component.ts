import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'projectManager';
  public sidebarOpen = true;

  username: string = '';

  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    if (location.hash == 'http://localhost:4200/') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('isAdmin');
    }
  }

  sidebarToggler() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  userLoged(username: string) {
    this.username = username;
  }
}
