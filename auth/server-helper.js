import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import { AppError, BadRequestError, DatabaseError, ForbiddenError, InternalServerError, NotFoundError,UnauthorizedError } from '../types'
import { getOauthClient } from './square-client'
import { updateRefreshTokens } from '../lib/database'
import { isString } from './helpers'

export const hashPassword = async (password) => {
    try {
        const saltRounds = 12;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (e) {
        console.error('Error hashing password: ', e);
        throw new InternalServerError('Error hashing password');
    }
};

export const isPasswordCorrect = async (savedHash, passwordAttempt) => {
    try {
        return await bcrypt.compare(passwordAttempt, savedHash);
    } catch (e) {
        console.error('Error comparing password: ', e);
        throw new InternalServerError('Error validating password');
    }
};

// JWT creation using jsonwebtoken
export const createJWT = async (payload) => {
    try {
        if (!process.env.JWT_SIGNING_SECRET) {
            console.error('JWT_SIGNING_SECRET is not set - check .env file');
            throw new InternalServerError('Server Error');
        }

        const token = jwt.sign(payload, process.env.JWT_SIGNING_SECRET, {
            algorithm: 'HS256',
            expiresIn: '7d', // 7 days
        });

        return token;
    } catch (e) {
        console.error('Error creating JWT: ', e);
        throw new InternalServerError('Error creating JWT');
    }
};

// For encrypting and decrypting tokens, we'll use Node.js' built-in `crypto` module with AES-GCM
export const encryptToken = (token) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', process.env.ENCRYPTION_KEY, iv);
    
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    return {
        iv: iv.toString('hex'),
        encrypted,
        authTag
    };
};

export const decryptToken = (encrypted, iv, authTag) => {
    const decipher = crypto.createDecipheriv('aes-256-gcm', process.env.ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
};

export const getAuthUrlValues = () => {
    const codeVerifier = base64Encode(crypto.randomBytes(32));
    const codeChallenge = base64Encode(sha256(codeVerifier));
    const state = base64Encode(crypto.randomBytes(12));
    return {
        squareCodeChallenge: codeChallenge,
        squareCodeVerifier: codeVerifier,
        squareState: state,
        baseURl: process.env.SQUARE_BASE_URL,
        appId: process.env.APP_ID,
    };
};

export const refreshTokens = async ({ id, tokens, iv }) => {
    const { accessToken, refreshToken } = decryptToken(tokens, iv);
    const { oAuthApi } = getOauthClient(accessToken);
    try {
        if (!isString(process.env.APP_ID)) {
            throw new AppError('APP_ID is not set - check .env file');
        }
        const response = await oAuthApi.obtainToken({
            clientId: process.env.APP_ID,
            refreshToken,
            grantType: 'refresh_token',
        });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, expiresAt, merchantId } = response.result;
        await updateRefreshTokens(id, {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresAt,
            merchantId,
        });
    } catch (e) {
        console.error('Error refreshing tokens:', e);
        throw new InternalServerError('Error refreshing tokens');
    }
};

export const deauthorizeToken = async (user, revokeOnlyAccessToken) => {
    if (!user?.squareData?.tokens || !user?.metaData?.iv) {
        throw new AppError('User data error');
    }
    const { accessToken } = decryptToken(user.squareData.tokens, user.metaData.iv);
    const oAuthApi = getOauthClient();
    try {
        const properClientSecret = 'Client ' + process.env.APPLICATION_SECRET;
        const response = await oAuthApi.revokeToken({
            clientId: process.env.APP_ID,
            accessToken,
            revokeOnlyAccessToken,
        }, properClientSecret);
        return response.result;
    } catch (e) {
        console.error('Error deauthorizing token:', e);
        throw new InternalServerError('Error deauthorizing token');
    }
};


export const errorResponse = (res, err) => {
    // Define a default error message
    const defaultMessage = 'An unexpected error occurred';

    // Check if the error is one of the known types
    if (err instanceof BadRequestError ||
        err instanceof UnauthorizedError ||
        err instanceof ForbiddenError ||
        err instanceof NotFoundError ||
        err instanceof DatabaseError ||
        err instanceof InternalServerError) {
        // Use the status code and message from the error instance
        return res.status(err.statusCode).json({
            message: err.message || defaultMessage
        });
    } else {
        // Log the error for server-side visibility
        console.error('Unhandled error:', err);

        // Return a generic error response
        return res.status(500).json({
            message: defaultMessage
        });
    }
};
