import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ResponseVO {
  err?: number;
  info?: string;
  data?: UserInfo;
}
interface UserInfo {
  id: number;
  username: string;
  email: string;
}

interface UserPushInfo {
  username?: string;
  password?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // 标记用户是否登录
  public isLogin = false;
  public userInfo: UserInfo = {} as UserInfo;
  constructor(public http: HttpClient) { }

  // 用户注册
  UserRegister(data: UserPushInfo): Observable<ResponseVO> {
    const res = this.http.post(`http://localhost:8000/users/register`, { ...data }, { withCredentials: true });
    return res;
  }

  // 用户登录
  UserLogin(data: UserPushInfo): Observable<ResponseVO> {
    const res = this.http.post(`http://localhost:8000/users/login`, { ...data }, { withCredentials: true });
    return res;
  }

  // 检查用户是否已经登录
  async CheckLogin() {
    let res: ResponseVO = await this.http.get(`http://localhost:8000/users/login`, { withCredentials: true }).toPromise();
    if (res.err === 0) {
      //已经登录
      this.isLogin = true;
      this.userInfo = res.data;
      // 加入localstorage中
      window.localStorage.setItem('userId', this.userInfo.id.toString());
    } else {
      this.isLogin = false;
    }
  }
}
