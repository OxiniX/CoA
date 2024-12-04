function calculateWoodcutting() {
    const levelInput = document.getElementById("woodcutting-level");
    const percentageInput = document.getElementById("woodcutting-percentage");
    const targetLevelInput = document.getElementById("woodcutting-target-level");
    const logsSelect = document.getElementById("woodcutting-logs");

    const level = parseInt(levelInput.value);
    const percentage = parseFloat(percentageInput.value);
    const targetLevel = parseInt(targetLevelInput.value);
    const logsXP = parseInt(logsSelect.value);
    const logsName = getSelectedLogsName();

    resetInputStyles([levelInput, percentageInput, targetLevelInput, logsSelect]);

    if (!level || !targetLevel || !logsXP) {
        alert("Please complete all fields.");
        highlightErrors([levelInput, percentageInput, targetLevelInput, logsSelect], [!level, !percentageInput.value, !targetLevel, !logsXP]);
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

    const worldBoost = document.getElementById("woodcutting-worldBoost").checked ? 50 : 0;
    const otherBoosts = getWoodcuttingOtherBoostPercentage();
    const boostedXP = Math.round(logsXP * (1 + worldBoost / 100) * (1 + otherBoosts / 100));
    const inventorySize = 36;
    const logsNeeded = Math.ceil(xpNeeded / boostedXP);
    const inventoriesNeeded = Math.ceil(logsNeeded / inventorySize);

    const output = document.getElementById("woodcutting-output");
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

    document.getElementById("woodcutting-xp-needed").innerHTML = `<strong>XP needed for target:</strong> ${formatNumberWithDots(xpNeeded)}`;
    document.getElementById("woodcutting-current-xp").innerHTML = `<strong>Current XP:</strong> ${formatNumberWithDots(currentXP)}`;
    document.getElementById("woodcutting-target-xp").innerHTML = `<strong>Target XP:</strong> ${formatNumberWithDots(targetXP)}`;
    document.getElementById("woodcutting-logs-needed").innerHTML = `<strong>Total ${logsName}'s needed:</strong> ${formatNumberWithDots(logsNeeded)}`;
    document.getElementById("woodcutting-default-logs-xp").innerHTML = `<strong>Default XP per ${logsName}:</strong> ${formatNumberWithDots(logsXP)}`;
    if (boostBreakdown) {
        document.getElementById("woodcutting-boosted-logs-xp").style.display = "block";
        document.getElementById("woodcutting-boosted-logs-xp").innerHTML = `<strong>Boosted XP per ${logsName}:</strong> ${formatNumberWithDots(boostedXP)} (${boostBreakdown})`;
    } else {
        document.getElementById("woodcutting-boosted-logs-xp").style.display = "none";
    }
    document.getElementById("woodcutting-xp-per-inventory").innerHTML = `<strong>XP per inventory:</strong> ${formatNumberWithDots(boostedXP * inventorySize)}`;
    document.getElementById("woodcutting-inventories-needed").innerHTML = `<strong>Inventories needed (36 per inventory):</strong> ${formatNumberWithDots(inventoriesNeeded)}`;
}

function getWoodcuttingOtherBoostPercentage() {
    const tier1to3 = document.getElementById("woodcutting-tier1to3").checked ? 6 : 0;
    const tier4 = document.getElementById("woodcutting-tier4").checked ? 12 : 0;
    return tier1to3 + tier4;
}

function getSelectedLogsName() {
    const logsSelect = document.getElementById("woodcutting-logs");
    const selectedIndex = logsSelect.selectedIndex;
    if (selectedIndex > 0) {
        return logsSelect.options[selectedIndex].text.split(" - ")[1];
    }
    return "";
}

function updateLogsSelection(level) {
    const logsSelect = document.getElementById("woodcutting-logs");
    logsSelect.innerHTML = `<option value="" disabled selected>Select Logs</option>`;
    woodcuttingXPTable.forEach(log => {
        const option = document.createElement("option");
        option.value = log.xp;
        option.textContent = `Lvl ${log.level} - ${log.logs} - (${log.xp} XP/Per)`;
        option.disabled = level < log.level;
        logsSelect.appendChild(option);
    });
    logsSelect.disabled = level <= 0;
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

document.getElementById("woodcutting-level").addEventListener("input", () => {
    const level = parseInt(document.getElementById("woodcutting-level").value) || 0;
    updateLogsSelection(level);
});

function handleWoodcuttingCheckbox(id) {
    const tier1to3 = document.getElementById("woodcutting-tier1to3");
    const tier4 = document.getElementById("woodcutting-tier4");
    if (id === "woodcutting-tier1to3" && tier1to3.checked) {
        tier4.checked = false;
    } else if (id === "woodcutting-tier4" && tier4.checked) {
        tier1to3.checked = false;
    }
}

document.getElementById("woodcutting-tier1to3").addEventListener("change", () => handleWoodcuttingCheckbox("woodcutting-tier1to3"));
document.getElementById("woodcutting-tier4").addEventListener("change", () => handleWoodcuttingCheckbox("woodcutting-tier4"));
