import React, { useState } from "react";
import { Card, Input, Icon, Button, Spin, message } from "antd";
import "../static/css/Login.css";
import axios from "axios";
import { localSet } from "../tools/index";
function Login(props) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    setIsLoading(true);
    if (!userName) {
      message.error("用户名不为空");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    } else if (!passWord) {
      message.error("慢慢不能为空");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    }
    let dataProps = {
      userNmae,
      passWord,
    };

    axios({
      method: "post",
      url: "",
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.data == "登录成功") {
        localSet("openid", res.data.openid);
        props.history.push("/index");
        message.success("登录成功!!!");
      } else {
        message.error("用户名密码错误");
      }
    });
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
