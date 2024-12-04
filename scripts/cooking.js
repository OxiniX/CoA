function calculateCooking() {
    const levelInput = document.getElementById("cooking-level");
    const percentageInput = document.getElementById("cooking-percentage");
    const targetLevelInput = document.getElementById("cooking-target-level");
    const foodSelect = document.getElementById("cooking-food");

    const level = parseInt(levelInput.value);
    const percentage = parseFloat(percentageInput.value);
    const targetLevel = parseInt(targetLevelInput.value);
    const foodXP = parseInt(foodSelect.value);
    const foodName = getSelectedFoodName();

    resetInputStyles([levelInput, percentageInput, targetLevelInput, foodSelect]);

    if (!level || !targetLevel || !foodXP) {
        alert("Please complete all fields.");
        highlightErrors([levelInput, percentageInput, targetLevelInput, foodSelect], [!level, !percentageInput.value, !targetLevel, !foodXP]);
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

    const worldBoost = document.getElementById("cooking-worldBoost").checked ? 50 : 0;
    const otherBoosts = getCookingOtherBoostPercentage();
    const boostedXP = Math.round(foodXP * (1 + worldBoost / 100) * (1 + otherBoosts / 100));
    const inventorySize = ["Anchovies", "Mackerel", "Squid"].includes(foodName) ? 36 : 18;
    const foodNeeded = Math.ceil(xpNeeded / boostedXP);
    const inventoriesNeeded = Math.ceil(foodNeeded / inventorySize);

    const output = document.getElementById("cooking-output");
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

    document.getElementById("cooking-xp-needed").innerHTML = `<strong>XP needed for target:</strong> ${formatNumberWithDots(xpNeeded)}`;
    document.getElementById("cooking-current-xp").innerHTML = `<strong>Current XP:</strong> ${formatNumberWithDots(currentXP)}`;
    document.getElementById("cooking-target-xp").innerHTML = `<strong>Target XP:</strong> ${formatNumberWithDots(targetXP)}`;
    document.getElementById("cooking-food-needed").innerHTML = `<strong>Total ${foodName}'s needed:</strong> ${formatNumberWithDots(foodNeeded)}`;
    document.getElementById("cooking-default-food-xp").innerHTML = `<strong>Default XP per ${foodName}:</strong> ${formatNumberWithDots(foodXP)}`;
    if (boostBreakdown) {
        document.getElementById("cooking-boosted-food-xp").style.display = "block";
        document.getElementById("cooking-boosted-food-xp").innerHTML = `<strong>Boosted XP per ${foodName}:</strong> ${formatNumberWithDots(boostedXP)} (${boostBreakdown})`;
    } else {
        document.getElementById("cooking-boosted-food-xp").style.display = "none";
    }
    document.getElementById("cooking-xp-per-inventory").innerHTML = `<strong>XP per inventory:</strong> ${formatNumberWithDots(boostedXP * inventorySize)}`;
    document.getElementById("cooking-inventories-needed").innerHTML = `<strong>Inventories needed (${inventorySize} per inventory):</strong> ${formatNumberWithDots(inventoriesNeeded)}`;
}

function getCookingOtherBoostPercentage() {
    const tier1to3 = document.getElementById("cooking-tier1to3").checked ? 6 : 0;
    const tier4 = document.getElementById("cooking-tier4").checked ? 12 : 0;
    return tier1to3 + tier4;
}

function getSelectedFoodName() {
    const foodSelect = document.getElementById("cooking-food");
    const selectedIndex = foodSelect.selectedIndex;
    if (selectedIndex > 0) {
        return foodSelect.options[selectedIndex].text.split(" - ")[1];
    }
    return "";
}

function updateFoodSelection(level) {
    const foodSelect = document.getElementById("cooking-food");
    foodSelect.innerHTML = `<option value="" disabled selected>Select Food</option>`;
    cookingXPTable.forEach(f => {
        const option = document.createElement("option");
        option.value = f.xp;
        option.textContent = `Lvl ${f.level} - ${f.food} - (${f.xp} XP/Per)`;
        option.disabled = level < f.level;
        foodSelect.appendChild(option);
    });
    foodSelect.disabled = level <= 0;
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

document.getElementById("cooking-level").addEventListener("input", () => {
    const level = parseInt(document.getElementById("cooking-level").value) || 0;
    updateFoodSelection(level);
});

function handleCookingCheckbox(id) {
    const tier1to3 = document.getElementById("cooking-tier1to3");
    const tier4 = document.getElementById("cooking-tier4");
    if (id === "cooking-tier1to3" && tier1to3.checked) {
        tier4.checked = false;
    } else if (id === "cooking-tier4" && tier4.checked) {
        tier1to3.checked = false;
    }
}

document.getElementById("cooking-tier1to3").addEventListener("change", () => handleCookingCheckbox("cooking-tier1to3"));
document.getElementById("cooking-tier4").addEventListener("change", () => handleCookingCheckbox("cooking-tier4"));
