import { Image, Row, Carousel, Col } from "antd";
import React, { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./indexPage.css";
function IndexPage() {
  function onChange() {
    console.log("Slides are changing");
  }
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Row align="center">
        <Col span={20} align="center">
          <h1>By three they come</h1>
          <h1>
            Figoure out different scheemas, do we show 3, do we preview ? How
            will it look on mobile
          </h1>
          <Carousel
            arrows={true}
            // prevArrow={<LeftOutlined />}
            // nextArrow={<RightOutlined />}
          >
            <div>
              <Image
                width="500px"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
            <div>
              <Image
                width="500px"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
            <div>
              <Image
                width="500px"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
          </Carousel>
        </Col>
      </Row>
    </>
  );
}
export default IndexPage;