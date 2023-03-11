import { Row, Col, message } from 'antd';
import './buyPoints.css';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import PaymentApi from '../../api/paymentApi';
import { useContext } from 'react';
import PointsContext from '../../context/pointsContext';

function BuyPoints() {
  const { success, error } = message;
  const { setPoints } = useContext(PointsContext);
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
      <Col span={5}>
        <div align="center">
          <br></br>
          <h2 align="center">Click on the button to buy 2000 points!</h2>
          <CoinbaseCommerceButton
            align="center"
            onChargeSuccess={onChargeSuccess}
            onChargeFailure={onChargeFailure}
            onPaymentDetected={onPaymentDetected}
            onModalClosed={onModalClosed}
            checkoutId={process.env.REACT_APP_CHECKOUT_ID}
            className="buy-button"
          />
        </div>
      </Col>
    </Row>
  );
}

export default BuyPoints;
