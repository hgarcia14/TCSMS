const request = require('../config/axios');
const { setUser, getUsers, findUserById } = require('../sources/fakedb');
const { getRandomString } = require('../utils/randomCode');
const { validationResult } = require('express-validator');

exports.setSubscription = async (req, res) => {
  const body = req.body;

  const errors = validationResult(req);
  try {

    if (!errors.isEmpty()) {
      const err = errors.array();
      return res.status(200).json({ message: err[0].msg });
    }
    const payload = {
      data: {
        type: 'subscription',
        attributes: {
          list_id: 'XtJwyL',
          custom_source: "Hector POC Sign Up",
        }
      }
    }
    payload.data.attributes['phone_number'] = body.phoneNumber;
    const isSubscribed = findUserById(payload.data.attributes.phone_number);
    if (isSubscribed && isSubscribed.length > 0) {
      return res.status(200).json({ message: 'User already exists' });
    }

    const subscribe = await request.post('/subscriptions/?company_id=VvECBG', payload);

    if (subscribe.status === 202) {
      setUser({ phone_number: payload.data.attributes.phone_number, code: getRandomString(10) });
    }

    const userSubscribed = findUserById(payload.data.attributes.phone_number);
    return res.status(200).json({ message: 'Subscribed', data: { ...userSubscribed[0] } });
  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error}` })
  }
}