function calculateCrafting() {
    const levelInput = document.getElementById("crafting-level");
    const percentageInput = document.getElementById("crafting-percentage");
    const targetLevelInput = document.getElementById("crafting-target-level");
    const relicsSelect = document.getElementById("crafting-relics");

    const level = parseInt(levelInput.value);
    const percentage = parseFloat(percentageInput.value);
    const targetLevel = parseInt(targetLevelInput.value);
    const relicXP = parseInt(relicsSelect.value);
    const relicName = getSelectedRelicName();

    resetInputStyles([levelInput, percentageInput, targetLevelInput, relicsSelect]);

    if (!level || !targetLevel || !relicXP) {
        alert("Please complete all fields.");
        highlightErrors([levelInput, percentageInput, targetLevelInput, relicsSelect], [!level, !percentageInput.value, !targetLevel, !relicXP]);
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

    const worldBoost = document.getElementById("crafting-worldBoost").checked ? 50 : 0;
    const otherBoosts = getCraftingOtherBoostPercentage();
    const boostedXP = Math.round(relicXP * (1 + worldBoost / 100) * (1 + otherBoosts / 100));
    const inventorySize = ["Relic of Experience", "Ice Relic", "Cursed Relic", "Relic of Affliction"].includes(relicName) ? 18 : 36;
    const relicsNeeded = Math.ceil(xpNeeded / boostedXP);
    const inventoriesNeeded = Math.ceil(relicsNeeded / inventorySize);

    const output = document.getElementById("crafting-output");
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

    document.getElementById("crafting-xp-needed").innerHTML = `<strong>XP needed for target:</strong> ${formatNumberWithDots(xpNeeded)}`;
    document.getElementById("crafting-current-xp").innerHTML = `<strong>Current XP:</strong> ${formatNumberWithDots(currentXP)}`;
    document.getElementById("crafting-target-xp").innerHTML = `<strong>Target XP:</strong> ${formatNumberWithDots(targetXP)}`;
    document.getElementById("crafting-relics-needed").innerHTML = `<strong>Total ${relicName}'s needed:</strong> ${formatNumberWithDots(relicsNeeded)}`;
    document.getElementById("crafting-default-relic-xp").innerHTML = `<strong>Default XP per ${relicName}:</strong> ${formatNumberWithDots(relicXP)}`;
    if (boostBreakdown) {
        document.getElementById("crafting-boosted-relic-xp").style.display = "block";
        document.getElementById("crafting-boosted-relic-xp").innerHTML = `<strong>Boosted XP per ${relicName}:</strong> ${formatNumberWithDots(boostedXP)} (${boostBreakdown})`;
    } else {
        document.getElementById("crafting-boosted-relic-xp").style.display = "none";
    }
    document.getElementById("crafting-xp-per-inventory").innerHTML = `<strong>XP per inventory:</strong> ${formatNumberWithDots(boostedXP * inventorySize)}`;
    document.getElementById("crafting-inventories-needed").innerHTML = `<strong>Inventories needed (${inventorySize} per inventory):</strong> ${formatNumberWithDots(inventoriesNeeded)}`;
}

function getCraftingOtherBoostPercentage() {
    const tier1to3 = document.getElementById("crafting-tier1to3").checked ? 6 : 0;
    const tier4 = document.getElementById("crafting-tier4").checked ? 12 : 0;
    return tier1to3 + tier4;
}

function getSelectedRelicName() {
    const relicsSelect = document.getElementById("crafting-relics");
    const selectedIndex = relicsSelect.selectedIndex;
    if (selectedIndex > 0) {
        return relicsSelect.options[selectedIndex].text.split(" - ")[1];
    }
    return "";
}

function updateRelicSelection(level) {
    const relicsSelect = document.getElementById("crafting-relics");
    relicsSelect.innerHTML = `<option value="" disabled selected>Select Relic</option>`;
    craftingXPTable.forEach(relic => {
        const option = document.createElement("option");
        option.value = relic.xp;
        option.textContent = `Lvl ${relic.level} - ${relic.relic} - (${relic.xp} XP/Per)`;
        option.disabled = level < relic.level;
        relicsSelect.appendChild(option);
    });
    relicsSelect.disabled = level <= 0;
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

document.getElementById("crafting-level").addEventListener("input", () => {
    const level = parseInt(document.getElementById("crafting-level").value) || 0;
    updateRelicSelection(level);
});

function handleCraftingCheckbox(id) {
    const tier1to3 = document.getElementById("crafting-tier1to3");
    const tier4 = document.getElementById("crafting-tier4");
    if (id === "crafting-tier1to3" && tier1to3.checked) {
        tier4.checked = false;
    } else if (id === "crafting-tier4" && tier4.checked) {
        tier1to3.checked = false;
    }
}

document.getElementById("crafting-tier1to3").addEventListener("change", () => handleCraftingCheckbox("crafting-tier1to3"));
document.getElementById("crafting-tier4").addEventListener("change", () => handleCraftingCheckbox("crafting-tier4"));
