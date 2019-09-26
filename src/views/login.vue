<template>
  <div>
    <Row>
      <Col span="12">
        <img src="../images/login_logo.png" class="loginImg" />
      </Col>
      <Col span="12">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
          class="loginForm"
        >
          <FormItem>
            <h2>欢迎登录XXX日报系统</h2>
          </FormItem>
          <FormItem label="用户名" prop="userName">
            <Input v-model="formValidate.userName" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input v-model="formValidate.password" placeholder="Enter your e-mail"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit('formValidate')">登录</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<style>
.loginForm {
  margin: 100px 100px 50px 0px;
  width: 300px;
  height: 100%;
}
.loginImg {
  align: center;
  margin: 50px 0px 50px 100px;
  width: 60%;
  height: 60%;
}
</style>

<script>
export default {
  data() {
    return {
      formValidate: {
        userName: "",
        password: ""
      },
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "The userName cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "password cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit(name) {
      let me = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          me.loginValidate(this.formValidate);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 登录校验
    loginValidate(obj) {
      if (obj.userName === "root" && obj.password === "root") {
        this.$Message.success("Success!");
        this.$router.push({
          path: "/"
        });
      } else {
        this.$Message.error("用户名或密码错误!");
      }
    }
  }
};
</script>
