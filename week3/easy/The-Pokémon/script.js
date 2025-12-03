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
const typeStyles = {
  normal: {
    bg: "linear-gradient(135deg, #9ca3af, #6b7280)",
    border: "#9ca3af",
  },
  fire: { bg: "linear-gradient(135deg, #f97316, #dc2626)", border: "#f97316" },
  water: { bg: "linear-gradient(135deg, #60a5fa, #2563eb)", border: "#60a5fa" },
  electric: {
    bg: "linear-gradient(135deg, #fde047, #eab308)",
    border: "#facc15",
  },
  grass: { bg: "linear-gradient(135deg, #4ade80, #16a34a)", border: "#22c55e" },
  ice: { bg: "linear-gradient(135deg, #67e8f9, #06b6d4)", border: "#22d3ee" },
  fighting: {
    bg: "linear-gradient(135deg, #dc2626, #991b1b)",
    border: "#dc2626",
  },
  poison: {
    bg: "linear-gradient(135deg, #a855f7, #7e22ce)",
    border: "#a855f7",
  },
  ground: {
    bg: "linear-gradient(135deg, #ca8a04, #b45309)",
    border: "#d97706",
  },
  flying: {
    bg: "linear-gradient(135deg, #818cf8, #0ea5e9)",
    border: "#38bdf8",
  },
  psychic: {
    bg: "linear-gradient(135deg, #ec4899, #be185d)",
    border: "#ec4899",
  },
  bug: { bg: "linear-gradient(135deg, #84cc16, #16a34a)", border: "#65a30d" },
  rock: { bg: "linear-gradient(135deg, #a16207, #57534e)", border: "#57534e" },
  ghost: { bg: "linear-gradient(135deg, #7e22ce, #312e81)", border: "#7e22ce" },
  dragon: {
    bg: "linear-gradient(135deg, #4f46e5, #7e22ce)",
    border: "#4f46e5",
  },
  dark: { bg: "linear-gradient(135deg, #374151, #111827)", border: "#1f2937" },
  steel: { bg: "linear-gradient(135deg, #94a3b8, #475569)", border: "#64748b" },
  fairy: { bg: "linear-gradient(135deg, #f9a8d4, #ec4899)", border: "#f472b6" },
};

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
const submit = form.querySelector("button");

POKEMON_TYPES.forEach((type) => {
  const option = document.createElement("option");
  option.value = type;
  option.textContent = type[0].toUpperCase() + type.slice(1);
  option.style.setProperty("--my-color", typeStyles[type].border);
  typeSelector.appendChild(option);
});
numCardSelector.value = DEFAULT_CARDS;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submit.textContent = "Loading...";
  submit.disabled = true;
  const pokemonType = typeSelector.value;
  if (POKEMON_TYPES.findIndex((t) => t === pokemonType) === -1) return;
  const numCards = Number(numCardSelector.value);
  if (isNaN(numCards) || numCards <= 0 || numCards > 30) return;

  const pokemonsOfSelectedType = (await P.getTypeByName(pokemonType)).pokemon;
  shuffle(pokemonsOfSelectedType);
  const selectedPokemons = pokemonsOfSelectedType.slice(0, numCards);
  const promises = selectedPokemons.map(async (p) => {
    const data = await P.resource(p.pokemon.url);
    const id = data.id >= 10000 ? data.species.url.split("/").at(-2) : data.id;
    const sprite =
      data.sprites.other["official-artwork"].front_default ??
      data.sprites.front_default ??
      (await P.resource(`/api/v2/pokemon/${id}`)).sprites.other[
        "official-artwork"
      ].front_default;

    return {
      id,
      name: formatPokemonName(data.name),
      stats: data.stats.reduce((agg, s) => {
        if (STATS.includes(s.stat.name)) {
          agg[s.stat.name] = s.base_stat;
        }
        return agg;
      }, {}),
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => a.ability.name),
      height: data.height,
      weight: data.weight,
      sprite,
    };
  });

  const pokemonsData = await Promise.all(promises);

  form.remove();

  typeSelector.value = "";
  numCardSelector.value = DEFAULT_CARDS;
  submit.textContent = "Generate Cards";
  submit.disabled = false;

  const anglePerCard = 10;
  const maxSpread = 90;
  let totalArc = (numCards - 1) * anglePerCard;
  if (totalArc > maxSpread) {
    totalArc = maxSpread;
  }
  const step = numCards > 1 ? totalArc / (numCards - 1) : 0;
  const startAngle = totalArc / -2;
  const pokemonCards = pokemonsData.map((pokemon, index) => {
    const cardContainer = createPokemonCard(pokemon);
    const card = cardContainer.firstElementChild;
    cardContainer.canFlip = false;
    card.addEventListener("click", () => {
      if (cardContainer.canFlip) {
        card.classList.toggle("flipped");
      }
    });
    cardContainer.classList.add("abs");
    cardContainer.style.zIndex = numCards - index;

    cardContainer.style.setProperty(
      "--rotation-angle",
      `${startAngle + index * step}deg`,
    );
    setTimeout(() => {
      document.body.appendChild(cardContainer);
    }, 50 * index);
    return cardContainer;
  });

  setTimeout(() => {
    const firstPositions = pokemonCards.map((card) =>
      card.getBoundingClientRect(),
    );
    document.querySelectorAll(".pokemon-card-container").forEach((p) => {
      p.classList.remove("abs");
    });

    pokemonCards.forEach((card, index) => {
      const first = firstPositions[index];
      const last = card.getBoundingClientRect();
      const firstCenterX = first.left + first.width / 2;
      const firstCenterY = first.top + first.height / 2;

      const lastCenterX = last.left + last.width / 2;
      const lastCenterY = last.top + last.height / 2;

      const deltaX = firstCenterX - lastCenterX;
      const deltaY = firstCenterY - lastCenterY;

      card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${startAngle + index * step}deg)`;

      document.body.offsetHeight;

      const delay = index * 100;

      setTimeout(() => {
        card.style.zIndex = 9999;

        card.style.transition = `transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1.2)`;
        card.style.transform = "";

        setTimeout(() => {
          card.style.zIndex = "auto";
          card.querySelector(".sprite").style.animationIterationCount =
            "infinite";
        }, 100);
      }, delay);
      card.canFlip = true;
    });
  }, 60 * numCards);
});

function createPokemonCard({
  name,
  id,
  sprite,
  types,
  height,
  weight,
  stats: { hp, attack, defense, speed },
}) {
  const color = typeStyles[types[0]];
  const nameClass = name.length > 18 ? " long" : "";
  weight = `${weight / 10}kg`;
  height = `${height / 10}m`;
  const html = `
<div class="pokemon-card-container">
  <div class="pokemon-card">
    <div class="card-face front" ${color ? `style="--card-bg: ${color.bg}; --card-border:${color.border};"` : ""}>
      <div class="header">
        <h2 class="name${nameClass}">${name}</h2>
        <span class="id">#${id}</span>
      </div>
      <div class="sprite-container">
        <img class="sprite" src="${sprite}">
      </div>
      <div class="info">
        <div class="types">${types
          .map((t) => {
            return `<div class="type" style="background: ${typeStyles[t].bg}; color: white">${t[0].toUpperCase() + t.slice(1)}</div>`;
          })
          .join("")}</div>
        <div class="physical">
          <div> 
            <span>Height</span>
            <span class="height">${height}</span>
          </div>
          <div> 
            <span>Weight</span>
            <span class="weight">${weight}</span>
          </div>
        </div>
        <div class="stats">
          <div>
            <span>HP</span>
            <span class="stat hp">${hp}</span>
          </div>
          <div>
            <span>Attack</span>
            <span class="stat attack">${attack}</span>
          </div>
          <div>
            <span>Defense</span>
            <span class="stat defense">${defense}</span>
          </div>
          <div>
            <span>Speed</span>
            <span class="stat speed">${speed}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-face back">
<span class="pokeball"></span>
<h2>Pokemon Card</h2>
</div>
  </div>
</div>`;
  const temp = document.createElement("div");
  temp.insertAdjacentHTML("afterbegin", html);
  return temp.firstElementChild;
}
