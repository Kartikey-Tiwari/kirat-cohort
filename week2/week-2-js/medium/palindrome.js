/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isAlphabet(char) {
  const code = char.toLowerCase().charCodeAt(0);
  return code >= 97 && code <= 122; // a–z
}

function isPalindrome(str) {
  let lo = 0,
    hi = str.length - 1;

  while (lo < hi) {
    if (!isAlphabet(str[lo])) {
      lo++;
    } else if (!isAlphabet(str[hi])) {
      hi--;
    } else {
      if (str[lo].toLowerCase() !== str[hi].toLowerCase()) {
        return false;
      }
      lo++;
      hi--;
    }
  }
  return true;
}

module.exports = isPalindrome;
