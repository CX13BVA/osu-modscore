var hasCalculated = false;
var expectedMods = 0;
var modCounts = {
  mods1: 0,
  mods2: 0,
  mods3: 0,
};

function displayResult() {
  var modScore = Object.values(modCounts).reduce(function(acc, cur) {
    return acc
      + Math.log(1 + cur) / Math.log(Math.sqrt(1 + expectedMods))
      - 2 * (1 + expectedMods) / (1 + cur);
  }, 0);
  var resultMod = document.getElementById('result-mod');
  resultMod.innerHTML = modScore.toFixed(4);
}

function handleChange(e) {
  var sourceName = e.target.name;
  var value = parseInt(e.target.value);
  e.target.value = value || '';

  if (sourceName === 'expectedMods') {
    expectedMods = value || 0;
  } else {
    modCounts[sourceName] = value || 0;
  }

  if (hasCalculated) {
    displayResult();
  }
}

function handleSubmit(e) {
  e.preventDefault();

  var resultPanel = document.getElementById('result-panel');
  resultPanel.classList.remove('hidden');

  hasCalculated = true;
  displayResult();
}
