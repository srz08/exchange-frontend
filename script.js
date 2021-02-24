window.onload = function() { 
    var SERVER_URL = "http://127.0.0.1:5000"
    var addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addItem);
    var sellUsdTransactions = [];
    var buyUsdTransactions = [];
    function addItem() {
        var lbp = document.getElementById("lbp-amount").value
        var usd = document.getElementById("usd-amount").value
        var transType = document.getElementById("transaction-type").value
        var diff = lbp / usd
        if(transType === "usd-to-lbp"){
            sellUsdTransactions.push(diff)
        }
        else {
            buyUsdTransactions.push(diff)
        }
        updateRates();
    }

    function updateRates() {
        var sum1 = 0;
        if(sellUsdTransactions.length != 0 ) {
        for (let value of sellUsdTransactions) {
            sum1 += value;
            }
        var avg1 = sum1 / sellUsdTransactions.length
        document.getElementById("sell-usd-rate").innerHTML = avg1 + " LBP per USD";
        }
        var sum2 = 0;
        if(buyUsdTransactions.length != 0) {
        for (let value of buyUsdTransactions) {
            sum2 += value;
            }
        var avg2 = sum2 / buyUsdTransactions.length
        document.getElementById("buy-usd-rate").innerHTML = avg2 + " USD per LBP";
        }        
    }

    function fetchRates() {
        fetch(`${SERVER_URL}/exchangeRate`)
        .then(response => response.json())
        .then(data => {
            var usd_to_lbp = data['usd_to_lbp']
            var lbp_to_usd = data['lbp_to_usd']
            document.getElementById("sell-usd-rate").innerHTML = usd_to_lbp + "USD per LBP"
            document.getElementById("buy-usd-rate").innerHTML = usd_to_lbp + "LBP per USD"
       });
      }
      fetchRates();
}


  