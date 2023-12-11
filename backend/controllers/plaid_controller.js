const plaidClient = require("../plaid/config");
const { db } = require("../firebase/config");
const { 
    addDoc,
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    setDoc,
    where
} = require("firebase/firestore");
const { query } = require("express");


const create_link_token = async function (request, response) {
    const plaidRequest = {
        user: {
            client_user_id: "test-user-id",
        },
        client_name: 'Plaid Test App',
        products: ['auth'],
        language: 'en',
        redirect_uri: 'http://localhost:3000/',
        country_codes: ['US'],
    };
    try {
        const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
        return response.status(200).json(createTokenResponse.data);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to create link token" });
    }
}

const get_access_token = async function (request, response) {
    const { publicToken, userId } = request.body;
    try {
        const exchangeResponse = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });


        response.json({ public_token_exchange: 'complete', access_token: exchangeResponse.data.access_token });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to exchange public token" });
    }
}

const exchange_public_token = async function (request, response) {
    const { public_token, user_id } = request.body;
    console.log("Public Token", public_token);
    try {
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
            public_token: public_token
        });

        const accessToken = plaidResponse.data.access_token;
        const itemId = plaidResponse.data.item_id;
   
        response.json({ public_token_exchange: 'complete', access_token: accessToken });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to exchange public token" });
    }
}

const auth = async function (request, response) {
    const { access_token, userId } = request.body;
    const plaidRequest = {
        access_token
    };
    try {
        const plaidResponse = await plaidClient.authGet(plaidRequest);

        console.log(plaidResponse.data.accounts[0]);

        const accounts = collection(db, "accounts");
        await addDoc(accounts, {
            accountId: plaidResponse.data.accounts[0].account_id,
            accountName: plaidResponse.data.accounts[0].name,
            accountType: plaidResponse.data.accounts[0].type,
            available: plaidResponse.data.accounts[0].balances.available,
            currency: plaidResponse.data.accounts[0].balances.iso_currency_code,
            userId: userId,
        });

        return response.status(200).json({
            availble: plaidResponse.data.accounts[0].balances.available,
            currency: plaidResponse.data.accounts[0].balances.iso_currency_code,
            accountName: plaidResponse.data.accounts[0].name,
            accountType: plaidResponse.data.accounts[0].type,
        });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to get auth data" });
    }
}

module.exports = { create_link_token, get_access_token, exchange_public_token, auth };