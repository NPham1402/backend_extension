const { default: axios } = require("axios");
const { kMaxLength } = require("buffer");
var express = require("express");
const fs = require("fs");

var router = express.Router();
/* GET home page. */
// setInterval(() => {
//   axios
//     .all([
//       axios.get(
//         "https://api.coinranking.com/v2/coins?limit=100&timePeriod=24h",
//         {
//           headers: {
//             "x-access-token":
//               "coinranking15e62b930c47b275f6645ea9c85c13dc88f9947ac92049a3",
//           },
//         }
//       ),
//       axios.get(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=43382aa9b285b15dc486b21e510501bf14c69b1e"
//       ),
//     ])
//     .then(
//       axios.spread((coin, news) => {
//         console.log(coin);
//         fs.writeFileSync("Data_list_coin.json", JSON.stringify(coin.data));
//         fs.writeFileSync("Data_new.json", JSON.stringify(news.data));
//       })
//     );
//   // .then((e) => {
//   //   console.log("run");
//   //   fs.writeFileSync("Data_list_coin.json", JSON.stringify(e.data));
//   // })
//   // .catch((err) => {
//   //   console.log(err);
//   // });
// }, 2 * 60 * 60 * 1000);
router.get("/", function (req, res, next) {
  const { currency } = req.headers;
  axios
    .all([
      axios.get(
        "https://openapiv1.coinstats.app/coins?limit=100&currency=" + currency,
        {
          headers: {
            "X-API-KEY": process.env.APIKEY_COINLIST,
          },
        }
      ),
      axios.get("https://openapiv1.coinstats.app/news", {
        headers: {
          "X-API-KEY": process.env.APIKEY_COINLIST,
        },
      }),
    ])
    .then(
      axios.spread((coin, news) => {
        res.status(200).json({ coinData: coin.data, newData: news.data });
      })
    )
    .finally(() => {});
});

router.get("/search", function (req, res, next) {
  const { currency, coin_string } = req.headers;
  axios
    .get(
      "https://openapiv1.coinstats.app/coins?limit=5&currency=" +
        currency +
        "&name=" +
        coin_string,
      {
        headers: {
          "X-API-KEY": process.env.APIKEY_SEARCH,
        },
      }
    )
    .then((coin) => {
      res.status(200).json({ coinData: coin.data });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
});
router.get("/checkApi", function (req, res, next) {
  res.status(200).json({ status: "Success" });
});

router.get("/news/source", function (req, res) {
  axios
    .get("https://openapiv1.coinstats.app/news/sources", {
      headers: {
        "X-API-KEY": process.env.APIKEY_SEARCH,
      },
    })
    .then((data) => {
      res.json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: "err" });
    });
});

router.get("/news/types", function (req, res) {
  const { types } = req.header;
  let tempVariableTypes = "";
  if (!types) {
    tempVariableTypes = "trending";
  } else {
    tempVariableTypes = types;
  }
  axios
    .get("https://openapiv1.coinstats.app/news/type/" + tempVariableTypes, {
      headers: {
        "X-API-KEY": process.env.APIKEY_SEARCH,
      },
    })
    .then((data) => {
      res.json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: err });
    });
});

router.get("/callspamblocker/news", function (req, res) {
  axios
    .get(
      "https://newsapi.org/v2/everything?q=spa&apiKey=3a2b177358fd4577b507c7923486b29f",
      {
        headers: { authorization: "spambl0ckerAuthorization2k1rbyp0wer" },
      }
    )
    .then((data) => {
      res.json(data.data.articles);
    });
});

// router.get("/likecoin", function (req, res) {
//   console.log([].concat(...req.headers.map((doc) => doc.data)));

//   // axios
//   //   .get(
//   //     "https://cryptopanic.com/api/v1/posts/?auth_token=43382aa9b285b15dc486b21e510501bf14c69b1e"
//   //   )
//   //   .then((e) => {
//   //     try {
//   //       res.json(e.data);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   });
// });

router.get("/coin/detail", function (req, res) {
  const { id } = req.headers;
  axios
    .get("https://openapiv1.coinstats.app/coins/" + id, {
      headers: {
        "X-API-KEY": process.env.APIKEY_COINLIST,
      },
    })
    .then((value) => {
      const { data } = value;
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ err: err });
    });
});

router.get("/coin/chart", function (req, res) {
  const { id, period } = req.headers;
  const periodsTemp = !period ? "all" : period;
  axios
    .get(
      "https://openapiv1.coinstats.app/coins/" +
        id +
        "/charts?period=" +
        periodsTemp,
      {
        headers: {
          "X-API-KEY": process.env.APIKEY_SEARCH,
        },
      }
    )
    .then((value) => {
      const { data } = value;
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ err: err });
    });
});

router.get("/resgiter", function (req, res) {
  axios
    .get("https://openapiv1.coinstats.app/fiats", {
      headers: {
        "X-API-KEY": process.env.APIKEY_COINLIST,
      },
    })
    .then((value) => {
      const { data } = value;
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ err: err });
    });
});

router.get("/currency/infor", function (req, res) {
  axios
    .get("https://openapiv1.coinstats.app/fiats", {
      headers: {
        "X-API-KEY": process.env.APIKEY_COINLIST,
      },
    })
    .then((value) => {
      const { data } = value;
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ err: err });
    });
});

router.get("/coin/:id", function (req, res) {
  const id = req.params.id;
  const timestamp = [];

  const resultfinal = {
    infor: {},
    chart: {},
    news: {},
  };
  const result = {
    data: [],
    mindate: 0,
  };
  try {
    axios
      .all([
        axios.get("https://api.coinranking.com/v2/coin/" + id, {
          headers: {
            "x-access-token":
              "coinranking4dca18b4fc6f95ee35cd4f07e36fb500f0c6aa66e1972d1f",
          },
        }),
        axios.get(
          " https://api.coinranking.com/v2/coin/" +
            id +
            "/history?timePeriod=all",
          {
            headers: {
              "x-access-token":
                "coinrankingecab11b9d919a740887a9989e83b86b90d86c7236f5d56b5",
            },
          }
        ),
        axios.get(
          "https://cryptopanic.com/api/v1/posts/?auth_token=f64c65903be4071cde0759ad80e39a43be78e94d&currencies=" +
            req.headers.id
        ),
      ])
      .then(
        axios.spread((data1, data2, data3) => {
          resultfinal.infor = data1.data;
          data2.data.data.history.forEach((element) => {
            if (element.price == null) {
              console.log("err");
            } else {
              timestamp.push(element.timestamp);
              result.data.push([
                element.timestamp * 1000,
                parseFloat(element.price).toFixed(2),
              ]);
            }
          });
          result.mindate = Math.min(...timestamp);
          resultfinal.chart = result;
          resultfinal.news = data3.data;
          res.json(resultfinal);
        })
      );
  } catch (error) {
    console.log(err);
  }
});
// router.get("/coin/:id", function (req, res, next) {
//   const id = req.params.id;
//   const resultfinal = {
//     infor: {},
//     chart: {},
//   };
//   console.log(id);
//   try {
//     axios
//       .get("https://api.coinranking.com/v2/coin/" + id, {
//         headers: {
//           "x-access-token":
//             "coinranking4dca18b4fc6f95ee35cd4f07e36fb500f0c6aa66e1972d1f",
//         },
//       })
//       .then((e) => {
//         const infor = e.data;
//         resultfinal.infor = e.data;
//         axios
//           .get(
//             " https://api.coinranking.com/v2/coin/" +
//               id +
//               "/history?timePeriod=all",
//             {
//               headers: {
//                 "x-access-token":
//                   "coinrankingecab11b9d919a740887a9989e83b86b90d86c7236f5d56b5",
//               },
//             }
//           )
//           .then((es) => {
//             const infor2 = es.data;
//             const result = {
//               mindate: "",
//               maxdate: "",
//               data: [],
//             };
//             // infor2.data.history.filter((element) => {
//             //   timestamp.push(element.timestamp);
//             //   result.data.push([
//             //     element.timestamp * 1000,
//             //     parseFloat(element.price).toFixed(2),
//             //   ]);
//             // });
//             infor2.data.history.forEach((element) => {
//               if (element.price == null) {
//                 console.log("err");
//               } else {
//                 timestamp.push(element.timestamp);
//                 result.data.push([
//                   element.timestamp * 1000,
//                   parseFloat(element.price).toFixed(2),
//                 ]);
//               }
//             });
//             result.mindate = Math.min(...timestamp);
//             resultfinal.chart = result;
//             res.json(resultfinal);
//           });
//       });
//   } catch (error) {
//     console.log(err);
//   }
// });

module.exports = router;
