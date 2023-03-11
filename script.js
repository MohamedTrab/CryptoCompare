const cryptoSelect = document.getElementById("crypto");
const currencySelect = document.getElementById("currency");
const fetchDataButton = document.getElementById("fetch-data");
const priceParagraph = document.getElementById("price");
const volumeParagraph = document.getElementById("volume");
const lastUpdateParagraph = document.getElementById("last-update");
const imageUrl = document.getElementById("image-url");

const API_URL = "https://min-api.cryptocompare.com/data/pricemultifull";

const updateButtonStatus = () => {
  if (cryptoSelect.value && currencySelect.value) {
    fetchDataButton.disabled = false;
  } else {
    fetchDataButton.disabled = true;
  }
};

const formatDate = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
}
  
  
const fetchData = async () => {
    const crypto = cryptoSelect.value;
    const currency = currencySelect.value;
    const response = await fetch(`${API_URL}?fsyms=${crypto}&tsyms=${currency}`);
    const data = await response.json();
    const coinData = data.DISPLAY[crypto][currency];
    priceParagraph.textContent = coinData.PRICE;
    volumeParagraph.textContent = coinData.VOLUME24HOURTO;
    const lastUpdateDate = new Date(coinData.LASTUPDATE * 1000);
    const formattedDate = formatDate(lastUpdateDate);
    lastUpdateParagraph.textContent = `Dernière mise à jour le ${formatDate()}`;
    imageUrl.src = `https://cryptocompare.com${coinData.IMAGEURL}`;
    document.getElementById("crypto-name").textContent = `${crypto}`;
    document.getElementById("currency-name").textContent = `${currency}`;
};
  

cryptoSelect.addEventListener("change", updateButtonStatus);
currencySelect.addEventListener("change", updateButtonStatus);
fetchDataButton.addEventListener("click", fetchData);
