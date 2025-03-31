const fs = require("fs");

export function templateLimitToken() {
  return {
    apiKey_1: { key: process.env.APIKEY_1, number: 10000 },
    apiKey_2: { key: process.env.APIKEY_2, number: 10000 },
    apiKey_3: { key: process.env.APIKEY_3, number: 10000 },
  };
}

const headers = {
  "x-access-token":
    "coinranking4dca18b4fc6f95ee35cd4f07e36fb500f0c6aa66e1972d1f",
};
const headers2 = {
  "x-access-token":
    "coinranking15e62b930c47b275f6645ea9c85c13dc88f9947ac92049a3",
};
const headers3 = {
  "x-access-token":
    "coinrankingecab11b9d919a740887a9989e83b86b90d86c7236f5d56b5",
};

export function checkLimitApiKey(api) {
  fs.w;
}
