window.calculateSmithing = function () {
    const levelInput = document.getElementById("smithing-level");
    const percentageInput = document.getElementById("smithing-percentage");
    const targetLevelInput = document.getElementById("smithing-target-level");
    const barsSelect = document.getElementById("smithing-bars");
    const gearSelect = document.getElementById("smithing-gear");

    const level = parseInt(levelInput.value);
    const percentage = parseFloat(percentageInput.value);
    const targetLevel = parseInt(targetLevelInput.value);
    const selectedBar = parseInt(barsSelect.value);
    const selectedGear = parseInt(gearSelect.value);
    const itemXP = selectedBar || selectedGear;
    const itemName = getSelectedSmithingItemName(selectedBar, selectedGear);

    resetInputStyles([levelInput, percentageInput, targetLevelInput, barsSelect, gearSelect]);

    if (!level || !targetLevel || !itemXP) {
        alert("Please complete all fields.");
        highlightErrors([levelInput, percentageInput, targetLevelInput, barsSelect, gearSelect], [!level, !percentageInput.value, !targetLevel, !selectedBar && !selectedGear]);
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

    const worldBoost = document.getElementById("smithing-worldBoost").checked ? 50 : 0;
    const otherBoosts = getSmithingOtherBoostPercentage();
    const infernalBoosts = getSmithingInfernalBoostPercentage();
    const boostedXP = Math.round(itemXP * (1 + worldBoost / 100) * (1 + (otherBoosts + infernalBoosts) / 100));
    const inventorySize = getSmithingInventorySize(itemName);
    const itemsNeeded = Math.ceil(xpNeeded / boostedXP);
    const inventoriesNeeded = Math.ceil(itemsNeeded / inventorySize);

    const materialsNeeded = calculateSmithingMaterials(itemName, itemsNeeded);

    const output = document.getElementById("smithing-output");
    output.style.display = "block";

    let boostBreakdown = "";
    if (worldBoost > 0) {
        boostBreakdown += `+${worldBoost}%`;
        if (otherBoosts > 0 || infernalBoosts > 0) {
            boostBreakdown += ` & +${otherBoosts + infernalBoosts}%`;
        }
    } else if (otherBoosts > 0 || infernalBoosts > 0) {
        boostBreakdown = `+${otherBoosts + infernalBoosts}%`;
    }

    document.getElementById("smithing-current-xp").innerHTML = `<strong>Current XP:</strong> ${formatNumberWithDots(currentXP)}`;
    document.getElementById("smithing-target-xp").innerHTML = `<strong>Target XP:</strong> ${formatNumberWithDots(targetXP)}`;
    document.getElementById("smithing-xp-needed").innerHTML = `<strong>XP Needed:</strong> ${formatNumberWithDots(xpNeeded)}`;
    document.getElementById("smithing-items-needed").innerHTML = `<strong>Total ${itemName}s Needed:</strong> ${formatNumberWithDots(itemsNeeded)}`;
    document.getElementById("smithing-default-item-xp").innerHTML = `<strong>Default XP per ${itemName}:</strong> ${formatNumberWithDots(itemXP)}`;
    if (boostBreakdown) {
        document.getElementById("smithing-boosted-item-xp").style.display = "block";
        document.getElementById("smithing-boosted-item-xp").innerHTML = `<strong>Boosted XP per ${itemName}:</strong> ${formatNumberWithDots(boostedXP)} (${boostBreakdown})`;
    } else {
        document.getElementById("smithing-boosted-item-xp").style.display = "none";
    }
    document.getElementById("smithing-materials-needed").style.display = "block";
    document.getElementById("smithing-materials-needed").innerHTML = `<strong>Materials Needed:</strong> ${materialsNeeded}`;
};

function calculateSmithingMaterials(itemName, itemsNeeded) {
    const materialsTable = itemName.includes("Bar") ? smithingBarsMaterials : smithingMaterialsTable;
    const materials = materialsTable.find(material => material.name === itemName || material.bar === itemName);
    if (!materials) {
        if (itemName === "Naturite") {
            return `${formatNumberWithDots(itemsNeeded)} Naturite`;
        }
        if (itemName === "Gold Nugget") {
            return `${formatNumberWithDots(itemsNeeded * 16)} Gold Ore`;
        }
        return "No materials found.";
    }
    const materialBreakdown = Object.entries(materials.materials)
        .map(([name, amount]) => `${formatNumberWithDots(amount * itemsNeeded)} ${name}`)
        .join(" & ");
    return materialBreakdown;
}

function getSmithingInventorySize(itemName) {
    if (itemName === "Naturite") return 100;
    if (itemName === "Gold Nugget") return 16;
    return 33;
}

// Keep other unchanged functions



function updateSmithingItemSelection(level) {
    const barsSelect = document.getElementById("smithing-bars");
    const gearSelect = document.getElementById("smithing-gear");

    if (level > 0) {
        barsSelect.innerHTML = `<option value="" selected>Select Bar</option>`;
        smithingBarsTable.forEach(bar => {
            const option = document.createElement("option");
            option.value = bar.xp;
            option.textContent = `Lvl ${bar.level} - ${bar.name} - (${bar.xp} XP/Per)`;
            option.disabled = level < bar.level;
            barsSelect.appendChild(option);
        });

        gearSelect.innerHTML = `<option value="" selected>Select Gear</option>`;
        smithingGearTable.forEach(gear => {
            const option = document.createElement("option");
            option.value = gear.xp;
            option.textContent = `Lvl ${gear.level} - ${gear.name} - (${gear.xp} XP/Per)`;
            option.disabled = level < gear.level;
            gearSelect.appendChild(option);
        });
    } else {
        barsSelect.innerHTML = `<option value="" selected>Select Bar - First enter your current level</option>`;
        gearSelect.innerHTML = `<option value="" selected>Select Gear - First enter your current level</option>`;
    }

    barsSelect.disabled = level <= 0;
    gearSelect.disabled = level <= 0;
}

document.getElementById("smithing-level").addEventListener("input", () => {
    const level = parseInt(document.getElementById("smithing-level").value) || 0;
    updateSmithingItemSelection(level);
});

document.getElementById("smithing-bars").addEventListener("change", (event) => {
    if (event.target.value === "") {
        handleSmithingItemSelection(null);
    } else {
        handleSmithingItemSelection("bar");
    }
});

document.getElementById("smithing-gear").addEventListener("change", (event) => {
    if (event.target.value === "") {
        handleSmithingItemSelection(null);
    } else {
        handleSmithingItemSelection("gear");
    }
});

function handleSmithingItemSelection(selectType) {
    const barsSelect = document.getElementById("smithing-bars");
    const gearSelect = document.getElementById("smithing-gear");

    if (selectType === "bar") {
        gearSelect.disabled = true;
    } else if (selectType === "gear") {
        barsSelect.disabled = true;
    } else {
        barsSelect.disabled = false;
        gearSelect.disabled = false;
    }
}

// Checkbox logic
document.getElementById("smithing-tier1to3").addEventListener("change", () => handleCheckboxChange("smithing-tier1to3"));
document.getElementById("smithing-tier4").addEventListener("change", () => handleCheckboxChange("smithing-tier4"));

function handleCheckboxChange(id) {
    const tier1to3Checkbox = document.getElementById("smithing-tier1to3");
    const tier4Checkbox = document.getElementById("smithing-tier4");

    if (id === "smithing-tier1to3" && tier1to3Checkbox.checked) {
        tier4Checkbox.checked = false;
    } else if (id === "smithing-tier4" && tier4Checkbox.checked) {
        tier1to3Checkbox.checked = false;
    }
}

function getSelectedSmithingItemName(selectedBar, selectedGear) {
    const barsSelect = document.getElementById("smithing-bars");
    const gearSelect = document.getElementById("smithing-gear");

    if (selectedBar) {
        return barsSelect.options[barsSelect.selectedIndex].text.split(" - ")[1];
    } else if (selectedGear) {
        return gearSelect.options[gearSelect.selectedIndex].text.split(" - ")[1];
    }
    return "";
}

function resetInputStyles(inputs) {
    inputs.forEach(input => input.classList.remove("error-border"));
}

function highlightErrors(inputs, errors) {
    inputs.forEach((input, index) => {
        if (errors[index]) {
            input.classList.add("error-border");
        }
    });
}

function getSmithingOtherBoostPercentage() {
    const tier1to3 = document.getElementById("smithing-tier1to3").checked ? 6 : 0;
    const tier4 = document.getElementById("smithing-tier4").checked ? 12 : 0;
    return tier1to3 + tier4;
}

function getSmithingInfernalBoostPercentage() {
    const infernalRing = document.getElementById("smithing-infernalRing").checked ? 4 : 0;
    const infernalHammer = document.getElementById("smithing-infernalHammer").checked ? 4 : 0;
    return infernalRing + infernalHammer;
}

function getSmithingInventorySize(itemName) {
    if (itemName === "Naturite") return 1;
    return 33;
}

function formatNumberWithDots(num) {
    return num.toLocaleString("en-US");
}
