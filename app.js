const mockUsername = "user";
const mockPassword = "password";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginError = document.getElementById("login-error");

  if (username === mockUsername && password === mockPassword) {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("converter-page").style.display = "block";
    loadCurrencies();
  } else {
    loginError.textContent = "Login failed. Invalid credentials.";
  }
}

function loadCurrencies() {
  const currencyDropdowns = [document.getElementById("from-currency"), document.getElementById("to-currency")];
  const currencies = ["USD", "EUR", "GBP", "INR", "TRY", "JPY", "AUD", "CAD"];

  currencyDropdowns.forEach(dropdown => {
    currencies.forEach(currency => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      dropdown.add(option);
    });
  });
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;
  const resultField = document.getElementById("result");
  const errorMessage = document.getElementById("error-message");

  if (!amount || !fromCurrency || !toCurrency) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  try {
    errorMessage.textContent = "";
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    if (!response.ok) throw new Error("API request failed.");

    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
    resultField.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    errorMessage.textContent = "Conversion failed. Please try again.";
  }
}
