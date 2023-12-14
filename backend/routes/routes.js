const { Router } = require('express');
const { create_link_token, get_access_token, exchange_public_token, auth, get_transactions } = require('../controllers/plaid_controller');
const { sign_up , sign_in, check_auth_state} = require('../controllers/user_controller');
const router = Router();

router.get('/', (req, res) => {
    res.send('Budget Wise API is running!');
});

router.post('/create_link_token', create_link_token);

router.post('/get_access_token', get_access_token);

router.post('/signup', sign_up);

router.post('/signin', sign_in);

router.post('/exchange_public_token', exchange_public_token);

router.get('/check_auth_state', check_auth_state)

router.post('/auth', auth)

router.post('/get_transactions', get_transactions);

module.exports = router;