const dataFragment = JSON.parse(JSON.stringify({
  Stellar: {
    rank: 7,
    ticker: 'xlm',
  },
  Monero: {
    rank: 10,
    ticker: 'xmr',
  },
  'Bitcoin Cash': {
    rank: 4,
    ticker: 'bch',
  },
  Bytecoin: {
    rank: 23,
    ticker: 'bcn',
  },
  'Ethereum Classic': {
    rank: 13,
    ticker: 'etc',
  },
  Ethereum: {
    rank: 2,
    ticker: 'eth',
  },
}));

function getFragmentSubString() {
  const names = Object.keys(dataFragment);
  const randIndex = Math.floor(Math.random() * names.length);
  const string = names[randIndex];
  const randSplitStart = Math.floor(Math.random() * string.length);
  const randSplitEnd = Math.floor(Math.random() * string.length);
  const subString = string.substring(randSplitStart, randSplitEnd);
  return subString;
}

module.exports = {
  dataFragment,
  getFragmentSubString,
};
