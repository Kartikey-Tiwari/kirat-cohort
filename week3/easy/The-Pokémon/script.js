const STATS = ["hp", "attack", "defense", "speed"];
const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];
const DEFAULT_CARDS = 5;

const formatPokemonName = (() => {
  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  const exceptions = {
    "nidoran-f": "Nidoran♀",
    "nidoran-m": "Nidoran♂",
    "mr-mime": "Mr. Mime",
    "ho-oh": "Ho-Oh",
    "mime-jr": "Mime Jr.",
    "porygon-z": "Porygon-Z",
    "type-null": "Type: Null",
    "jangmo-o": "Jangmo-o",
    "hakamo-o": "Hakamo-o",
    "kommo-o": "Kommo-o",
    "tapu-koko": "Tapu Koko",
    "tapu-lele": "Tapu Lele",
    "tapu-bulu": "Tapu Bulu",
    "tapu-fini": "Tapu Fini",
    "mr-rime": "Mr. Rime",
    "great-tusk": "Great Tusk",
    "scream-tail": "Scream Tail",
    "brute-bonnet": "Brute Bonnet",
    "flutter-mane": "Flutter Mane",
    "slither-wing": "Slither Wing",
    "sandy-shocks": "Sandy Shocks",
    "iron-treads": "Iron Treads",
    "iron-bundle": "Iron Bundle",
    "iron-hands": "Iron Hands",
    "iron-jugulis": "Iron Jugulis",
    "iron-moth": "Iron Moth",
    "iron-thorns": "Iron Thorns",
    "wo-chien": "Wo-Chien",
    "chien-pao": "Chien-Pao",
    "ting-lu": "Ting-Lu",
    "chi-yu": "Chi-Yu",
    "roaring-moon": "Roaring Moon",
    "iron-valiant": "Iron Valiant",
    "walking-wake": "Walking Wake",
    "iron-leaves": "Iron Leaves",
    "gouging-fire": "Gouging Fire",
    "raging-bolt": "Raging Bolt",
    "iron-boulder": "Iron Boulder",
    "iron-crown": "Iron Crown",
  };

  const exceptionsEntries = Object.entries(exceptions);

  function assembleName(name, suffix) {
    if (!suffix.length) {
      return name;
    }
    suffix = suffix.map(capitalize);
    if (suffix.includes("Mega")) {
      suffix = suffix.filter((s) => s !== "Mega");
      return `Mega ${name}${suffix.length ? " " + suffix.join(" ") : ""}`;
    }
    return `${name} (${suffix.join(" ")})`;
  }

  return (name) => {
    if (exceptions[name]) {
      return exceptions[name];
    }

    for (const [key, val] of exceptionsEntries) {
      if (name.startsWith(key + "-")) {
        return assembleName(val, name.slice(key.length + 1).split("-"));
      }
    }

    const parts = name.split("-");
    return assembleName(capitalize(parts[0]), parts.slice(1));
  };
})();

// Source - https://stackoverflow.com/a
// Posted by ChristopheD, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-01, License - CC BY-SA 4.0
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

const P = new Pokedex.Pokedex();
const form = document.querySelector("form");
const typeSelector = document.querySelector("#pokemon-type");
const numCardSelector = document.querySelector("#num-cards");

POKEMON_TYPES.forEach((type) => {
  const option = document.createElement("option");
  option.value = type;
  option.textContent = type;
  typeSelector.appendChild(option);
});
numCardSelector.value = DEFAULT_CARDS;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const pokemonType = typeSelector.value;
  if (POKEMON_TYPES.findIndex((t) => t === pokemonType) === -1) return;
  const numCards = Number(numCardSelector.value);
  if (isNaN(numCards) || numCards <= 0 || numCards >= 30) return;

  const pokemonsOfSelectedType = (await P.getTypeByName(pokemonType)).pokemon;
  shuffle(pokemonsOfSelectedType);
  const pokemonsData = pokemonsOfSelectedType.slice(0, numCards);
  pokemonsData.forEach(async (p, i) => {
    const data = await P.resource(p.pokemon.url);
    const id = data.id >= 10000 ? data.species.url.split("/").at(-2) : data.id;
    const pokemon = {
      id,
      name: formatPokemonName(data.name),
      stats: data.stats.reduce((agg, s) => {
        if (STATS.findIndex((stat) => stat === s.stat.name) !== -1) {
          agg.push({
            name: s.stat.name,
            base_stat: s.base_stat,
          });
        }
        return agg;
      }, []),
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => a.ability.name),
      height: data.height,
      weight: data.weight,
      sprite:
        data.sprites.front_default ??
        (await P.resource(`/api/v2/pokemon/${id}`)).sprites.front_default,
    };
    pokemonsData[i] = pokemon;
  });

  console.log(pokemonsData);

  typeSelector.value = "";
  numCardSelector.value = DEFAULT_CARDS;
});
