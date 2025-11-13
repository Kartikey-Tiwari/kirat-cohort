function timeLogger() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  console.log(
    `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
  );
  console.log(
    `${hours < 10 ? "0" : ""}${hours === 0 ? 12 : hours > 12 ? hours % 12 : hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}${hours > 12 ? "PM" : "AM"}`,
  );
}

setInterval(timeLogger, 1000);
