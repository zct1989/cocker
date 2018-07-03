import { userController } from "~/config/server/user.controller"
import { Request } from "~/core/http";
import "reflect-metadata";
import { Observable } from "rxjs";

function test() {
  Reflect.getMetadata('name', UserService);
}

interface test {
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
  login(requestParams) {
    return requestParams.request()
  }
}