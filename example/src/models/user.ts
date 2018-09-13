import { Model } from '@cocker/core/model'

export class User extends Model {
  private id

  private user

  private token

  public convert() {
    return {
      username: "superadmin",
      password: "21218cca77804d2ba1922c33e0151105"
    }
  }

  public translate(data) {
    this.id = data.user.id
    this.user = data.user
    this.token = data.token
  }
}