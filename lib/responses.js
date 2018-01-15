const build_response = ( body, statusCode = 200, headers = {} ) => {

  headers = Object.assign({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },headers)

  return {
    statusCode,
    headers,
    body,
  }
}

module.exports.success = ( body, statusCode = 200, headers = {} ) => build_response(body,statusCode,headers)

module.exports.failure = ( body, statusCode = 500, headers = {} ) => build_response(body,statusCode,headers)
