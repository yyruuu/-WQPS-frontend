import { Component } from '@angular/core';
import { LoginService } from '../app/services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WQPS-frontend';
  constructor(
    public loginService: LoginService
  ) { }
  async ngOnInit() {
    await this.loginService.CheckLogin();
  }
}
