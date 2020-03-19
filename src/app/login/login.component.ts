import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = "";
  public password = "";
  private isSuccess = true;
  private isFail = true;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    const data = {
      username: this.username,
      password: this.password
    }
    this.loginService.UserLogin(data)
      .subscribe(res => {
        console.log("login res:", res)
        if (res.err === 0) {
          //登录成功
          this.isFail = false;
          this.isSuccess = true;
          this.loginService.isLogin = true;
          this.loginService.userInfo = res.data;
          window.localStorage.setItem('userId', res.data.id.toString())
          //跳转到首页
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 1000)
        } else {
          this.isSuccess = false;
          this.isFail = true;
        }
      })
  }

}
