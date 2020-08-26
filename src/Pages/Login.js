import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Input, Icon, Button, Spin } from "antd";
import "../static/css/Login.css";
function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
        <Card
          title="管理系统 Blog System"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userNmae"
            size="large"
            placeholder="enter your username"
            prefix={
              <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}></Icon>
            }
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br></br>
          <Input.Password
            id="passWord"
            size="large"
            placeholder="enter your passWord"
            prefix={
              <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }}></Icon>
            }
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
          <br></br>
          <Button type="primary" size="large" block onClick={checkLogin}>
            Login In
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
