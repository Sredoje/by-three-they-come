import { Row, Col, message, theme } from 'antd';
import './buyPoints.css';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import PaymentApi from '../../api/paymentApi';
import { useContext } from 'react';
import PointsContext from '../../context/pointsContext';
const { useToken } = theme;
function BuyPoints() {
  const { success, error } = message;
  const { setPoints } = useContext(PointsContext);
  const { token } = useToken();
  const onChargeSuccess = async (messageData) => {
    let response = await PaymentApi.processPayment(messageData);
    setPoints(response.points);
    success('Sucessfully bought points!', 7);
  };
  const onChargeFailure = (messageData) => {
    PaymentApi.processPayment(messageData);
    error(
      'There was an error with payment, please try again or contact us if you have any issues!',
      7
    );
  };
  const onPaymentDetected = (messageData) => {
    console.log('Payment Detected', messageData);
  };
  const onModalClosed = () => {};
  return (
    <Row align="center" className="pointsRow">
      <Col>
        <div align="center">
          <h2 align="center" className="buyHeader">
            Click on the button to buy 2000 points!
          </h2>
          <CoinbaseCommerceButton
            align="center"
            onChargeSuccess={onChargeSuccess}
            onChargeFailure={onChargeFailure}
            onPaymentDetected={onPaymentDetected}
            onModalClosed={onModalClosed}
            checkoutId={process.env.REACT_APP_CHECKOUT_ID}
            className="buy-button"
            style={{ backgroundColor: token.colorPrimary }}
          />
        </div>
      </Col>
    </Row>
  );
}

export default BuyPoints;
