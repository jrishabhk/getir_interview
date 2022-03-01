const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path : path.dirname(__dirname) + '/../.env'});

const cache = {};

const accessEnv = (key, defaultValue) => {
  if (!(key in process.env)) {
    console.log(process.env);
    if (defaultValue) 
        return defaultValue;
    throw new Error(`${key} not found in process.env!`);
  }

  if (cache[key]) return cache[key];

  cache[key] = process.env[key];

  return process.env[key];
};

module.exports.accessEnv = accessEnv;