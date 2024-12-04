const xpTable = [
    0, 46, 99, 159, 229, 309, 401, 507, 628, 768, 928, 1112, 1324, 1567, 1847, 2168,
    2537, 2961, 3448, 4008, 4651, 5389, 6237, 7212, 8332, 9618, 11095, 12792, 14742,
    16982, 19555, 22510, 25905, 29805, 34285, 39431, 45342, 52132, 59932, 68892,
    79184, 91006, 104586, 120186, 138106, 158690, 182335, 209496, 240696, 276536,
    317705, 364996, 419319, 481720, 553400, 635738, 730320, 838966, 963768, 1107128,
    1271805, 1460969, 1678262, 1927866, 2214586, 2543940, 2922269, 3356855, 3856063,
    4429503, 5088212, 5844870, 6714042, 7712459, 8859339, 10176758, 11690075, 13428420,
    15425254, 17719014, 20353852, 23380486, 26857176, 30850844, 35438364, 40708040,
    46761308, 53714688, 61702024, 70877064, 81416417, 93522954, 107429714, 123404386,
    141754466, 162833172, 187046247, 214859767, 246809111, 283509271, 325666684,
    374092835, 429719875, 493618564, 567018884, 651333710, 748186012, 859440093,
    987237472, 1134038112, 1302667765, 1496372370, 1718880532, 1974475291, 2268076571,
    2605335878, 2992745089, 3437761413, 3948950932, 4536153492
];

// Mining
const ores = [
    { level: 1, ore: "Tin/Copper Ore", xp: 10 },
    { level: 10, ore: "Iron Ore", xp: 50 },
    { level: 15, ore: "Salt", xp: 80 },
    { level: 20, ore: "Coal", xp: 115 },
    { level: 25, ore: "Silver Ore", xp: 135 },
    { level: 30, ore: "Crimsteel Ore", xp: 350 },
    { level: 40, ore: "Gold Ore", xp: 400 },
    { level: 45, ore: "Pink Salt", xp: 500 },
    { level: 50, ore: "Mythan Ore", xp: 650 },
    { level: 55, ore: "Sandstone", xp: 1100 },
    { level: 60, ore: "Cobalt Ore", xp: 1200 },
    { level: 70, ore: "Varaxium", xp: 1800 },
    { level: 75, ore: "Black Salt", xp: 2500 },
    { level: 80, ore: "Magic Ore", xp: 3200 },
    { level: 85, ore: "Naturite", xp: 7500 }
];

// Fishing
const fish = [
    { level: 1, fish: "Anchovies", xp: 10 },
    { level: 5, fish: "Goldfish", xp: 20 },
    { level: 10, fish: "Mackerel", xp: 50 },
    { level: 20, fish: "Squid", xp: 115 },
    { level: 30, fish: "Sardine", xp: 375 },
    { level: 40, fish: "Eel", xp: 500 },
    { level: 45, fish: "Anglerfish", xp: 625 },
    { level: 50, fish: "Trout", xp: 750 },
    { level: 55, fish: "Jellyfish", xp: 900 },
    { level: 60, fish: "Bass", xp: 1350 },
    { level: 65, fish: "Herringbone", xp: 1700 },
    { level: 70, fish: "Tuna", xp: 2000 },
    { level: 75, fish: "Lobster", xp: 3500 },
    { level: 80, fish: "Sea Turtle", xp: 6500 },
    { level: 85, fish: "Manta Ray", xp: 9500 },
    { level: 90, fish: "Shark", xp: 14500 },
    { level: 95, fish: "Orca", xp: 29500 },
    { level: 100, fish: "Giant Squid", xp: 55000 }
];

// Cooking
const cookingXPTable = [
    { level: 1, food: "Anchovies", xp: 10 },
    { level: 10, food: "Mackerel", xp: 50 },
    { level: 20, food: "Squid", xp: 115 },
    { level: 30, food: "Sardine", xp: 375 },
    { level: 40, food: "Eel", xp: 500 },
    { level: 45, food: "Anglerfish", xp: 625 },
    { level: 50, food: "Trout", xp: 750 },
    { level: 60, food: "Bass", xp: 1350 },
    { level: 70, food: "Tuna", xp: 2000 },
    { level: 75, food: "Lobster", xp: 3500 },
    { level: 80, food: "Sea Turtle", xp: 6500 },
    { level: 85, food: "Manta Ray", xp: 9500 },
    { level: 90, food: "Shark", xp: 13500 },
    { level: 95, food: "Orca", xp: 22500 },
    { level: 100, food: "Giant Squid", xp: 41500 }
];

// Woodcutting
const woodcuttingXPTable = [
    { level: 1, logs: "Pine Logs", xp: 10 },
    { level: 5, logs: "Dead Logs", xp: 20 },
    { level: 10, logs: "Birch Logs", xp: 50 },
    { level: 20, logs: "Applewood", xp: 115 },
    { level: 30, logs: "Willow Logs", xp: 350 },
    { level: 40, logs: "Oak Logs", xp: 475 },
    { level: 50, logs: "Chestnut Logs", xp: 650 },
    { level: 60, logs: "Maple Logs", xp: 1200 },
    { level: 70, logs: "Olive Logs", xp: 1800 },
    { level: 80, logs: "Magic Log", xp: 5000 },
    { level: 85, logs: "Palm Wood", xp: 7250 },
    { level: 90, logs: "Pearwood", xp: 9000 },
    { level: 95, logs: "Lime Wood", xp: 14500 }
];

// Crafting
const craftingXPTable = [
    { level: 1, relic: "Relic of Accuracy", xp: 3 },
    { level: 5, relic: "Relic of Guarding", xp: 8 },
    { level: 10, relic: "Relic of Healing", xp: 18 },
    { level: 20, relic: "Relic of Wealth", xp: 40 },
    { level: 30, relic: "Relic of Power", xp: 105 },
    { level: 40, relic: "Relic of Nature", xp: 200 },
    { level: 50, relic: "Relic of Fire", xp: 425 },
    { level: 60, relic: "Relic of Damage", xp: 900 },
    { level: 70, relic: "Relic of Leeching", xp: 1400 },
    { level: 75, relic: "Relic of Experience", xp: 1850 },
    { level: 80, relic: "Ice Relic", xp: 2750 },
    { level: 81, relic: "Cursed Relic", xp: 3125 },
    { level: 85, relic: "Relic of Efficiency", xp: 4250 },
    { level: 90, relic: "Relic of Affliction", xp: 6000 },
];

// Spellbinding
const spellbindingTomesTable = [
    { level: 1, name: "Paper", xp: 1 },
    { level: 3, name: "Book", xp: 5 },
    { level: 5, name: "Ember Tome", xp: 12 },
    { level: 9, name: "Leech Tome", xp: 20 },
    { level: 15, name: "Icicle Tome", xp: 28 },
    { level: 20, name: "Haunt Tome", xp: 40 },
    { level: 29, name: "Ignite Tome", xp: 100 },
    { level: 33, name: "Drain Tome", xp: 115 },
    { level: 40, name: "Freeze Tome", xp: 200 },
    { level: 60, name: "Curse Tome", xp: 900 },
    { level: 68, name: "Inferno Tome", xp: 1380 },
    { level: 76, name: "Consume Tome", xp: 2110 },
    { level: 80, name: "Blizzard Tome", xp: 2750 },
    { level: 92, name: "Torture Tome", xp: 4300 },
];

const spellbindingItemsTable = [
    { level: 60, name: "Nightspun Boots", xp: 5000 },
    { level: 61, name: "Nightspun Ring", xp: 5000 },
    { level: 62, name: "Nightspun Leggings", xp: 5000 },
    { level: 63, name: "Nightspun Robes", xp: 5000 },
    { level: 64, name: "Nightspun Hood", xp: 5000 },
    { level: 65, name: "Nightspun Staff", xp: 5000 },
    { level: 77, name: "Turmoil of Nydarax", xp: 30000 },
];

// Smithing
const smithingBarsTable = [
    { level: 1, name: "Bronze Bar", xp: 3 },
    { level: 10, name: "Iron Bar", xp: 8 },
    { level: 20, name: "Steel Bar", xp: 14 },
    { level: 30, name: "Crimsteel Bar", xp: 25 },
    { level: 35, name: "Silver Bar", xp: 50 },
    { level: 40, name: "Gold Nugget", xp: 60 },
    { level: 40, name: "Gold Bar", xp: 60 },
    { level: 50, name: "Mythan Bar", xp: 100 },
    { level: 60, name: "Cobalt Bar", xp: 200 },
    { level: 70, name: "Varaxite Bar", xp: 350 },
    { level: 80, name: "Magic Bar", xp: 400 },
    { level: 85, name: "Naturite", xp: 5000 }
];

const smithingBarsMaterials = [
    { level: 1, bar: "Bronze Bar", materials: { "Copper Ore": 2, "Tin Ore": 2 }, xp: 3 },
    { level: 10, bar: "Iron Bar", materials: { "Iron Ore": 2 }, xp: 8 },
    { level: 20, bar: "Steel Bar", materials: { "Iron Ore": 2, "Coal": 1 }, xp: 14 },
    { level: 30, bar: "Crimsteel Bar", materials: { "Crimsteel Ore": 2, "Coal": 2 }, xp: 25 },
    { level: 35, bar: "Silver Bar", materials: { "Silver Ore": 4 }, xp: 50 },
    { level: 40, bar: "Gold Nugget", materials: { "Gold Ore": 16 }, xp: 60 },
    { level: 40, bar: "Gold Bar", materials: { "Gold Nugget": 20 }, xp: 60 },
    { level: 50, bar: "Mythan Bar", materials: { "Mythan Ore": 10, "Coal": 5 }, xp: 100 },
    { level: 60, bar: "Cobalt Bar", materials: { "Cobalt Ore": 8, "Coal": 5 }, xp: 200 },
    { level: 70, bar: "Varaxite Bar", materials: { "Varaxium": 6, "Cobalt Ore": 3 }, xp: 350 },
    { level: 80, bar: "Magic Bar", materials: { "Magic Ore": 9 }, xp: 400 },
    { level: 85, bar: "Naturite", materials: { "Naturite": 1 }, xp: 5000 },
];


const smithingGearTable = [
    // Bronze Bar Equipment
    { level: 1, name: "Bronze Pickaxe", bars: 3, xp: 15 },
    { level: 1, name: "Bronze Cap", bars: 3, xp: 15 },
    { level: 2, name: "Bronze Axe", bars: 3, xp: 15 },
    { level: 3, name: "Bronze Gauntlets", bars: 4, xp: 20 },
    { level: 3, name: "Bronze Boots", bars: 4, xp: 20 },
    { level: 3, name: "Bronze Sword", bars: 4, xp: 20 },
    { level: 5, name: "Bronze Shield", bars: 5, xp: 25 },
    { level: 6, name: "Bronze Reel", bars: 3, xp: 15 },
    { level: 6, name: "Bronze Chainbody", bars: 4, xp: 20 },
    { level: 7, name: "Bronze Platelegs", bars: 5, xp: 25 },
    { level: 8, name: "Bronze Platebody", bars: 7, xp: 35 },

    // Iron Bar Equipment
    { level: 10, name: "Iron Pickaxe", bars: 3, xp: 42 },
    { level: 10, name: "Iron Spade", bars: 3, xp: 50 },
    { level: 11, name: "Iron Cap", bars: 3, xp: 42 },
    { level: 12, name: "Iron Boots", bars: 4, xp: 56 },
    { level: 13, name: "Iron Gauntlets", bars: 4, xp: 56 },
    { level: 13, name: "Iron Sword", bars: 4, xp: 56 },
    { level: 14, name: "Iron Axe", bars: 3, xp: 42 },
    { level: 15, name: "Iron Chainbody", bars: 5, xp: 70 },
    { level: 15, name: "Iron Shield", bars: 5, xp: 70 },
    { level: 16, name: "Iron Reel", bars: 3, xp: 42 },
    { level: 16, name: "Iron Platelegs", bars: 5, xp: 70 },
    { level: 18, name: "Iron Platebody", bars: 6, xp: 84 },

    // Steel Bar Equipment
    { level: 20, name: "Steel Pickaxe", bars: 4, xp: 80 },
    { level: 21, name: "Steel Cap", bars: 4, xp: 80 },
    { level: 22, name: "Steel Boots", bars: 4, xp: 80 },
    { level: 23, name: "Steel Gauntlets", bars: 4, xp: 80 },
    { level: 23, name: "Rusty Steel Sword", bars: 4, xp: 80 },
    { level: 23, name: "Steel Sword", bars: 5, xp: 100 },
    { level: 24, name: "Steel Axe", bars: 4, xp: 80 },
    { level: 25, name: "Steel Chainbody", bars: 4, xp: 80 },
    { level: 25, name: "Steel Shield", bars: 6, xp: 120 },
    { level: 26, name: "Steel Reel", bars: 4, xp: 80 },
    { level: 26, name: "Steel Platelegs", bars: 5, xp: 100 },
    { level: 28, name: "Steel Platebody", bars: 6, xp: 120 },

    // Crimsteel Bar Equipment
    { level: 30, name: "Crimsteel Pickaxe", bars: 4, xp: 520 },
    { level: 30, name: "Crimsteel Spade", bars: 3, xp: 650 },
    { level: 31, name: "Crimsteel Cap", bars: 4, xp: 520 },
    { level: 32, name: "Crimsteel Boots", bars: 4, xp: 520 },
    { level: 33, name: "Crimsteel Gauntlets", bars: 4, xp: 520 },
    { level: 33, name: "Crimsteel Sword", bars: 5, xp: 650 },
    { level: 34, name: "Crimsteel Axe", bars: 4, xp: 520 },
    { level: 35, name: "Crimsteel Helm", bars: 5, xp: 650 },
    { level: 35, name: "Crimsteel Shield", bars: 6, xp: 780 },
    { level: 36, name: "Crimsteel Reel", bars: 4, xp: 520 },
    { level: 36, name: "Crimsteel Chainbody", bars: 5, xp: 650 },
    { level: 37, name: "Crimsteel Platelegs", bars: 5, xp: 650 },
    { level: 38, name: "Crimsteel Platebody", bars: 6, xp: 780 },

    // Silver Bar Equipment
    { level: 35, name: "Sapphire Necklace", bars: 4, xp: 4080 },
    { level: 35, name: "Ruby Necklace", bars: 4, xp: 4080 },
    { level: 35, name: "Arosite Necklace", bars: 4, xp: 4080 },
    { level: 35, name: "Emerald Necklace", bars: 4, xp: 4080 },
    { level: 35, name: "Snake Charm", bars: 2, xp: 2000 },

    // Gold Bar Equipment
    { level: 40, name: "Gold Boots", bars: 1, xp: 20000 },
    { level: 40, name: "Gold Platelegs", bars: 4, xp: 80000 },
    { level: 40, name: "Ring of Treasure", bars: 2, xp: 40000 },
    { level: 40, name: "Ruby Sword", bars: 3, xp: 60000 },
    { level: 40, name: "Ruby Platebody", bars: 5, xp: 100000 },
    { level: 40, name: "Ruby Helm", bars: 8, xp: 160000 },
    { level: 40, name: "Sapphire Sword", bars: 3, xp: 60000 },
    { level: 40, name: "Sapphire Platebody", bars: 5, xp: 100000 },
    { level: 40, name: "Sapphire Helm", bars: 8, xp: 160000 },
    { level: 40, name: "Arosite Sword", bars: 3, xp: 60000 },
    { level: 40, name: "Arosite Platebody", bars: 5, xp: 100000 },
    { level: 40, name: "Arosite Helm", bars: 8, xp: 160000 },
    { level: 40, name: "Magnetite Necklace", bars: 2, xp: 4080 },
    { level: 50, name: "Battle Necklace", bars: 4, xp: 4500 },

    // Mythan Bar Equipment
    { level: 45, name: "Mythan Spade", bars: 5, xp: 45000 },
    { level: 50, name: "Mythan Boots", bars: 5, xp: 25000 },
    { level: 51, name: "Mythan Sword", bars: 5, xp: 25000 },
    { level: 52, name: "Mythan Pickaxe", bars: 6, xp: 30000 },
    { level: 53, name: "Mythan Axe", bars: 6, xp: 30000 },
    { level: 54, name: "Mythan Helm", bars: 10, xp: 50000 },
    { level: 55, name: "Sharper Mythan Sword", bars: 10, xp: 50000 },
    { level: 55, name: "Mythan Shield", bars: 6, xp: 30000 },
    { level: 56, name: "Mythan Reel", bars: 6, xp: 30000 },
    { level: 56, name: "Mythan Platelegs", bars: 11, xp: 55000 },
    { level: 57, name: "Mythan Platebody", bars: 13, xp: 65000 },
    { level: 58, name: "Chaotic Mythan Sword", bars: 25, xp: 125000 },

    // Cobalt Bar Equipment
    { level: 60, name: "Cobalt Boots", bars: 7, xp: 105000 },
    { level: 61, name: "Cobalt Sword", bars: 16, xp: 240000 },
    { level: 62, name: "Cobalt Pickaxe", bars: 10, xp: 150000 },
    { level: 63, name: "Cobalt Gauntlets", bars: 7, xp: 105000 },
    { level: 63, name: "Cobalt Axe", bars: 10, xp: 150000 },
    { level: 64, name: "Cobalt Helm", bars: 12, xp: 180000 },
    { level: 65, name: "Cobalt Shield", bars: 17, xp: 255000 },
    { level: 66, name: "Cobalt Reel", bars: 10, xp: 150000 },
    { level: 66, name: "Cobalt Platelegs", bars: 12, xp: 180000 },
    { level: 67, name: "Cobalt Platebody", bars: 14, xp: 210000 },

    // Varaxite Bar Equipment
    { level: 70, name: "Varaxite Gauntlets", bars: 7, xp: 140000 },
    { level: 70, name: "Varaxite Boots", bars: 7, xp: 140000 },
    { level: 71, name: "Varaxite Sword", bars: 16, xp: 320000 },
    { level: 72, name: "Varaxite Pickaxe", bars: 7, xp: 140000 },
    { level: 73, name: "Varaxite Axe", bars: 7, xp: 140000 },
    { level: 73, name: "Varaxite Helm", bars: 10, xp: 200000 },
    { level: 74, name: "Varaxite Platelegs", bars: 11, xp: 220000 },
    { level: 75, name: "Varaxite Platebody", bars: 12, xp: 240000 },
    { level: 75, name: "Varaxite Shield", bars: 17, xp: 340000 },
    { level: 76, name: "Varaxite Reel", bars: 7, xp: 140000 },

    // Magic Bar Equipment
    { level: 82, name: "Magic Pickaxe", bars: 10, xp: 250000 },
    { level: 83, name: "Magic Axe", bars: 10, xp: 250000 },
    { level: 86, name: "Magic Reel", bars: 7, xp: 175000 }
];

const smithingMaterialsTable = [
    // Bronze Bar Materials
    { name: "Bronze Pickaxe", materials: { "Bronze Bar": 3, "Pine Logs": 1 } },
    { name: "Bronze Cap", materials: { "Bronze Bar": 3 } },
    { name: "Bronze Axe", materials: { "Bronze Bar": 3, "Pine Logs": 1 } },
    { name: "Bronze Gauntlets", materials: { "Bronze Bar": 4 } },
    { name: "Bronze Boots", materials: { "Bronze Bar": 4 } },
    { name: "Bronze Sword", materials: { "Bronze Bar": 4 } },
    { name: "Bronze Shield", materials: { "Bronze Bar": 5 } },
    { name: "Bronze Reel", materials: { "Bronze Bar": 3, Thread: 3 } },
    { name: "Bronze Chainbody", materials: { "Bronze Bar": 4 } },
    { name: "Bronze Platelegs", materials: { "Bronze Bar": 5 } },
    { name: "Bronze Platebody", materials: { "Bronze Bar": 7 } },

    // Iron Bar Materials
    { name: "Iron Pickaxe", materials: { "Iron Bar": 3, "Birch Logs": 1 } },
    { name: "Iron Spade", materials: { "Iron Bar": 3, "Birch Logs": 1 } },
    { name: "Iron Cap", materials: { "Iron Bar": 3 } },
    { name: "Iron Boots", materials: { "Iron Bar": 4 } },
    { name: "Iron Gauntlets", materials: { "Iron Bar": 4 } },
    { name: "Iron Sword", materials: { "Iron Bar": 4 } },
    { name: "Iron Axe", materials: { "Iron Bar": 3, "Birch Logs": 1 } },
    { name: "Iron Chainbody", materials: { "Iron Bar": 5 } },
    { name: "Iron Shield", materials: { "Iron Bar": 5 } },
    { name: "Iron Reel", materials: { "Iron Bar": 3, Thread: 3 } },
    { name: "Iron Platelegs", materials: { "Iron Bar": 5 } },
    { name: "Iron Platebody", materials: { "Iron Bar": 6 } },

    // Steel Bar Materials
    { name: "Steel Pickaxe", materials: { "Steel Bar": 4, Applewood: 1 } },
    { name: "Steel Cap", materials: { "Steel Bar": 4 } },
    { name: "Steel Boots", materials: { "Steel Bar": 4 } },
    { name: "Steel Gauntlets", materials: { "Steel Bar": 4 } },
    { name: "Rusty Steel Sword", materials: { "Steel Bar": 4 } },
    { name: "Steel Sword", materials: { "Steel Bar": 5 } },
    { name: "Steel Axe", materials: { "Steel Bar": 4, Applewood: 1 } },
    { name: "Steel Chainbody", materials: { "Steel Bar": 4 } },
    { name: "Steel Shield", materials: { "Steel Bar": 6 } },
    { name: "Steel Reel", materials: { "Steel Bar": 4, Thread: 3 } },
    { name: "Steel Platelegs", materials: { "Steel Bar": 5 } },
    { name: "Steel Platebody", materials: { "Steel Bar": 6 } },

    // Crimsteel Bar Materials
    { name: "Crimsteel Pickaxe", materials: { "Crimsteel Bar": 4, "Willow Logs": 1 } },
    { name: "Crimsteel Spade", materials: { "Crimsteel Bar": 3, "Willow Logs": 1 } },
    { name: "Crimsteel Cap", materials: { "Crimsteel Bar": 4 } },
    { name: "Crimsteel Boots", materials: { "Crimsteel Bar": 4 } },
    { name: "Crimsteel Gauntlets", materials: { "Crimsteel Bar": 4 } },
    { name: "Crimsteel Sword", materials: { "Crimsteel Bar": 5 } },
    { name: "Crimsteel Axe", materials: { "Crimsteel Bar": 4, "Willow Logs": 1 } },
    { name: "Crimsteel Helm", materials: { "Crimsteel Bar": 5 } },
    { name: "Crimsteel Shield", materials: { "Crimsteel Bar": 6 } },
    { name: "Crimsteel Reel", materials: { "Crimsteel Bar": 4, Thread: 3 } },
    { name: "Crimsteel Chainbody", materials: { "Crimsteel Bar": 5 } },
    { name: "Crimsteel Platelegs", materials: { "Crimsteel Bar": 5 } },
    { name: "Crimsteel Platebody", materials: { "Crimsteel Bar": 6 } },

    // Silver Bar Materials
    { name: "Sapphire Necklace", materials: { "Silver Bar": 4, Sapphire: 4 } },
    { name: "Ruby Necklace", materials: { "Silver Bar": 4, Ruby: 4 } },
    { name: "Arosite Necklace", materials: { "Silver Bar": 4, Arosite: 4 } },
    { name: "Emerald Necklace", materials: { "Silver Bar": 4, Emerald: 4 } },
    { name: "Snake Charm", materials: { "Silver Bar": 2, "Snake Eye": 1 } },

    // Gold Bar Materials
    { name: "Gold Boots", materials: { "Gold Bar": 1 } },
    { name: "Gold Platelegs", materials: { "Gold Bar": 4 } },
    { name: "Ring of Treasure", materials: { "Gold Bar": 2, Ruby: 1, Sapphire: 1, Arosite: 1 } },
    { name: "Ruby Sword", materials: { "Gold Bar": 3, Ruby: 3 } },
    { name: "Ruby Platebody", materials: { "Gold Bar": 5, Ruby: 2 } },
    { name: "Ruby Helm", materials: { "Gold Bar": 8, Ruby: 4 } },
    { name: "Sapphire Sword", materials: { "Gold Bar": 3, Sapphire: 3 } },
    { name: "Sapphire Platebody", materials: { "Gold Bar": 5, Sapphire: 2 } },
    { name: "Sapphire Helm", materials: { "Gold Bar": 8, Sapphire: 4 } },
    { name: "Arosite Sword", materials: { "Gold Bar": 3, Arosite: 3 } },
    { name: "Arosite Platebody", materials: { "Gold Bar": 5, Arosite: 2 } },
    { name: "Arosite Helm", materials: { "Gold Bar": 8, Arosite: 4 } },
    { name: "Magnetite Necklace", materials: { "Gold Bar": 2, Magnetite: 4 } },
    { name: "Battle Necklace", materials: { "Gold Bar": 4, Emerald: 4, Magnetite: 4, Ruby: 4, Arosite: 4 } },

    // Mythan Bar Materials
    { name: "Mythan Spade", materials: { "Mythan Bar": 5, "Chestnut Logs": 1 } },
    { name: "Mythan Boots", materials: { "Mythan Bar": 5 } },
    { name: "Mythan Sword", materials: { "Mythan Bar": 5 } },
    { name: "Mythan Pickaxe", materials: { "Mythan Bar": 6, "Chestnut Logs": 1 } },
    { name: "Mythan Axe", materials: { "Mythan Bar": 6, "Chestnut Logs": 1 } },
    { name: "Mythan Helm", materials: { "Mythan Bar": 10 } },
    { name: "Sharper Mythan Sword", materials: { "Mythan Bar": 10 } },
    { name: "Mythan Shield", materials: { "Mythan Bar": 6 } },
    { name: "Mythan Reel", materials: { "Mythan Bar": 6, Thread: 3 } },
    { name: "Mythan Platelegs", materials: { "Mythan Bar": 11 } },
    { name: "Mythan Platebody", materials: { "Mythan Bar": 13 } },
    { name: "Chaotic Mythan Sword", materials: { "Mythan Bar": 25 } },

    // Cobalt Bar Materials
    { name: "Cobalt Boots", materials: { "Cobalt Bar": 7 } },
    { name: "Cobalt Sword", materials: { "Cobalt Bar": 16 } },
    { name: "Cobalt Pickaxe", materials: { "Cobalt Bar": 10, "Maple Logs": 1 } },
    { name: "Cobalt Gauntlets", materials: { "Cobalt Bar": 7 } },
    { name: "Cobalt Axe", materials: { "Cobalt Bar": 10, "Maple Logs": 1 } },
    { name: "Cobalt Helm", materials: { "Cobalt Bar": 12 } },
    { name: "Cobalt Shield", materials: { "Cobalt Bar": 17 } },
    { name: "Cobalt Reel", materials: { "Cobalt Bar": 10, Thread: 3 } },
    { name: "Cobalt Platelegs", materials: { "Cobalt Bar": 12 } },
    { name: "Cobalt Platebody", materials: { "Cobalt Bar": 14 } },

    // Varaxite Bar Materials
    { name: "Varaxite Gauntlets", materials: { "Varaxite Bar": 7 } },
    { name: "Varaxite Boots", materials: { "Varaxite Bar": 7 } },
    { name: "Varaxite Sword", materials: { "Varaxite Bar": 16 } },
    { name: "Varaxite Pickaxe", materials: { "Varaxite Bar": 7, "Olive Logs": 1 } },
    { name: "Varaxite Axe", materials: { "Varaxite Bar": 7, "Olive Logs": 1 } },
    { name: "Varaxite Helm", materials: { "Varaxite Bar": 10 } },
    { name: "Varaxite Platelegs", materials: { "Varaxite Bar": 11 } },
    { name: "Varaxite Platebody", materials: { "Varaxite Bar": 12 } },
    { name: "Varaxite Shield", materials: { "Varaxite Bar": 17 } },
    { name: "Varaxite Reel", materials: { "Varaxite Bar": 7, Thread: 3 } },

    // Magic Bar Materials
    { name: "Magic Pickaxe", materials: { "Magic Bar": 10, "Magic Log": 1 } },
    { name: "Magic Axe", materials: { "Magic Bar": 10, "Magic Log": 1 } },
    { name: "Magic Reel", materials: { "Magic Bar": 7, Thread: 3 } }
];



function formatNumberWithDots(number) {
    return number.toLocaleString("de-DE");
}

function showContainer(containerId) {
    const containers = document.querySelectorAll(".container");
    const tabs = document.querySelectorAll(".menu-tabs a");

    containers.forEach(container => container.style.display = "none");
    tabs.forEach(tab => tab.classList.remove("active"));

    document.getElementById(containerId).style.display = "block";
    document.getElementById(`${containerId}-tab`).classList.add("active");

    const pageTitle = {
        home: "Welcome to Curse of Aros Skills Calculator",
        mining: "Mining XP Calculator",
        fishing: "Fishing XP Calculator",
        smithing: "Smithing XP Calculator",
        woodcutting: "Woodcutting XP Calculator",
        crafting: "Crafting XP Calculator",
        cooking: "Cooking XP Calculator",
        spellbinding: "Spellbinding XP Calculator"
    };

    document.getElementById("page-title").textContent = pageTitle[containerId];
}

document.addEventListener("DOMContentLoaded", () => {
    showContainer("home");
});
