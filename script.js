// html elements
const packImgEl = document.getElementById("pack-img");
const stampImgEl = document.getElementById("stamp");
const priceEl = document.getElementById("price");
const retailPriceEl = document.getElementById("retail-price");
const savingsEl = document.getElementById("savings");
const quantityCheckEls = document.querySelectorAll(".switch-quantity__input");
const typeCheckEls = document.querySelectorAll(".switch-type__input");
const buyBtn = document.querySelector(".main__buy-btn");
const subscribeBlock = document.querySelector('.goods-info__subscribe-info');
const subscribeCheckbox = document.getElementById('subscribe-checkbox');

// default states of switches
let numberOfGoods = "three";
let chosenType = "one-time";

// prepared data for each number of goods
const goodsData = {
    one: {
        price: 39.95,
        retailPrice: 58.00,
        subscribePrice: 35.95,
        link: "www.tracker.com/link-1",
        subscribeLink: "www.tracker.com/subscribe-link-1",
        imgUrl: "./img/1pack.png",
        stampUrl: ""
    },
    three: {
        price: 102.00,
        retailPrice: 174.00,
        subscribePrice: 91.80,
        link: "www.tracker.com/link-3",
        subscribeLink: "www.tracker.com/subscribe-link-3",
        imgUrl: "./img/3pack.png",
        stampUrl: "./img/stamp_red.svg"
    },
    six: {
        price: 186.00,
        retailPrice: 348.00,
        subscribePrice: 167.40,
        link: "www.tracker.com/link-6",
        subscribeLink: "www.tracker.com/subscribe-link-6",
        imgUrl: "./img/6pack.png",
        stampUrl: "./img/stamp_green.svg"
    }
};

// calculate and paste to html savings sum
const calculateSavings = (firstPrice, secondPrice) => {
    let saved = (firstPrice - secondPrice).toFixed(2);
    savingsEl.innerText = `$${saved}`;
};

// update html on switches change
const updateData = (goodsNumber, type) => {
    // update global variables
    numberOfGoods = goodsNumber;
    chosenType = type;

    const { price, retailPrice, subscribePrice, link, subscribeLink, imgUrl, stampUrl } = goodsData[goodsNumber];

    // update common values
    packImgEl.src = imgUrl;
    stampImgEl.src = stampUrl;
    retailPriceEl.innerText = `$${retailPrice.toFixed(2)}`;

    // update values depending on payment type
    if (type === "one-time") {
        priceEl.innerText = `$${price.toFixed(2)}`;
        calculateSavings(retailPrice, price);
        buyBtn.href = link;
        subscribeBlock.classList.add("hidden");
        // enable buy btn by default for this type
        buyBtn.classList.remove('main__buy-btn_disabled');
    } else {
        priceEl.innerHTML = `$${subscribePrice.toFixed(2)}<span class="goods-info__month">/month</span>`;
        calculateSavings(retailPrice, subscribePrice);
        buyBtn.href = subscribeLink;
        subscribeBlock.classList.remove("hidden");
        // disable buy btn and uncheck subscribe checkbox by default for this type
        buyBtn.classList.add('main__buy-btn_disabled');
        subscribeCheckbox.checked = false;
    }
};

// paste savings on page load
document.addEventListener("DOMContentLoaded", () => calculateSavings(goodsData.three.retailPrice, goodsData.three.price));

// event listeners for each item in switches
quantityCheckEls.forEach(item => {
    item.addEventListener("click", e => updateData(e.target.value, chosenType));
});

typeCheckEls.forEach(item => {
    item.addEventListener("click", e => updateData(numberOfGoods, e.target.value));
});

// disable buy btn when subscription check is not confirmed
subscribeCheckbox.addEventListener("click", e => {
    if (!e.target.checked) buyBtn.classList.add('main__buy-btn_disabled')
    else buyBtn.classList.remove('main__buy-btn_disabled')
});