var hasCalculated = false;
var expectedMods = 0;
var modCounts = {
    mods1: 0,
    mods2: 0,
    mods3: 0,
};

function displayResult() {
    const modScore = Object.values(modCounts).reduce(function(acc, cur) {
        return acc
            + Math.log(1 + cur) / Math.log(Math.sqrt(1 + expectedMods))
            - 2 * (1 + expectedMods) / (1 + cur);
    }, 0);
    const resultMod = document.getElementById('result-mod');
    resultMod.innerHTML = modScore.toFixed(2);
}

function handleChange(e) {
    const sourceName = e.target.name;
    const value = parseInt(e.target.value);
    e.target.value = value || '';

    if (sourceName === 'expectedMods') {
        expectedMods = value || 0;
    } else {
        modCounts[sourceName] = value || 0;
    }

    if (hasCalculated) {
        displayResult();
        trackEvent('resubmit');
    }
}

function handleSubmit(e) {
    e.preventDefault();

    const resultPanel = document.getElementById('result-panel');
    resultPanel.classList.remove('hidden');

    hasCalculated = true;
    displayResult();
    trackEvent('submit');
}

function trackEvent(action) {
    const { mods1, mods2, mods3 } = modCounts;
    gtag('event', action, {
        event_category: 'modscore',
        event_label: `${expectedMods}_${mods1}_${mods2}_${mods3}`,
    });
}
