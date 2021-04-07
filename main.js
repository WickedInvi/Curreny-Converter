// Move API key to dotenv (find how to use)
// Find what is wrong with map why cannot values
const convertFromSymbolDropdown = document.getElementById(
  'convertFromSymbol'
);
const convertToSymbolDropdown = document.getElementById(
  'convertToSymbol'
);

const convertFromInput = document.getElementById('convertFromInput');

const button = document.getElementById('myButton');
const para = document.getElementById('para');

const API = 'cf5570aca1a0930080f1b8088c40fcd6';

let displayText = () => {
  para.innerHTML = convertFromInput.value;
};

const convertionRatesList = new Map();

fetch(`http://data.fixer.io/api/latest?access_key=${API}`)
  .then((res) => res.json())
  .then((data) => {
    Object.entries(data.rates).forEach(([key, value]) => {
      let newToOptionElement = document.createElement('option');

      newToOptionElement.text = key;
      convertToSymbol.add(newToOptionElement);

      convertToSymbol.selectedIndex = 0;

      convertionRatesList.set(key, value);
    });
    console.log(convertionRatesList);
  })
  .then();

let convert = () => {
  let convertFromSymbol = convertFromSymbolDropdown.value;
  let convertToSymbol = convertToSymbolDropdown.value;

  let convertFromInputValue = convertFromInput.value;

  let convertToRate = convertionRatesList.get(convertToSymbol);

  let result = (convertFromInputValue * convertToRate).toFixed(2);
  if (isNaN(convertFromInputValue)) {
    para.innerHTML = 'Invalid value. Please enter a number';
  } else if (convertFromInputValue == '') {
    para.innerHTML = 'No value entered.';
  } else {
    para.innerHTML = `${convertFromInputValue} EUR at rate of conversion of ${convertToRate.toFixed(
      2
    )} is ${convertToSymbol}:${result}`;
  }
};

button.addEventListener('click', convert);
