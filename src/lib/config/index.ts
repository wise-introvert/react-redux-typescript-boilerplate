const {
  NODE_ENV = "development"
} = process.env;

export default {
  routes: {
    home: "/home",
    splash: "/",
    login: "/login",
  },
  constants: {
    baseUrl: NODE_ENV === 'development' ? "http://localhost:3001" : "https://production.url",
    rt: "refreshToken",
    at: "authToken"
  }
};
