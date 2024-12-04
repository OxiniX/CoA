function calculateFish() {
    const levelInput = document.getElementById("fishing-level");
    const percentageInput = document.getElementById("fishing-percentage");
    const targetLevelInput = document.getElementById("fishing-target-level");
    const fishSelect = document.getElementById("fish");

    const level = parseInt(levelInput.value);
    const percentage = parseFloat(percentageInput.value);
    const targetLevel = parseInt(targetLevelInput.value);
    const fishXP = parseInt(fishSelect.value);
    const fishName = getSelectedFishName();

    resetInputStyles([levelInput, percentageInput, targetLevelInput, fishSelect]);

    if (!level || !targetLevel || !fishXP) {
        alert("Please complete all fields.");
        highlightErrors([levelInput, percentageInput, targetLevelInput, fishSelect], [!level, !percentageInput.value, !targetLevel, !fishXP]);
        return;
    }

    if (level >= 120) {
        alert("Current level must be below 120.");
        highlightErrors([levelInput], [true]);
        return;
    }

    if (targetLevel > 120) {
        alert("Target level cannot exceed 120.");
        highlightErrors([targetLevelInput], [true]);
        return;
    }

    if (level >= targetLevel) {
        alert("Current level must be lower than target level.");
        highlightErrors([levelInput, targetLevelInput], [true, true]);
        return;
    }

    if (percentage >= 100) {
        alert("Percentage must be below 100%.");
        highlightErrors([percentageInput], [true]);
        return;
    }

    const currentXP = Math.round(
        xpTable[level - 1] + ((xpTable[level] - xpTable[level - 1]) * (percentage / 100))
    );
    const targetXP = Math.round(xpTable[targetLevel - 1]);
    const xpNeeded = targetXP - currentXP;

    const worldBoost = document.getElementById("fishing-worldBoost").checked ? 50 : 0;
    const otherBoosts = getFishingOtherBoostPercentage();
    const boostedXP = Math.round(fishXP * (1 + worldBoost / 100) * (1 + otherBoosts / 100));
    const fishNeeded = Math.ceil(xpNeeded / boostedXP);
    const inventoriesNeeded = Math.ceil(fishNeeded / 35);

    const output = document.getElementById("fishing-output");
    output.style.display = "block";

    let boostBreakdown = "";
    if (worldBoost > 0) {
        boostBreakdown += `+${worldBoost}%`;
        if (otherBoosts > 0) {
            boostBreakdown += ` & +${otherBoosts}%`;
        }
    } else if (otherBoosts > 0) {
        boostBreakdown = `+${otherBoosts}%`;
    }

    document.getElementById("fishing-xp-needed").innerHTML = `<strong>XP needed for target:</strong> ${formatNumberWithDots(xpNeeded)}`;
    document.getElementById("fishing-current-xp").innerHTML = `<strong>Current XP:</strong> ${formatNumberWithDots(currentXP)}`;
    document.getElementById("fishing-target-xp").innerHTML = `<strong>Target XP:</strong> ${formatNumberWithDots(targetXP)}`;
    document.getElementById("fishing-fish-needed").innerHTML = `<strong>Total ${fishName}'s needed:</strong> ${formatNumberWithDots(fishNeeded)}`;
    document.getElementById("fishing-default-fish-xp").innerHTML = `<strong>Default XP per ${fishName}:</strong> ${formatNumberWithDots(fishXP)}`;
    if (boostBreakdown) {
        document.getElementById("fishing-boosted-fish-xp").style.display = "block";
        document.getElementById("fishing-boosted-fish-xp").innerHTML = `<strong>Boosted XP per ${fishName}:</strong> ${formatNumberWithDots(boostedXP)} (${boostBreakdown})`;
    } else {
        document.getElementById("fishing-boosted-fish-xp").style.display = "none";
    }
    document.getElementById("fishing-xp-per-inventory").innerHTML = `<strong>XP per inventory:</strong> ${formatNumberWithDots(boostedXP * 35)}`;
    document.getElementById("fishing-inventories-needed").innerHTML = `<strong>Inventories needed (35 per inventory):</strong> ${formatNumberWithDots(inventoriesNeeded)}`;
}

function getFishingOtherBoostPercentage() {
    const tier1to3 = document.getElementById("fishing-tier1to3").checked ? 6 : 0;
    const tier4 = document.getElementById("fishing-tier4").checked ? 12 : 0;
    return tier1to3 + tier4;
}

function getSelectedFishName() {
    const fishSelect = document.getElementById("fish");
    const selectedIndex = fishSelect.selectedIndex;
    if (selectedIndex > 0) {
        return fishSelect.options[selectedIndex].text.split(" - ")[1];
    }
    return "";
}

function updateFishSelection(level) {
    const fishSelect = document.getElementById("fish");
    fishSelect.innerHTML = `<option value="" disabled selected>Select Fish</option>`;
    fish.forEach(f => {
        const option = document.createElement("option");
        option.value = f.xp;
        option.textContent = `Lvl ${f.level} - ${f.fish} - (${f.xp} XP/Per)`;
        option.disabled = level < f.level;
        fishSelect.appendChild(option);
    });

    fishSelect.disabled = level <= 0;
}

function resetInputStyles(inputs) {
    inputs.forEach(input => {
        input.classList.remove("error-border");
    });
}

function highlightErrors(inputs, errors) {
    inputs.forEach((input, index) => {
        if (errors[index]) {
            input.classList.add("error-border");
        }
    });
}

document.getElementById("fishing-level").addEventListener("input", () => {
    const level = parseInt(document.getElementById("fishing-level").value) || 0;
    updateFishSelection(level);
});

function handleFishingCheckbox(id) {
    const tier1to3 = document.getElementById("fishing-tier1to3");
    const tier4 = document.getElementById("fishing-tier4");

    if (id === "fishing-tier1to3" && tier1to3.checked) {
        tier4.checked = false;
    } else if (id === "fishing-tier4" && tier4.checked) {
        tier1to3.checked = false;
    }
}

document.getElementById("fishing-tier1to3").addEventListener("change", () => handleFishingCheckbox("fishing-tier1to3"));
document.getElementById("fishing-tier4").addEventListener("change", () => handleFishingCheckbox("fishing-tier4"));
