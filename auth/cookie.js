const setCookie = (res, name, value, options = {}) => {
    const defaults = {
        httpOnly: true, // Helps prevent XSS attacks
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'lax', // Helps prevent CSRF attacks
        path: '/',
    };

    const finalOptions = { ...defaults, ...options };

    if (finalOptions.maxAge) {
        finalOptions.expires = new Date(Date.now() + finalOptions.maxAge);
        delete finalOptions.maxAge; // Use 'expires' instead of 'maxAge' for compatibility
    }

    const cookieString = Object.entries(finalOptions).reduce((acc, [key, value]) => {
        if (value === true) {
            return `${acc}; ${key}`;
        } else if (value !== false) {
            return `${acc}; ${key}=${value}`;
        }
        return acc;
    }, `${name}=${value}`);

    res.setHeader('Set-Cookie', cookieString);
};

const getCookie = (req, name) => {
    const cookies = req.headers.cookie?.split('; ') || [];
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
};

const clearCookie = (res, name) => {
    setCookie(res, name, '', { maxAge: -1 });
};

export { setCookie, getCookie, clearCookie };
