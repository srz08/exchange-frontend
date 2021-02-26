window.onload = function() { 
    var SERVER_URL = "http://127.0.0.1:5000"
    var addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addItem2);


    function fetchRates() {
        fetch(`${SERVER_URL}/exchangeRate`)
        .then(response => response.json())
        .then(data => {
            var usd_to_lbp = data['usd_to_lbp']
            var lbp_to_usd = data['lbp_to_usd']
            document.getElementById("sell-usd-rate").innerHTML = usd_to_lbp + "USD per LBP"
            document.getElementById("buy-usd-rate").innerHTML = lbp_to_usd + "LBP per USD"
       });
      }
    
    function addItem2() {
        var lbp = document.getElementById("lbp-amount").value
        var usd = document.getElementById("usd-amount").value
        var transType = document.getElementById("transaction-type").value
        var trans=1;
        if(transType === "usd-to-lbp") {
            var trans = 0;
        } 
        fetch(`${SERVER_URL}/transaction`, {
            method: 'post', 
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            redirect: 'manual',
            body: JSON.stringify({
                usd_amount: usd, 
                lbp_amount:lbp, 
                usd_to_lbp:trans}),
        })
        fetchRates();
    }
}


  