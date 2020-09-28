module.exports = {
  devServer: {
    // https: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: 'https://localhost:3009/*'
  }
}