import apiKey from './api-key.js';
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

import currencies from "./currency-codes.js";

console.log(currencies[0]);

let fromDropDown = document.querySelector("#from-currency-select");
let toDropDown = document.querySelector("#to-currency-select");
let convertButton = document.querySelector("#convert-button");
let result = document.querySelector("#result"); // Select the result element

// Function to populate currencies in dropdown menu
function populateDropdown(dropdown) {
    currencies.forEach(element => {
        let option = document.createElement("option");
        option.value = element; 
        option.textContent = element;
        dropdown.appendChild(option);
    });
}

populateDropdown(fromDropDown);
populateDropdown(toDropDown);

// Setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

convertButton.addEventListener("click", function() {
    let amount = document.querySelector("#amount").value; // Get amount inside the event listener
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if (amount.length != 0) {
        fetch(api)
        .then((resp) => resp.json())
        .then((data) => {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            result.style.textAlign = "center";
            result.style.justifyContent = "center";
            result.style.fontSize = "larger";
            result.style.marginTop = "1em";
            result.style.color = "#02002c";
            result.style.padding = "5px";
            result.style.backgroundColor = "#e5dbff";
            result.style.borderRadius = "1px";
        });
    } else {
        alert("Please fill in a valid amount");
    }
});
