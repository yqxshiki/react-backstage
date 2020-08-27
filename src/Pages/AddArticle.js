import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
const { Option } = Select;
const { TextArea } = Input;
import axios from "axios";
import { localRemove } from "../tools/index";
function AddArticle() {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState("请选择类型"); //选择的文章类别

  useEffect(() => {
    getTypeInfo();
  }, []);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });
  //内容
  const ChangeContent = (e) => {
    setArticleContent(e.target.value);

    let html = marked(e.target.value);

    setMarkdownContent(html);
  };
  //简介
  const ChangeIntroduce = (e) => {
    setIntroducemd(e.target.value);

    let html = marked(e.target.value);

    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios({
      method: "get",
      url: "",
      withCredentials: true,
    }).then((res) => {
      if (res.data.data == "没有登录") {
        localRemove("openid");
        props.history.push("/login");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };

  const setData = (value) => {
    setSelectType(value);
  };

  const SaveArticle = () => {
    if (!selectedType) {
      message.error("必须选择文章类型");
      return false;
    } else if (!articleTitle) {
      message.error("必须输入文章标题");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("文章简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("文章发布日期不能为空");
      return false;
    }

    let dataProps = {
      type_id: selectedType,
      titles: articleTitle,
      articles_content: articleContent,
      introduce: introducemd,
    };
    let dataText = showDate.replace("-", "/");
    dataProps.addTime = new Date(dataText).getTime() / 1000;

    if (articleId == 0) {
      dataProps.view_count = 0;
      axios({
        method: "post",
        url: "",
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("文章创建成功");
        } else {
          message.error("文章创建失败");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: "",
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success("文章保存成功");
        } else {
          message.error("文章保存失败");
        }
      });
    }
  };

  return (
    <div>
      <Row gutter={5}>
        {/* left */}
        <Col span={18}>
          {/* 头部 */}
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
                value={articleTitle}
              />
            </Col>
            <Coc span={4}>
              &nbsp;
              <Select
                defaultValue={selectedType}
                size="large"
                onChange={setData}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option value={item.id} key={index + item}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Coc>
          </Row>
          <br />
          {/* //主体 */}
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-context"
                rows={35}
                placeholder="文章内容"
                onChange={ChangeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        {/* right */}
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>
              &nbsp;
              <Button type="primary" size="large" onClick={SaveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={ChangeIntroduce}
              ></TextArea>
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>

            <Col span={12}>
              <div className="data-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={(data, dataString) => {
                    setShowDate(dataString);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
