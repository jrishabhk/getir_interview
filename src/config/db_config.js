const {accessEnv} = require(__app.__helpers.accessEnv);

const config = {
    user    : accessEnv("DB_USER"),
    host    : accessEnv("DB_HOST"),
    database: accessEnv("DB_DATABASE"),
    password: accessEnv("DB_PASSWORD"),
    port    : accessEnv("DB_PORT"),
}
//console.log(config);
module.exports = {config};