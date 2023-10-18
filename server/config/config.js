require('dotenv').config({ path: '.env' });

module.exports = {
    jwtSecret: 'supercalifragilisticoespialidoso',
    db: process.env.DB_URL
};