module.exports = (function(){
  return {
    ERROR_415: function(){
      return {
        message: "Unsupported content type request. Supported types are 'text/xml', 'text/html', 'application/json'",
        status: 415,
        timestamp: new Date().toLocaleString()
      }
    },
    ERROR_404: function(){
      return {
        message: "Resource not found.",
        status: 404,
        timestamp: new Date().toLocaleString()
      }
    },
    ERROR_401: function(){
      return {
        message: "Access Denied.",
        status: 401,
        timestamp: new Date().toLocaleString()
      }
    },
    ERROR_500: function(raw){
      return {
        message: "Internal Server Error",
        status: 500,
        timestamp: new Date().toLocaleString()
      }
    }
  }
})();
