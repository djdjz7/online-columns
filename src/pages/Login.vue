<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  type LoginRequest,
  type CommonResponse,
  type LoginResponse,
} from "../scripts/models";
import axios, { type AxiosRequestConfig } from "axios";
import Loading from "../components/Loading.vue";
import { Button, TypographyTitle, Input, Modal } from "ant-design-vue";

const account = ref("");
const password = ref("");

const protocolRef = ref(false);

const isLoading = ref(false);

onMounted(() => {
  if (document.location.protocol.toLowerCase() == "https:") {
    protocolRef.value = true;
  }
});

async function login() {
  isLoading.value = true;
  try {
    if (account.value == "") {
      alert("Account could not be empty.");
      return;
    }
    if (password.value == "") {
      alert("Password could not be empty.");
      return;
    }

    var loginRequest: LoginRequest = {
      userName: account.value,
      password: password.value,
      clientType: 1,
    };

    var config: AxiosRequestConfig = {
      baseURL: "http://sxz.api6.zykj.org/",
      headers: {
        "Content-Type": "application/json",
      },
    };

    var loginResponse = await axios.post(
      "api/TokenAuth/Login",
      JSON.stringify(loginRequest),
      config
    );
    var loginData = loginResponse.data as CommonResponse;
    if (!loginData.success) {
      alert(loginData.error.details + "\n" + loginData.error.message);
      return;
    }
    var loginResult = loginData.result as LoginResponse;
    window.location.href = `http://sxz.school.zykj.org/navPage.html?apiHost=http://sxz.api6.zykj.org&apiToken=${loginResult.accessToken}#/list`
  } catch (e) {
    alert(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div
    absolute
    top-0
    bottom-0
    left-0
    right-0
    flex="~ justify-center items-center col"
  >
    <span text-lg>在线专栏</span>
    <div flex="~ justify-center items-center col">
      <TypographyTitle>登录</TypographyTitle>
      <Input
        type="text"
        v-model:value="account"
        m-t-2
        placeholder="用户名"
        v-on:press-enter="login"
      />
      <Input
        type="password"
        v-model:value="password"
        placeholder="密码"
        m-t-2
        v-on:press-enter="login"
      />
      <Button type="primary" m-t-4 @click="login">登录</Button>
    </div>
  </div>
  <Modal v-model:open="protocolRef" title="Protocol Error" @ok="protocolRef = false">
    <p>
      HTTPS is not currently supported by ZY's API, and mixed content is not
      allowed by modern browsers for security reasons.<br />
      Please use HTTP instead.
    </p>
  </Modal>
  <Loading v-if="isLoading" />
</template>
