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


const dataFragment = JSON.parse(JSON.stringify({
    "Stellar": {
        "rank": 7,
        "ticker": "xlm"
    },
    "Monero": {
        "rank": 10,
        "ticker": "xmr"
    },
    "Bitcoin Cash": {
        "rank": 4,
        "ticker": "bch"
    },
    "Bytecoin": {
        "rank": 23,
        "ticker": "bcn"
    },
    "Ethereum Classic": {
        "rank": 13,
        "ticker": "etc"
    },
    "Ethereum": {
        "rank": 2,
        "ticker": "eth"
    }
}))

function getFragmentSubString() {
    const names = Object.keys(dataFragment)
    const randIndex = Math.floor(Math.random() * names.length)
    const string = names[randIndex]
    const randSplitStart = Math.floor(Math.random() * string.length)
    const randSplitEnd = Math.floor(Math.random() * string.length)
    const subString = string.substring(randSplitStart, randSplitEnd)
    return subString
}

module.exports = {
  fakeApiResObj,
  dataFragment,
  getFragmentSubString
}
