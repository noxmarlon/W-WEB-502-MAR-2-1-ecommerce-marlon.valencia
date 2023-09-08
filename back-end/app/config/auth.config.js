module.exports = {
    secret: "digital-PACA-secret-key",
    jwtExpiration: 3600, // 1 hour
    jwtRefreshExpiration: 86400, // 24 hours
    /* For tests */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes
};