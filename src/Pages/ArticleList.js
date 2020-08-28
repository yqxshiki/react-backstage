import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import '../static/css/ArticleList.css'
const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  //获取列表
  const getList = () => {
    axios({
      method: "get",
      url: "",
      withCredentials: true,
    }).then((res) => {
      setList(res.data.list);
      message.success("成功");
    });
  };
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.item>
            <Row className="list-div">
              <Col span={8}>
                <b>{item.title}</b>
              </Col>
              <Col span={4}>
                <b>{item.typeName}</b>
              </Col>
              <Col span={4}>
                <b>{item.typeName}</b>
              </Col>
              <Col span={4}>
                <b>{item.count}</b>
              </Col>
              <Col span={4}>
                <Button type="primary">修改</Button>
                <Button type="primary">删除</Button>
              </Col>
            </Row>
          </List.item>
        )}
      />
    </div>
  );
}

export default ArticleList;
