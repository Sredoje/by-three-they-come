import UserSessionHelper from '../helpers/userSessionHelper';

const EMAIL_API_URL = process.env.REACT_APP_API_URL + 'emails/';
const SUBMIT_FEEDBACK_URL = EMAIL_API_URL + 'submit-feedback';

const EmailApi = {
  submitFeedback: async (email, body, subject) => {
    let response = await fetch(SUBMIT_FEEDBACK_URL, {
      method: 'POST',
      body: JSON.stringify({ email: email, body: body, subject: subject }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
export default EmailApi;
