import UserSessionHelper from '../helpers/userSessionHelper';

const PAYMENTS_API_URL = process.env.REACT_APP_API_URL + 'payments/';

const PaymentApi = {
  processPayment: async function (data) {
    let response = await fetch(PAYMENTS_API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + UserSessionHelper.getToken(),
      },
    });

    if (!response.ok) {
      let responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    const result = await response.json();
    return result;
  },
};
export default PaymentApi;
