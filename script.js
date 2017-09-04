var hasCalculated = false;
var values = {
  totalKudosu: 0,
  mods1: 0,
  mods2: 0,
  mods3: 0
};

function displayResult() {
  var kudosuScore = parseInt(300 * Math.log(values.totalKudosu) / Math.log(5));
  var modScore = parseInt(45 * (
    ((Math.log(values.mods1 + 1) / Math.log(2)) - (8 / (values.mods1 + 1))) +
    ((Math.log(values.mods2 + 1) / Math.log(2)) - (8 / (values.mods2 + 1))) +
    ((Math.log(values.mods3 + 1) / Math.log(2)) - (8 / (values.mods3 + 1)))
  ));

  var resultKudosu = document.getElementById('result-kudosu');
  var resultMod = document.getElementById('result-mod');
  var resultBasic = document.getElementById('result-basic');

  resultKudosu.innerHTML = kudosuScore;
  resultMod.innerHTML = modScore;
  resultBasic.innerHTML = kudosuScore + modScore;
}

function handleChange(e) {
  var sourceName = e.target.name;
  var value = parseInt(e.target.value);
  e.target.value = value || '';
  values[sourceName] = value || 0;

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