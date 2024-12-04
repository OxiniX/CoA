window.calculateSpellbinding = function () {
    const levelInput = document.getElementById("spellbinding-level");
    const percentageInput = document.getElementById("spellbinding-percentage");
    const targetLevelInput = document.getElementById("spellbinding-target-level");
    const tomesSelect = document.getElementById("spellbinding-tomes");
    const itemsSelect = document.getElementById("spellbinding-items");

    const level = parseInt(levelInput.value);
    const percentage = parseFloat(percentageInput.value);
    const targetLevel = parseInt(targetLevelInput.value);
    const selectedTome = parseInt(tomesSelect.value);
    const selectedItem = parseInt(itemsSelect.value);
    const itemXP = selectedTome || selectedItem;
    const itemName = getSelectedItemName(selectedTome, selectedItem);

    resetInputStyles([levelInput, percentageInput, targetLevelInput, tomesSelect, itemsSelect]);

    if (!level || !targetLevel || !itemXP) {
        alert("Please complete all fields.");
        highlightErrors([levelInput, percentageInput, targetLevelInput, tomesSelect, itemsSelect], [!level, !percentageInput.value, !targetLevel, !selectedTome && !selectedItem]);
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

    const worldBoost = document.getElementById("spellbinding-worldBoost").checked ? 50 : 0;
    const otherBoosts = getSpellbindingOtherBoostPercentage();
    const boostedXP = Math.round(itemXP * (1 + worldBoost / 100) * (1 + otherBoosts / 100));
    const inventorySize = getInventorySize(itemName);
    const itemsNeeded = Math.ceil(xpNeeded / boostedXP);
    const inventoriesNeeded = Math.ceil(itemsNeeded / inventorySize);

    const output = document.getElementById("spellbinding-output");
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

    document.getElementById("spellbinding-current-xp").innerHTML = `<strong>Current XP:</strong> ${formatNumberWithDots(currentXP)}`;
    document.getElementById("spellbinding-target-xp").innerHTML = `<strong>Target XP:</strong> ${formatNumberWithDots(targetXP)}`;
    document.getElementById("spellbinding-xp-needed").innerHTML = `<strong>XP Needed:</strong> ${formatNumberWithDots(xpNeeded)}`;
    document.getElementById("spellbinding-items-needed").innerHTML = `<strong>Total ${itemName}s Needed:</strong> ${formatNumberWithDots(itemsNeeded)}`;
    document.getElementById("spellbinding-default-item-xp").innerHTML = `<strong>Default XP per ${itemName}:</strong> ${formatNumberWithDots(itemXP)}`;
    if (boostBreakdown) {
        document.getElementById("spellbinding-boosted-item-xp").style.display = "block";
        document.getElementById("spellbinding-boosted-item-xp").innerHTML = `<strong>Boosted XP per ${itemName}:</strong> ${formatNumberWithDots(boostedXP)} (${boostBreakdown})`;
    } else {
        document.getElementById("spellbinding-boosted-item-xp").style.display = "none";
    }
    document.getElementById("spellbinding-xp-per-inventory").innerHTML = `<strong>XP Per Inventory:</strong> ${formatNumberWithDots(boostedXP * inventorySize)}`;
    document.getElementById("spellbinding-inventories-needed").innerHTML = `<strong>Inventories Needed (${inventorySize} per inventory):</strong> ${formatNumberWithDots(inventoriesNeeded)}`;

    // Materials Calculation
    const materialsOutput = document.getElementById("spellbinding-materials");
    materialsOutput.style.display = "block";

    let totalBooks = 0;
    let totalRelics = 0;
    let totalEssence = 0;
    let otherMaterials = {};

    if (selectedTome) {
        const tomeMaterials = {
            "Paper": { "Pine Logs": 1 },
            "Book": { "Paper": 5, "Leather": 1 },
            "Ember Tome": { "Book": 1, "Relic of Fire": 1, "Magic Essence": 1 },
            "Leech Tome": { "Book": 1, "Relic of Nature": 1, "Magic Essence": 1 },
            "Icicle Tome": { "Book": 1, "Ice Relic": 1, "Magic Essence": 1 },
            "Haunt Tome": { "Book": 1, "Cursed Relic": 1, "Magic Essence": 1 },
            "Ignite Tome": { "Book": 1, "Relic of Fire": 1, "Magic Essence": 5 },
            "Drain Tome": { "Book": 1, "Relic of Nature": 1, "Magic Essence": 3 },
            "Freeze Tome": { "Book": 1, "Ice Relic": 1, "Magic Essence": 3 },
            "Curse Tome": { "Book": 1, "Cursed Relic": 1, "Magic Essence": 3 },
            "Inferno Tome": { "Book": 1, "Relic of Fire": 1, "Magic Essence": 10 },
            "Consume Tome": { "Book": 1, "Relic of Nature": 1, "Magic Essence": 6 },
            "Blizzard Tome": { "Book": 1, "Ice Relic": 1, "Magic Essence": 6 },
            "Torture Tome": { "Book": 1, "Cursed Relic": 1, "Magic Essence": 6 }
        };
        const tomeMaterial = tomeMaterials[itemName];

        if (tomeMaterial) {
            totalBooks = tomeMaterial["Book"] ? tomeMaterial["Book"] * itemsNeeded : 0;
            totalRelics = Object.keys(tomeMaterial).find(key => key.includes("Relic")) ? tomeMaterial[Object.keys(tomeMaterial).find(key => key.includes("Relic"))] * itemsNeeded : 0;
            totalEssence = tomeMaterial["Magic Essence"] ? tomeMaterial["Magic Essence"] * itemsNeeded : 0;

            Object.keys(tomeMaterial).forEach(material => {
                if (!["Book", "Magic Essence"].includes(material) && !material.includes("Relic")) {
                    otherMaterials[material] = (otherMaterials[material] || 0) + tomeMaterial[material] * itemsNeeded;
                }
            });
        }
    } else if (selectedItem) {
        const itemMaterials = {
            "Nightspun Boots": { "Spider Carapace": 4, "Spider Web": 2 },
            "Nightspun Ring": { "Spider Carapace": 3, "Spider Web": 3 },
            "Nightspun Leggings": { "Spider Carapace": 9, "Spider Web": 4 },
            "Nightspun Robes": { "Spider Carapace": 11, "Spider Web": 5 },
            "Nightspun Hood": { "Spider Carapace": 10, "Spider Web": 5 },
            "Nightspun Staff": { "Spider Carapace": 7, "Spider Web": 7 }
        };
        const itemMaterial = itemMaterials[itemName];

        if (itemMaterial) {
            Object.keys(itemMaterial).forEach(material => {
                otherMaterials[material] = (otherMaterials[material] || 0) + itemMaterial[material] * itemsNeeded;
            });
        }
    }

    document.getElementById("spellbinding-total-books").innerHTML = totalBooks ? `<strong>Total Books needed:</strong> ${formatNumberWithDots(totalBooks)}` : "";
    document.getElementById("spellbinding-total-relics").innerHTML = totalRelics ? `<strong>Total Relics needed:</strong> ${formatNumberWithDots(totalRelics)}` : "";
    document.getElementById("spellbinding-total-essence").innerHTML = totalEssence ? `<strong>Total Magic Essence needed:</strong> ${formatNumberWithDots(totalEssence)}` : "";
    document.getElementById("spellbinding-total-other-materials").innerHTML = Object.keys(otherMaterials).length
        ? Object.entries(otherMaterials)
              .map(([key, value]) => `<strong>Total ${key} needed:</strong> ${formatNumberWithDots(value)}`)
              .join("<br>")
        : "";
};

function updateItemSelection(level) {
    const tomesSelect = document.getElementById("spellbinding-tomes");
    const itemsSelect = document.getElementById("spellbinding-items");

    tomesSelect.innerHTML = `<option value="" selected>Select Tome</option>`;
    spellbindingTomesTable.forEach(tome => {
        const option = document.createElement("option");
        option.value = tome.xp;
        option.textContent = `Lvl ${tome.level} - ${tome.name} - (${tome.xp} XP/Per)`;
        option.disabled = level < tome.level;
        tomesSelect.appendChild(option);
    });

    itemsSelect.innerHTML = `<option value="" selected>Select Item</option>`;
    spellbindingItemsTable.forEach(item => {
        const option = document.createElement("option");
        option.value = item.xp;
        option.textContent = `Lvl ${item.level} - ${item.name} - (${item.xp} XP/Per)`;
        option.disabled = level < item.level;
        itemsSelect.appendChild(option);
    });

    tomesSelect.disabled = false;
    itemsSelect.disabled = false;
}

function handleItemSelection(selectType) {
    const tomesSelect = document.getElementById("spellbinding-tomes");
    const itemsSelect = document.getElementById("spellbinding-items");

    if (selectType === "tome") {
        itemsSelect.disabled = true;
    } else if (selectType === "item") {
        tomesSelect.disabled = true;
    } else {
        tomesSelect.disabled = false;
        itemsSelect.disabled = false;
    }
}

function getSelectedItemName(selectedTome, selectedItem) {
    const tomesSelect = document.getElementById("spellbinding-tomes");
    const itemsSelect = document.getElementById("spellbinding-items");

    if (selectedTome) {
        return tomesSelect.options[tomesSelect.selectedIndex].text.split(" - ")[1];
    } else if (selectedItem) {
        return itemsSelect.options[itemsSelect.selectedIndex].text.split(" - ")[1];
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

function getSpellbindingOtherBoostPercentage() {
    const tier1to3 = document.getElementById("spellbinding-tier1to3").checked ? 6 : 0;
    const tier4 = document.getElementById("spellbinding-tier4").checked ? 12 : 0;
    return tier1to3 + tier4;
}

function getInventorySize(itemName) {
    if (["Nightspun Hood", "Nightspun Staff"].includes(itemName)) return 6;
    if (["Nightspun Robes", "Nightspun Leggings"].includes(itemName)) return 2;
    if (itemName === "Turmoil of Nydarax") return 31;
    return 33;
}

function formatNumberWithDots(num) {
    return num.toLocaleString("en-US");
}

// Event Listeners
document.getElementById("spellbinding-level").addEventListener("input", () => {
    const level = parseInt(document.getElementById("spellbinding-level").value) || 0;
    if (level > 0) {
        updateItemSelection(level);
    }
});

document.getElementById("spellbinding-tomes").addEventListener("change", (event) => {
    if (event.target.value === "") {
        handleItemSelection(null);
    } else {
        handleItemSelection("tome");
    }
});

document.getElementById("spellbinding-items").addEventListener("change", (event) => {
    if (event.target.value === "") {
        handleItemSelection(null);
    } else {
        handleItemSelection("item");
    }
});

document.getElementById("spellbinding-tier1to3").addEventListener("change", () => handleCheckboxChange("spellbinding-tier1to3"));
document.getElementById("spellbinding-tier4").addEventListener("change", () => handleCheckboxChange("spellbinding-tier4"));

function handleCheckboxChange(id) {
    const tier1to3Checkbox = document.getElementById("spellbinding-tier1to3");
    const tier4Checkbox = document.getElementById("spellbinding-tier4");

    if (id === "spellbinding-tier1to3" && tier1to3Checkbox.checked) {
        tier4Checkbox.checked = false;
    } else if (id === "spellbinding-tier4" && tier4Checkbox.checked) {
        tier1to3Checkbox.checked = false;
    }
}
