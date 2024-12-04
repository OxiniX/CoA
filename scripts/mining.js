function calculateOres() {
    const levelInput = document.getElementById("mining-level");
    const percentageInput = document.getElementById("mining-percentage");
    const targetLevelInput = document.getElementById("mining-target-level");
    const oreSelect = document.getElementById("mining-ore");

    const level = parseInt(levelInput.value);
    const percentage = parseFloat(percentageInput.value);
    const targetLevel = parseInt(targetLevelInput.value);
    const oreXP = parseInt(oreSelect.value);
    const oreName = getSelectedOreName();

    resetInputStyles([levelInput, percentageInput, targetLevelInput, oreSelect]);

    if (!level || !targetLevel || !oreXP) {
        alert("Please complete all fields.");
        highlightErrors([levelInput, percentageInput, targetLevelInput, oreSelect], [!level, !percentageInput.value, !targetLevel, !oreXP]);
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

    const worldBoost = document.getElementById("mining-worldBoost").checked ? 50 : 0;
    const otherBoosts = getMiningOtherBoostPercentage();
    const boostedXP = Math.round(oreXP * (1 + worldBoost / 100) * (1 + otherBoosts / 100));
    const oresNeeded = Math.ceil(xpNeeded / boostedXP);
    const inventoriesNeeded = oreName === "Naturite" ? Math.ceil(oresNeeded / 100) : Math.ceil(oresNeeded / 36);

    const output = document.getElementById("mining-output");
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

    document.getElementById("mining-xp-needed").innerHTML = `<strong>XP needed for target:</strong> ${formatNumberWithDots(xpNeeded)}`;
    document.getElementById("mining-current-xp").innerHTML = `<strong>Current XP:</strong> ${formatNumberWithDots(currentXP)}`;
    document.getElementById("mining-target-xp").innerHTML = `<strong>Target XP:</strong> ${formatNumberWithDots(targetXP)}`;
    document.getElementById("mining-ores-needed").innerHTML = `<strong>Total ${oreName}'s needed:</strong> ${formatNumberWithDots(oresNeeded)}`;
    document.getElementById("mining-default-ore-xp").innerHTML = `<strong>Default XP per ${oreName}:</strong> ${formatNumberWithDots(oreXP)}`;
    if (boostBreakdown) {
        document.getElementById("mining-boosted-ore-xp").style.display = "block";
        document.getElementById("mining-boosted-ore-xp").innerHTML = `<strong>Boosted XP per ${oreName}:</strong> ${formatNumberWithDots(boostedXP)} (${boostBreakdown})`;
    } else {
        document.getElementById("mining-boosted-ore-xp").style.display = "none";
    }
    document.getElementById("mining-xp-per-inventory").innerHTML = `<strong>XP per inventory:</strong> ${formatNumberWithDots(boostedXP * (oreName === "Naturite" ? 100 : 36))}`;
    document.getElementById("mining-inventories-needed").innerHTML = `<strong>Inventories needed (${oreName === "Naturite" ? "100" : "36"} per inventory):</strong> ${formatNumberWithDots(inventoriesNeeded)}`;
}

function getMiningOtherBoostPercentage() {
    const tier1to3 = document.getElementById("mining-tier1to3").checked ? 6 : 0;
    const tier4 = document.getElementById("mining-tier4").checked ? 12 : 0;
    const prospectorsNecklace = document.getElementById("mining-prospectorsNecklace").checked ? 4 : 0;
    return tier1to3 + tier4 + prospectorsNecklace;
}

function getSelectedOreName() {
    const oreSelect = document.getElementById("mining-ore");
    const selectedIndex = oreSelect.selectedIndex;
    if (selectedIndex > 0) {
        return oreSelect.options[selectedIndex].text.split(" - ")[1];
    }
    return "";
}

function updateOreSelection(level) {
    const oreSelect = document.getElementById("mining-ore");
    oreSelect.innerHTML = `<option value="" disabled selected>Select Ore</option>`;
    ores.forEach(ore => {
        const option = document.createElement("option");
        option.value = ore.xp;
        option.textContent = `Lvl ${ore.level} - ${ore.ore} - (${ore.xp} XP/Per)`;
        option.disabled = level < ore.level;
        oreSelect.appendChild(option);
    });

    oreSelect.disabled = !level;
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

document.getElementById("mining-level").addEventListener("input", () => {
    const level = parseInt(document.getElementById("mining-level").value) || 0;
    updateOreSelection(level);
});

function handleMiningCheckbox(id) {
    const tier1to3 = document.getElementById("mining-tier1to3");
    const tier4 = document.getElementById("mining-tier4");

    if (id === "mining-tier1to3" && tier1to3.checked) {
        tier4.checked = false;
    } else if (id === "mining-tier4" && tier4.checked) {
        tier1to3.checked = false;
    }
}

document.getElementById("mining-tier1to3").addEventListener("change", () => handleMiningCheckbox("mining-tier1to3"));
document.getElementById("mining-tier4").addEventListener("change", () => handleMiningCheckbox("mining-tier4"));
