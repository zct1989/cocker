<template>
  <q-page class="page login row justify-center">
    <div class="login-container column justify-center">
      <q-field label="邮箱" error-label="请确认邮箱格式正确" :error="$v.loginModel.email.$error" :label-width="3" :count="10">
        <q-input @blur="$v.loginModel.email.$touch" v-model="loginModel.email" />
      </q-field>
      <q-field label="密码" :label-width="3" error-label="请确认密码格式正确" :error="$v.loginModel.password.$error" :count="10">
        <q-input type="password" @blur="$v.loginModel.password.$touch" v-model="loginModel.password" clearable/>
      </q-field>
      <q-btn class="q-mt-md" label="登录" @click="onSubmit" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { email, minLength, required } from "vuelidate/lib/validators";
import { Validations, Layout, Dependencies } from "@cocker/core";
import Component from "vue-class-component";
import Vue from "vue";
import { UserService } from "~/services/user.service";
import { RequestParams } from "@cocker/core/http";
import { User } from "~/models/user";
@Layout("default")
@Component({})
export default class Login extends Vue {
  private user = new User();
  @Dependencies(UserService) private userService: UserService;
  @Validations({
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(4)
    }
  })
  private loginModel = {
    email: "",
    password: ""
  };
  private onSubmit() {
    this.$v.loginModel.$touch();
    if (this.$v.loginModel.$error) {
      this.$router.push("module1/page1");
      // TODO: 更新登录信息
      this.userService.login(new RequestParams(this.user)).subscribe(ddd => {
        console.log("sd", ddd);
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.login.page {
  .login-container {
    width: 300px;
  }
}
</style>