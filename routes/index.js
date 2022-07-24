const { default: axios } = require("axios");
var express = require("express");

var router = express.Router();
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
/* GET home page. */
router.get("/", function (req, res, next) {
  axios
    .get("https://api.coinranking.com/v2/coins?limit=100&timePeriod=24h", {
      headers: {
        "x-access-token":
          "coinranking15e62b930c47b275f6645ea9c85c13dc88f9947ac92049a3",
      },
    })
    .then((e) => {
      res.json(e.data);
    });
});
router.get("/news", function (req, res) {
  axios
    .get(
      "https://cryptopanic.com/api/v1/posts/?auth_token=43382aa9b285b15dc486b21e510501bf14c69b1e"
    )
    .then((e) => {
      try {
        res.json(e.data);
      } catch (error) {
        console.log(error);
      }
    });
});
router.get("/likecoin", function (req, res) {
  console.log([].concat(...req.headers.map((doc) => doc.data)));

  // axios
  //   .get(
  //     "https://cryptopanic.com/api/v1/posts/?auth_token=43382aa9b285b15dc486b21e510501bf14c69b1e"
  //   )
  //   .then((e) => {
  //     try {
  //       res.json(e.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
});
router.get("/news", function (req, res) {
  axios
    .get(
      "https://cryptopanic.com/api/v1/posts/?auth_token=43382aa9b285b15dc486b21e510501bf14c69b1e"
    )
    .then((e) => {
      try {
        res.json(e.data);
      } catch (error) {
        console.log(error);
      }
    });
});
router.get("/coin/:id", function (req, res) {
  const id = req.params.id;
  const timestamp = [];

  const resultfinal = {
    infor: {},
    chart: {},
  };
  const result = {
    data: [],
    mindate: 0,
  };
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
    ])
    .then(
      axios.spread((data1, data2) => {
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
        res.json(resultfinal);
      })
    );
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
