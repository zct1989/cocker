import { userController } from "~/config/server/user.controller"
import { Request } from "@cocker/core/http";
import "reflect-metadata";
import { Observable } from "rxjs";

function test() {
  Reflect.getMetadata('name', UserService);
}

interface ITest {
  data: any,
  options?: any,
  request?(optoin: any): Observable<any>
}


export class UserService {
  /**
   * 用户登录
   * @param data 
   */
  @Request({
    server: userController.login
  })
  public login(requestParams) {
    return requestParams.request()
  }
}