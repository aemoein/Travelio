const optionToNumber = { 'a': 5, 'b': 4, 'c': 3, 'd': 2, 'e': 1 };
const genres = [
  "Historical",
  "Cultural",
  "Natural",
  "Adventure",
  "Urban",
  "Beach",
  "Ecotourism",
  "Wellness",
  "Culinary",
  "Sports",
  "Off-the-Beaten-Path",
  "Family-Friendly",
  "Luxury",
  "Budget",
  "Educational",
  "Wildlife"
];

function generatePreferences(answers) {
  const result = answers.map(answer => optionToNumber[answer]);

  const resultWithKeys = result.map((value, index) => ({
    key: index + 1,
    value: value
  }));
  
  resultWithKeys.sort((a, b) => b.value - a.value);

  const topThreeValues = resultWithKeys.slice(0, 3);
  const preferences = topThreeValues.map(item => genres[item.key - 1]); 

  const keysUsed = new Set(topThreeValues.map(item => item.key));
  let filteredResultWithKeys = resultWithKeys.filter(item => item.value >= 3 && !keysUsed.has(item.key));

  let additionalKeys = [];
  if (filteredResultWithKeys.length > 2) {
      const randomIndices = [];
      while (randomIndices.length < 2) {
          const randomIndex = Math.floor(Math.random() * filteredResultWithKeys.length);
          if (!randomIndices.includes(randomIndex)) {
              randomIndices.push(randomIndex);
          }
      }
      additionalKeys = randomIndices.map(index => filteredResultWithKeys[index].key);
  } else {
      additionalKeys = filteredResultWithKeys.map(item => item.key);
  }
  const additionalPreferences = additionalKeys.map(key => genres[key - 1]);
  preferences.push(...additionalPreferences);
  filteredResultWithKeys = filteredResultWithKeys.filter(item => !additionalKeys.includes(item.key));

  return preferences;
}

module.exports = {
  generatePreferences,
  genres
};
