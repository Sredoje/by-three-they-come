import { Card,Image, Col, Row } from 'antd';
const { Meta } = Card;

function IndexPage() {
    return (
        <>
         <Row align="center">
            <Col xs={24} sm={24} md={24} lg={5} xl={5} align="center">
            <Card
                    hoverable
                    cover={<Image
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />}>
                    <Meta title="Europe Street beat" />
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5} xl={5} align="center">
                <Card
                hoverable
                cover={<Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />}>
                    <Meta title="Europe Street beat" />
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5} xl={5} align="center">
                <Card
                hoverable
                cover={<Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                    preview={{
                    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    }}
                />
                }>
                <Meta title="Europe Street beat" />
                </Card>
            </Col>
         </Row>
        </>
    )
}
export default IndexPage;
