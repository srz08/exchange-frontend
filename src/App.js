import "./App.css";
import { useState, useEffect } from "react";


function App() {
  let [buyUsdRate, setBuyUsdRate] = useState(null);
  let [sellUsdRate, setSellUsdRate] = useState(null);
  let [lbpInput, setLbpInput] = useState("");
  let [usdInput, setUsdInput] = useState("");
  let [transactionType, setTransactionType] = useState("usd-to-lbp");

  var SERVER_URL = "http://127.0.0.1:5000";

  function fetchRates() {
    try {
      fetch(`${SERVER_URL}/exchangeRate`)
        .then(response => response.json())
        .then(data => {
          setSellUsdRate(data["usd_to_lbp"] + " LBP/USD");
          setBuyUsdRate(data["lbp_to_usd"] + " LBP/USD");
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function addItem() {
    var boolChoice = 0;
    if (transactionType === "usd-to-lbp") {
      boolChoice = 1;
    }
    await fetch(`${SERVER_URL}/transaction`, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      redirect: "manual",
      body: JSON.stringify({
        usd_amount: usdInput,
        lbp_amount: lbpInput,
        usd_to_lbp: boolChoice
      })
    });
    fetchRates();
  }

  useEffect(fetchRates, []);

  return (
    <div>
      <div class="header">
        <h1>LBP Exchange Tracker</h1>
      </div>
      <div className="wrapper">
        <h2>Today's Exchange Rate</h2>
        <p>LBP to USD Exchange Rate</p>
        <h3>
          Buy USD:{" "}
          <span id="buy-usd-rate">
            {buyUsdRate == null ? "Not Available Yet" : buyUsdRate}
          </span>
        </h3>
        <h3>
          Sell USD:{" "}
          <span id="sell-usd-rate">
            {sellUsdRate == null ? "Not Available Yet" : sellUsdRate}
          </span>
        </h3>
        <hr />
        <h2>Record a recent transaction</h2>
        <form name="transaction-entry">
          <div className="amount-input">
            <label htmlFor="lbp-amount">LBP Amount</label>
            <input
              className="amount-box"
              id="lbp-amount"
              type="number"
              value={lbpInput}
              onChange={e => setLbpInput(e.target.value)}
            />
            <label htmlFor="usd-amount">USD Amount</label>
            <input
              className="amount-box"
              id="usd-amount"
              type="number"
              value={usdInput}
              onChange={e => setUsdInput(e.target.value)}
            />
            <select
              id="transaction-type"
              onChange={e => setTransactionType(e.target.value)}
            >
              <option value="usd-to-lbp">USD to LBP</option>
              <option value="lbp-to-usd">LBP to USD</option>
            </select>
            <button
              id="add-button"
              className="button"
              type="button"
              onClick={addItem}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;