const plaidClient = require("../plaid/config");
const { db } = require("../firebase/config");
const { addDoc, collection } = require("firebase/firestore");


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
    const { publicToken } = request.body;
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
    const { public_token } = request.body;
    try {
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
            public_token: public_token
        });

        const accessToken = plaidResponse.data.access_token;
   
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


const get_transactions = async function (request, response) {
    const { access_token, userId } = request.body;
    console.log("ACCESS TOKEN", access_token);
    const plaidRequest = {
        access_token: access_token,
        start_date: '2018-01-01',
        end_date: '2022-12-11'
    };
    try {
        const plaidResponse = await plaidClient.transactionsGet(plaidRequest);
        let transactions = plaidResponse.data.transactions;
        const total_transactions = plaidResponse.data.total_transactions;
        
        while (transactions.length < total_transactions) {
            const paginatedRequest = {
                access_token: access_token,
                start_date: '2018-01-01',
                end_date: '2020-02-01',
                options: {
                    offset: transactions.length
                },
            };
            const paginatedResponse = await plaidClient.transactionsGet(paginatedRequest);
            transactions = transactions.concat(
                paginatedResponse.data.transactions,
            );
        }

        console.log('transactions', 
            transactions[0].amount,
            transactions[0].date,
            transactions[0].name,
            transactions[0].category[0],
        );
    
        let count = 0;
        while (count < 3) {
            await addDoc(collection(db, "transactions"), {
                userId,
                amount: transactions[count].amount,
                date: transactions[count].date,
                name: transactions[count].name,
                category: transactions[count].category[0],
            });
            count++;
        }

        return response.status(200).json({ transaction: transactions[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Failed to get transactions" });
    }
};



module.exports = { create_link_token, get_access_token, exchange_public_token, auth, get_transactions };