// setup database here, change the values to suit your environment
module.exports = {
  HOST: "localhost",
  USER: "Ghani123",
  PASSWORD: "1234",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
