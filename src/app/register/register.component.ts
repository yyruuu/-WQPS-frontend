import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email = "";
  public username = "";
  public password = "";
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  //点击注册按钮
  register() {
    const data = {
      email: this.email,
      username: this.username,
      password: this.password
    }
    this.loginService.UserRegister(data)
      .subscribe(res => {
        if (res.err === 0) {
          console.log("register res", res.data)
          //注册成功 跳转到登录页面
          setTimeout(()=>{
            this.router.navigateByUrl('/login')
          }, 2000)
        }
      })
  }

}
