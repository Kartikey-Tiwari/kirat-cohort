let counter = 0;

function nextTick() {
  counter++;
  console.log({ counter });
  setTimeout(nextTick, 1000);
}

setTimeout(nextTick, 1000);
