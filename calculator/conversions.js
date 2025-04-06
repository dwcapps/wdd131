function createConverter(type, id1, id2, forwardFn, reverseFn) {
  const mainElement = document.querySelector("main");
  let template = createConverterHTML(type, id1, id2);
  mainElement.insertAdjacentHTML("beforeend", template);

  const input1 = document.getElementById(id1);
  const input2 = document.getElementById(id2);

  input1.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = parseFloat(input1.value);
      input2.value = isNaN(value) ? '' : forwardFn(value).toFixed(4);
    }
  });

  input2.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = parseFloat(input2.value);
      input1.value = isNaN(value) ? '' : reverseFn(value).toFixed(4);
    }
  });
}


function createConverterHTML(type, unit1, unit2) {
  return `<div class="converter">
<h2>${type}</h2>
<input type="number" id="${unit1}" placeholder="Enter ${unit1}" />
<label for="${unit1}">${unit1.charAt(0).toUpperCase() + unit1.slice(1)
    }</label>
<span>=</span>
<input type="number" id="${unit2}" placeholder="Enter ${unit2}" />
<label for="${unit2}">${unit2.charAt(0).toUpperCase() + unit2.slice(1)
    }</label>
</div>`
}

// Dynamically Create Converters

createConverter(
  "Distance",
  "miles", "kilometers",
  miles => miles * 1.60934,
  km => km / 1.60934
);

createConverter(
  "Temperature",
  "fahrenheit", "celsius",
  f => (f - 32) * 5 / 9,
  c => (c * 9 / 5) + 32
);

createConverter(
  "Weight",
  "pounds", "kilograms",
  lb => lb * 0.453592,
  kg => kg / 0.453592
);

createConverter(
  "Length",
  "inches", "centimeters",
  inches => inches * 2.54,
  cm => cm / 2.54
);

createConverter(
  "Volume",
  "gallons", "liters",
  gal => gal * 3.78541,
  l => l / 3.78541
);

createConverter(
  "Speed",
  "mph", "kph",
  mph => mph * 1.60934,
  kph => kph / 1.60934
);