const fakeApiResObj = JSON.parse(JSON.stringify({ 
  "coins": {
      "42": {
          "btc": 3.56559729,
          "name": "42-coin",
          "rank": 304,
          "ticker": "42",
          "usd": 31813.4
      },
      "611": {
          "btc": 0.00003918,
          "name": "SixEleven",
          "rank": 594,
          "ticker": "611",
          "usd": 0.349614
      },
      "808": {
          "btc": 1e-8,
          "name": "808Coin",
          "rank": 384,
          "ticker": "808",
          "usd": 0.00008
      }
    }
  }))
module.exports = {
  fakeApiResObj
}
