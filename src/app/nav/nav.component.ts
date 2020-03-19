import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit() {
    // this.loginService.CheckLogin()
    console.log(this.loginService.isLogin)
  }

  async toLogin(){
    await this.router.navigateByUrl('/login')
  }

  async signout(){
    console.log("click signout")
    await this.loginService.Signout()
    this.router.navigateByUrl('/login')
  }

}
