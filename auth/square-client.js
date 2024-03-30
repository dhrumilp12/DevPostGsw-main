import { Client, Environment } from 'square';
import { isString } from './helpers';

/**
 * This instance of the Square client is specifically for the OAuth flow.
 * We use this instance to obtain an access token and a refresh token for our application.
 */
export const getOauthClient = () => {
    if (!isString(process.env.ENVIRONMENT) || !isString(process.env.SQUARE_CLIENT_ID)) {
        console.error('ENVIRONMENT and SQUARE_CLIENT_ID must be set in your .env');
        throw new Error('Server Error');
    }

    const client = new Client({
        environment: process.env.ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
        oauthClientId: process.env.SQUARE_CLIENT_ID,
    });

    return client.oAuthApi;
};

/**
 * This instance of the Square client is specifically for making calls to Square after
 * we have authorized a user, and we have an access token for them.
 */
export const getUserClient = (accessToken) => {
    if (!isString(accessToken)) {
        console.error('Access token is required to create a user client');
        throw new Error('Access token is missing');
    }

    const client = new Client({
        accessToken,
        environment: process.env.ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
    });

    return {
        locationsApi: client.locationsApi,
        merchantsApi: client.merchantsApi,
        oAuthApi: client.oAuthApi,
        ordersApi: client.ordersApi,
    };
};
