/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const count = new Map();
  for (let i of str1) {
    i = i.toLowerCase();
    if (!count.has(i)) {
      count.set(i, 1);
    } else {
      count.set(i, count.get(i) + 1);
    }
  }
  for (let i of str2) {
    i = i.toLowerCase();
    if (!count.has(i)) {
      return false;
    }
    const cur = count.get(i);
    if (cur === 1) {
      count.delete(i);
    } else {
      count.set(i, cur - 1);
    }
  }

  return count.size === 0;
}

module.exports = isAnagram;
