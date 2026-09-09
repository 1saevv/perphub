const DEFAULT_REWARD_POOL_LIT = 11000000;
const AUTO_WEEKLY_POINTS = 100000;
const DEFAULT_OTC_PRICE_PER_POINT = 0.85;
const simpleDexDefaults = {
  Extended: { points: 250, otcPrice: 0.85 },
  Ostium: { points: 750, otcPrice: 0.4 },
  Variational: { points: 500, otcPrice: 19 },
  RiseX: { points: 200, otcPrice: 3 },
  Hibachi: { points: 600, otcPrice: 0.1 },
};
const calculatorDexBrands = {
  Lighter: { label: "Lighter x Robinhood", logo: "logoRL.png" },
  Extended: { label: "Extended", logo: "Extendedlogo.jpg" },
  Ostium: { label: "Ostium", logo: "ostiumlogo.jpg" },
  Variational: { label: "Variational", logo: "variationallogo.jpg" },
  RiseX: { label: "RiseX", logo: "risexlogo.png" },
  Hibachi: { label: "Hibachi", logo: "hibachilogo.png" },
};
const ACTIVE_TAB_STORAGE_KEY = "perphub.activeTab";
const ACTIVE_DEX_STORAGE_KEY = "perphub.calculatorDex";
const tabHashByName = {
  home: "",
  calculator: "calculator",
  stack: "points-stack",
  vooi: "strategies",
  boost: "boost",
  wheel: "wheel",
};
const tabNameByHash = {
  lighter: "calculator",
  calculator: "calculator",
  stack: "stack",
  "points-stack": "stack",
  pointsstack: "stack",
  strategies: "vooi",
  strategy: "vooi",
  vooi: "vooi",
  boost: "boost",
  boosts: "boost",
  wheel: "wheel",
};
const DONATION_WALLETS = {
  evm: "0xde2a8b100ffB2f957d008DC28661A9E20A7AF7f4",
  solana: "GZVssHZt4YCnicAMT5HGB5btZBZt6dLghdGn8rADDGzX",
};
const STACK_DEX_ASSETS = [
  { keys: ["lighter", "lighter robinhood", "lighter x robinhood"], logo: "lighterlogo.jpg" },
  { keys: ["extended", "extended exchange"], logo: "Extendedlogo.jpg" },
  { keys: ["hyperliquid", "hyper"], logo: "hyperlogo.jpg" },
  { keys: ["vooi"], logo: "vooilogoforPerpHub.jpg" },
  { keys: ["ostium"], logo: "ostiumlogo.jpg" },
  { keys: ["sai"], logo: "sailogo.jpg" },
  { keys: ["entropy"], logo: "entropylogo.jpg" },
];
const STACK_CARD_BACKGROUNDS = [
  { name: "Default", src: "" },
  { name: "1", src: "1stPnlCard.jpg" },
  { name: "2", src: "2ndPnLcard.jpg" },
  { name: "3", src: "3rdPnLcard.jpg" },
  { name: "4", src: "4thPnLcard.jpg" },
  { name: "5", src: "5thPnLcard.jpg" },
  { name: "6", src: "6thPnLcard.jpg" },
  { name: "7", src: "7thPnLcard.jpg" },
  { name: "8", src: "8thPnLcard.jpg" },
  { name: "9", src: "9thPnLcard.jpg" },
  { name: "10", src: "10thPnLcard.jpg" },
];
let activeShareCardBackground = 0;
let activeStackCardBackground = 0;
let activeCalculatorMode = "auto";
let activeEstimateMode = "season";

const defaults = {
  userPoints: 16.8,
  litPrice: 4.7,
  tradingPnl: 0,
  totalSeasonPoints: 250000,
  rewardPool: DEFAULT_REWARD_POOL_LIT,
};

const estimateModes = {
  season: {
    userPointsLabel: "Your Season Points",
    totalPointsLabel: "Estimated Total Season Points",
    userShareLabel: "Your Share of Total Points",
    sharePointsLabel: "Season Points",
    shareTotalPointsLabel: "Total Season",
    shareTotalTextLabel: "Estimated Total Points",
    min: 100000,
    max: 5000000,
    step: 50000,
    minLabel: "100K points",
    maxLabel: "5M points",
    compactLevels: [100000, 500000, 1000000, 2000000, 5000000],
    levels: [100000, 250000, 500000, 1000000, 1500000, 2000000, 3000000, 5000000],
  },
  weekly: {
    userPointsLabel: "Your Avg Points / Week",
    totalPointsLabel: "All Users Avg Points / Week",
    userShareLabel: "Your Share of Weekly Pace",
    sharePointsLabel: "Your Avg / Week",
    shareTotalPointsLabel: "All Users / Week",
    shareTotalTextLabel: "All Users Avg Points / Week",
    min: 1000,
    max: 500000,
    step: 1000,
    minLabel: "1K points",
    maxLabel: "500K points",
    compactLevels: [1000, 10000, 50000, 100000, 500000],
    levels: [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000],
  },
};

const calculatorDexLinks = {
  Lighter: "https://robinhoodchain.lighter.xyz/?referral=PERP&source=none",
  Extended: "https://app.extended.exchange/join/1SAEVV",
  Ostium: "https://ultra.vooi.io/i/S9UDFLJC",
  Variational: "https://omni.variational.io/?ref=OMNIALEKZZ",
  Hibachi: "https://hibachi.xyz/r/1saevv",
};

const elements = {
  rewardPoolLabel: document.querySelector("#rewardPoolLabel"),
  userPoints: document.querySelector("#userPoints"),
  userPointsLabel: document.querySelector("#userPointsLabel"),
  tokenPriceLabel: document.querySelector("#tokenPriceLabel"),
  litPrice: document.querySelector("#litPrice"),
  customOtcPrice: document.querySelector("#customOtcPrice"),
  includePnl: document.querySelector("#includePnl"),
  tradingPnl: document.querySelector("#tradingPnl"),
  litPriceRange: document.querySelector("#litPriceRange"),
  litPriceOutput: document.querySelector("#litPriceOutput"),
  rewardPool: document.querySelector("#rewardPool"),
  manualTotalPoints: document.querySelector("#manualTotalPoints"),
  totalPointsLabel: document.querySelector("#totalPointsLabel"),
  manualTotalPointsRange: document.querySelector("#manualTotalPointsRange"),
  totalPointsRangeLabel: document.querySelector("#totalPointsRangeLabel"),
  manualTotalPointsOutput: document.querySelector("#manualTotalPointsOutput"),
  autoWeeksRange: document.querySelector("#autoWeeksRange"),
  autoWeeksOutput: document.querySelector("#autoWeeksOutput"),
  autoAssumptionsLabel: document.querySelector("#autoAssumptionsLabel"),
  totalPointsMinLabel: document.querySelector("#totalPointsMinLabel"),
  totalPointsMaxLabel: document.querySelector("#totalPointsMaxLabel"),
  estimatedLit: document.querySelector("#estimatedLit"),
  estimatedAllocationLabel: document.querySelector("#estimatedAllocationLabel"),
  estimatedUsd: document.querySelector("#estimatedUsd"),
  estimatedUsdLabel: document.querySelector("#estimatedUsdLabel"),
  netProfit: document.querySelector("#netProfit"),
  pnlBreakdown: document.querySelector("#pnlBreakdown"),
  valuePerPointLit: document.querySelector("#valuePerPointLit"),
  valuePerPointLabel: document.querySelector("#valuePerPointLabel"),
  valuePerPointUsd: document.querySelector("#valuePerPointUsd"),
  userShareLabel: document.querySelector("#userShareLabel"),
  userShare: document.querySelector("#userShare"),
  priceScenarios: document.querySelector("#priceScenarios"),
  copyButton: document.querySelector("#copyButton"),
  dexSelect: document.querySelector("#dexSelect"),
  dexMenu: document.querySelector("#dexMenu"),
  dexMenuButton: document.querySelector("#dexMenuButton"),
  dexMenuLogo: document.querySelector("#dexMenuLogo"),
  dexMenuLabel: document.querySelector("#dexMenuLabel"),
  dexMenuOptions: document.querySelectorAll("[data-dex-option]"),
  calculatorTradeButton: document.querySelector("#calculatorTradeButton"),
  calculatorModeButtons: document.querySelectorAll("[data-calculator-mode]"),
  inputsPanel: document.querySelector(".inputs-panel"),
  controlModeButtons: document.querySelectorAll("[data-control-mode]"),
  tabButtons: document.querySelectorAll("[data-tab]"),
  moreMenus: document.querySelectorAll(".more-menu"),
  moreButtons: document.querySelectorAll(".more-button"),
  burgerMenu: document.querySelector(".burger-menu"),
  burgerButton: document.querySelector("#burgerButton"),
  mobileCoffeeButton: document.querySelector("#mobileCoffeeButton"),
  homeLogoButton: document.querySelector("#homeLogoButton"),
  homeActionButtons: document.querySelectorAll("[data-home-target]"),
  vooiVideo: document.querySelector("#vooiVideo"),
  homeTab: document.querySelector("#homeTab"),
  calculatorTab: document.querySelector("#calculatorTab"),
  stackTab: document.querySelector("#stackTab"),
  stackDexCards: document.querySelectorAll(".stack-dex-card"),
  stackInputs: document.querySelectorAll(".stack-dex-card input, .stack-dex-card select"),
  stackHeroNet: document.querySelector("#stackHeroNet"),
  stackGrossValue: document.querySelector("#stackGrossValue"),
  stackPnlValue: document.querySelector("#stackPnlValue"),
  stackNetValue: document.querySelector("#stackNetValue"),
  stackVerdict: document.querySelector("#stackVerdict"),
  stackBreakdown: document.querySelector("#stackBreakdown"),
  stackShareButton: document.querySelector("#stackShareButton"),
  stackShareModal: document.querySelector("#stackShareModal"),
  stackShareCloseButton: document.querySelector("#stackShareCloseButton"),
  stackShareNet: document.querySelector("#stackShareNet"),
  stackShareDexOne: document.querySelector("#stackShareDexOne"),
  stackShareDexOneValue: document.querySelector("#stackShareDexOneValue"),
  stackShareDexTwo: document.querySelector("#stackShareDexTwo"),
  stackShareDexTwoValue: document.querySelector("#stackShareDexTwoValue"),
  stackShareMeta: document.querySelector("#stackShareMeta"),
  stackShareCard: document.querySelector("#stackShareCard"),
  stackBgPicker: document.querySelector("#stackBgPicker"),
  stackSaveCardButton: document.querySelector("#stackSaveCardButton"),
  stackCopyCardButton: document.querySelector("#stackCopyCardButton"),
  stackShareXButton: document.querySelector("#stackShareXButton"),
  vooiTab: document.querySelector("#vooiTab"),
  boostTab: document.querySelector("#boostTab"),
  wheelTab: document.querySelector("#wheelTab"),
  wheelStage: document.querySelector(".wheel-stage"),
  fortuneWheel: document.querySelector("#fortuneWheel"),
  wheelSpinButton: document.querySelector("#wheelSpinButton"),
  wheelResultCard: document.querySelector("#wheelResultCard"),
  wheelCardCloseButton: document.querySelector("#wheelCardCloseButton"),
  wheelResultTitle: document.querySelector("#wheelResultTitle"),
  wheelResultText: document.querySelector("#wheelResultText"),
  wheelSaveButton: document.querySelector("#wheelSaveButton"),
  wheelCopyButton: document.querySelector("#wheelCopyButton"),
  wheelShareButton: document.querySelector("#wheelShareButton"),
  chartGrid: document.querySelector("#chartGrid"),
  shareModal: document.querySelector("#shareModal"),
  shareCard: document.querySelector("#shareCard"),
  shareProgramLogo: document.querySelector("#shareProgramLogo"),
  shareProgramText: document.querySelector("#shareProgramText"),
  shareBgPicker: document.querySelector("#shareBgPicker"),
  shareCloseButton: document.querySelector("#shareCloseButton"),
  sharePrimaryLabel: document.querySelector("#sharePrimaryLabel"),
  shareLit: document.querySelector("#shareLit"),
  shareUsdLabel: document.querySelector("#shareUsdLabel"),
  shareUsd: document.querySelector("#shareUsd"),
  sharePnl: document.querySelector("#sharePnl"),
  shareNetProfit: document.querySelector("#shareNetProfit"),
  sharePrice: document.querySelector("#sharePrice"),
  sharePriceLabel: document.querySelector("#sharePriceLabel"),
  shareValuePoint: document.querySelector("#shareValuePoint"),
  saveCardButton: document.querySelector("#saveCardButton"),
  copyCardButton: document.querySelector("#copyCardButton"),
  shareXButton: document.querySelector("#shareXButton"),
  coffeeButton: document.querySelector("#coffeeButton"),
  coffeeModal: document.querySelector("#coffeeModal"),
  coffeeCloseButton: document.querySelector("#coffeeCloseButton"),
  evmWalletLabel: document.querySelector("#evmWalletLabel"),
  solanaWalletLabel: document.querySelector("#solanaWalletLabel"),
  walletCopyButtons: document.querySelectorAll("[data-wallet-copy]"),
};

const wheelSlots = [
  { title: "Sector 01", text: "Time to check VOOI Arbitrage Desk." },
  { title: "Sector 02", text: "A good day to farm points and post results." },
  { title: "Sector 03", text: "Touch grass. You spent too much time at the desk." },
  { title: "Sector 04", text: "A good day for a delta-neutral setup." },
  { title: "Sector 05", text: "Less volume. More intentional trades." },
  { title: "Sector 06", text: "Time to try a new perp DEX." },
  { title: "Sector 07", text: "Check X. New alpha might be hiding in plain sight." },
  { title: "Sector 08", text: "Today is for discipline, not dopamine." },
  { title: "Sector 09", text: "Your edge today is not forcing it." },
  { title: "Sector 10", text: "Maybe today is for learning, not earning." },
];

let wheelRotation = 0;
let latestWheelResult = null;

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});

const lastValidValues = new WeakMap();

function getStoredTab() {
  try {
    return localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredTab(tabName) {
  try {
    localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, tabName);
  } catch {
    // The site should keep working even when browser storage is blocked.
  }
}

function tabFromHash() {
  const hash = window.location.hash.replace(/^#/, "").trim().toLowerCase();
  const [tabHash] = hash.split("/");
  return tabNameByHash[tabHash] ?? null;
}

function normalizeLegacyCalculatorHash() {
  const hash = window.location.hash.replace(/^#/, "").trim();
  if (!hash.toLowerCase().startsWith("lighter")) return;
  const [, dexHash] = hash.split("/");
  const nextHash = dexHash ? `#calculator/${dexHash}` : "#calculator/lighter";
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
}

function updateTabHash(tabName) {
  const calculatorDexHash = tabName === "calculator" ? `/${selectedDexHash()}` : "";
  const nextHash = tabHashByName[tabName] ? `#${tabHashByName[tabName]}${calculatorDexHash}` : window.location.pathname + window.location.search;
  const nextUrl = tabHashByName[tabName] ? `${window.location.pathname}${window.location.search}${nextHash}` : nextHash;

  if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
    window.history.replaceState(null, "", nextUrl);
  }
}

function selectedDexHash() {
  return (elements.dexSelect?.value || "Lighter").toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function dexFromHash() {
  const [, dexHash] = window.location.hash.replace(/^#/, "").trim().toLowerCase().split("/");
  if (!dexHash) return null;
  return Array.from(elements.dexSelect?.options || []).find((option) => selectedDexSlug(option.value) === dexHash)?.value ?? null;
}

function selectedDexSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function getStoredDex() {
  try {
    return localStorage.getItem(ACTIVE_DEX_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredDex(dexName) {
  try {
    localStorage.setItem(ACTIVE_DEX_STORAGE_KEY, dexName);
  } catch {
    // The calculator should still work if storage is unavailable.
  }
}

function numericValue(input) {
  const rawValue = input.value.trim();
  const value = Number(rawValue);

  if (rawValue !== "" && Number.isFinite(value) && value > 0) {
    lastValidValues.set(input, value);
    return value;
  }

  return lastValidValues.get(input) ?? 0;
}

function signedNumericValue(input) {
  const rawValue = input.value.trim();
  const value = Number(rawValue);

  if (rawValue !== "" && Number.isFinite(value)) {
    lastValidValues.set(input, value);
    return value;
  }

  return lastValidValues.get(input) ?? 0;
}

function formatLit(value) {
  return `${numberFormatter.format(value)} LIT`;
}

function formatLitPerPoint(value) {
  return `${compactNumberFormatter.format(value)} LIT / point`;
}

function formatPercent(value) {
  if (!Number.isFinite(value) || value <= 0) return "0.000000%";
  return `${value.toFixed(6)}%`;
}

function formatSignedCurrency(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${currencyFormatter.format(value)}`;
}

function formatPnlBreakdown(value) {
  const operator = value < 0 ? "-" : "+";
  return `Drop ${operator} ${currencyFormatter.format(Math.abs(value))} PnL`;
}

function formatCompact(value) {
  return compactFormatter.format(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function normalizeDexName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getStackDexAsset(name) {
  const normalizedName = normalizeDexName(name);
  if (!normalizedName) return null;
  return STACK_DEX_ASSETS.find((asset) => asset.keys.some((key) => normalizedName.includes(key))) ?? null;
}

function renderStackDexLabel(result) {
  return `
    <span class="stack-dex-label">
      ${result.logo ? `<img class="stack-dex-logo" src="${result.logo}" alt="" loading="lazy" />` : ""}
      <span>${escapeHtml(result.name)}</span>
    </span>
  `;
}

function selectedStackCardBackground() {
  return STACK_CARD_BACKGROUNDS[activeStackCardBackground] ?? STACK_CARD_BACKGROUNDS[0];
}

function selectedShareCardBackground() {
  return STACK_CARD_BACKGROUNDS[activeShareCardBackground] ?? STACK_CARD_BACKGROUNDS[0];
}

function applyCardBackground(card, picker, background, activeIndex) {
  if (!card) return;

  card.classList.toggle("has-image-bg", Boolean(background.src));
  if (background.src) {
    card.style.setProperty("--stack-card-bg", `url("${background.src}")`);
  } else {
    card.style.removeProperty("--stack-card-bg");
  }

  picker?.querySelectorAll(".stack-bg-choice").forEach((button, index) => {
    button.classList.toggle("active", index === activeIndex);
  });
}

function applyStackCardBackground() {
  const background = selectedStackCardBackground();
  applyCardBackground(elements.stackShareCard, elements.stackBgPicker, background, activeStackCardBackground);
}

function applyShareCardBackground() {
  const background = selectedShareCardBackground();
  applyCardBackground(elements.shareCard, elements.shareBgPicker, background, activeShareCardBackground);
}

function renderCardBgPicker(picker, onSelect, activeIndex) {
  if (!picker) return;
  picker.innerHTML = STACK_CARD_BACKGROUNDS.map((background, index) => {
    const style = background.src ? ` style="background-image: url('${background.src}')"` : "";
    return `<button class="stack-bg-choice${index === activeIndex ? " active" : ""}" type="button" data-card-bg="${index}" aria-label="Use ${background.name} background"${style}></button>`;
  }).join("");

  picker.querySelectorAll("[data-card-bg]").forEach((button) => {
    button.addEventListener("click", () => {
      onSelect(Number(button.dataset.cardBg) || 0);
    });
  });
}

function renderStackBgPicker() {
  renderCardBgPicker(elements.stackBgPicker, (index) => {
    activeStackCardBackground = index;
    applyStackCardBackground();
  }, activeStackCardBackground);
}

function renderShareBgPicker() {
  renderCardBgPicker(elements.shareBgPicker, (index) => {
    activeShareCardBackground = index;
    applyShareCardBackground();
  }, activeShareCardBackground);
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function clampToRange(input, value) {
  const min = Number(input.min);
  const max = Number(input.max);
  if (!Number.isFinite(value)) return Number(input.value) || 0;
  if (Number.isFinite(min) && value < min) return min;
  if (Number.isFinite(max) && value > max) return max;
  return value;
}

function updateRangeFill(range) {
  const min = Number(range.min) || 0;
  const max = Number(range.max) || 100;
  const value = Number(range.value) || 0;
  const fill = max > min ? ((value - min) / (max - min)) * 100 : 0;
  range.style.setProperty("--fill", `${Math.max(0, Math.min(100, fill))}%`);
}

function syncRangeFromInput(input, range) {
  range.value = clampToRange(range, numericValue(input));
  updateRangeFill(range);
}

function syncInputFromRange(input, range) {
  input.value = range.value;
  updateRangeFill(range);
}

function updateControlLabels() {
  const litPrice = numericValue(elements.litPrice);
  const totalPoints = numericValue(elements.manualTotalPoints);
  const mode = estimateModes[activeEstimateMode];
  const isSimpleDex = elements.dexSelect?.value !== "Lighter";

  elements.litPriceOutput.textContent = currencyFormatter.format(litPrice);
  elements.manualTotalPointsOutput.textContent = formatCompact(totalPoints);
  elements.rewardPoolLabel.textContent = `${numberFormatter.format(DEFAULT_REWARD_POOL_LIT)} LIT`;
  elements.userPointsLabel.textContent = isSimpleDex ? "Your Season Points" : mode.userPointsLabel;
  elements.tokenPriceLabel.textContent = isSimpleDex ? "OTC Price / Point" : "LIT Price";
  elements.estimatedAllocationLabel.textContent = isSimpleDex ? "Your Points" : "Estimated LIT Allocation";
  elements.estimatedUsdLabel.textContent = isSimpleDex ? "Estimated OTC Value" : "Estimated USD Value";
  elements.valuePerPointLabel.textContent = isSimpleDex ? "OTC Price / Point" : "Estimated Value per Point";
  if (elements.totalPointsLabel) elements.totalPointsLabel.textContent = mode.totalPointsLabel;
  elements.totalPointsRangeLabel.textContent = mode.totalPointsLabel;
  elements.totalPointsMinLabel.textContent = mode.minLabel;
  elements.totalPointsMaxLabel.textContent = mode.maxLabel;
  elements.userShareLabel.textContent = mode.userShareLabel;
}

function calculate() {
  if (elements.dexSelect?.value !== "Lighter") return calculateSimpleDex();

  applyAutoCalculatorValues();

  const userPoints = numericValue(elements.userPoints);
  const litPrice = numericValue(elements.litPrice);
  const tradingPnl = elements.includePnl.checked ? signedNumericValue(elements.tradingPnl) : 0;
  const rewardPoolLit = DEFAULT_REWARD_POOL_LIT;
  const totalSeasonPoints = numericValue(elements.manualTotalPoints);
  const userShare = totalSeasonPoints > 0 ? userPoints / totalSeasonPoints : 0;
  const estimatedLit = userShare * rewardPoolLit;
  const estimatedUsd = estimatedLit * litPrice;
  const netProfit = estimatedUsd + tradingPnl;
  const estimatedValuePerPointLit = totalSeasonPoints > 0 ? rewardPoolLit / totalSeasonPoints : 0;
  const estimatedValuePerPointUsd = estimatedValuePerPointLit * litPrice;

  elements.estimatedLit.textContent = formatLit(estimatedLit);
  elements.estimatedUsd.textContent = currencyFormatter.format(estimatedUsd);
  elements.netProfit.textContent = currencyFormatter.format(netProfit);
  elements.pnlBreakdown.textContent = formatPnlBreakdown(tradingPnl);
  elements.netProfit.closest(".result-card").classList.toggle("is-negative", netProfit < 0);
  elements.valuePerPointLit.textContent = formatLitPerPoint(estimatedValuePerPointLit);
  elements.valuePerPointUsd.textContent = `${currencyFormatter.format(estimatedValuePerPointUsd)} / point`;
  elements.userShare.textContent = formatPercent(userShare * 100);

  renderPriceScenarios(estimatedLit);
  renderChart(userPoints, rewardPoolLit, totalSeasonPoints, estimatedLit);
  updateControlLabels();
  updatePnlState();

  return {
    estimateMode: activeEstimateMode,
    userPoints,
    litPrice,
    tradingPnl,
    totalSeasonPoints,
    estimatedLit,
    estimatedUsd,
    netProfit,
    estimatedValuePerPointLit,
    estimatedValuePerPointUsd,
  };
}

function calculateSimpleDex() {
  updateSimpleDexInputs();

  const userPoints = numericValue(elements.userPoints);
  const otcPrice = numericValue(elements.litPrice);
  const tradingPnl = elements.includePnl.checked ? signedNumericValue(elements.tradingPnl) : 0;
  const estimatedUsd = userPoints * otcPrice;
  const netProfit = estimatedUsd + tradingPnl;

  elements.estimatedLit.textContent = `${numberFormatter.format(userPoints)} points`;
  elements.estimatedUsd.textContent = currencyFormatter.format(estimatedUsd);
  elements.netProfit.textContent = currencyFormatter.format(netProfit);
  elements.pnlBreakdown.textContent = formatPnlBreakdown(tradingPnl);
  elements.netProfit.closest(".result-card").classList.toggle("is-negative", netProfit < 0);
  elements.valuePerPointLit.textContent = `${currencyFormatter.format(otcPrice)} / point`;
  elements.valuePerPointUsd.textContent = "OTC value";
  elements.userShare.textContent = "-";
  updateControlLabels();
  updatePnlState();

  return {
    estimateMode: "season",
    userPoints,
    litPrice: otcPrice,
    tradingPnl,
    totalSeasonPoints: userPoints,
    estimatedLit: userPoints,
    estimatedUsd,
    netProfit,
    estimatedValuePerPointLit: otcPrice,
    estimatedValuePerPointUsd: otcPrice,
  };
}

function readStackNumber(card, selector, allowSigned = false) {
  const input = card.querySelector(selector);
  if (!input) return 0;
  const rawValue = input.value.trim();
  const value = Number(rawValue);
  if (rawValue === "" || !Number.isFinite(value)) return 0;
  return allowSigned ? value : Math.max(0, value);
}

function getStackCardResult(card) {
  const mode = card.querySelector(".stack-mode")?.value ?? "token";
  const name = card.querySelector(".stack-name")?.value.trim() || `DEX ${Number(card.dataset.stackDex || 0) + 1}`;
  const points = readStackNumber(card, ".stack-points");
  const pnl = readStackNumber(card, ".stack-pnl", true);
  let gross = 0;

  card.dataset.mode = mode;

  if (mode === "otc") {
    gross = points * readStackNumber(card, ".stack-otc-price");
  } else {
    const totalPoints = readStackNumber(card, ".stack-total-points");
    const rewardPool = readStackNumber(card, ".stack-reward-pool");
    const tokenPrice = readStackNumber(card, ".stack-token-price");
    gross = totalPoints > 0 ? (points / totalPoints) * rewardPool * tokenPrice : 0;
  }

  return {
    mode,
    name,
    logo: getStackDexAsset(name)?.logo ?? "",
    gross,
    pnl,
    net: gross + pnl,
  };
}

function setupStackNumberHints() {
  elements.stackDexCards.forEach((card) => {
    card.querySelectorAll("input[type='number']").forEach((input) => {
      if (input.nextElementSibling?.classList.contains("stack-number-hint")) return;
      const hint = document.createElement("small");
      hint.className = "stack-number-hint";
      input.insertAdjacentElement("afterend", hint);
    });
  });
}

function updateStackNumberHints() {
  elements.stackDexCards.forEach((card) => {
    card.querySelectorAll("input[type='number']").forEach((input) => {
      const hint = input.nextElementSibling;
      if (!hint?.classList.contains("stack-number-hint")) return;

      const value = Number(input.value);
      hint.textContent = input.value.trim() && Number.isFinite(value) ? `≈ ${formatCompact(value)}` : "";
    });
  });
}

function getStackVerdict(results, netValue) {
  const activeResults = results.filter((result) => result.gross > 0 || result.pnl !== 0);
  if (!activeResults.length) return "Add points to build your stack.";
  if (netValue < 0) return "PnL is eating the stack.";

  const winner = activeResults.reduce((best, result) => (result.net > best.net ? result : best), activeResults[0]);
  return `${winner.name} is carrying the stack.`;
}

function calculateStack() {
  if (!elements.stackDexCards.length) return null;

  updateStackNumberHints();
  const results = [...elements.stackDexCards].map(getStackCardResult);
  const gross = results.reduce((sum, result) => sum + result.gross, 0);
  const pnl = results.reduce((sum, result) => sum + result.pnl, 0);
  const net = gross + pnl;

  elements.stackHeroNet.textContent = currencyFormatter.format(net);
  elements.stackGrossValue.textContent = currencyFormatter.format(gross);
  elements.stackPnlValue.textContent = formatSignedCurrency(pnl);
  elements.stackPnlValue.closest(".result-card").classList.toggle("is-negative", pnl < 0);
  elements.stackNetValue.textContent = currencyFormatter.format(net);
  elements.stackNetValue.closest(".result-card").classList.toggle("is-negative", net < 0);
  elements.stackVerdict.textContent = getStackVerdict(results, net);
  elements.stackBreakdown.innerHTML = results
    .map(
      (result) => `
        <div class="table-row stack-breakdown-row">
          <span class="stack-breakdown-left">
            ${renderStackDexLabel(result)}
            <em>${result.mode === "otc" ? "OTC Price" : "Reward Pool"}</em>
          </span>
          <strong class="${result.net < 0 ? "is-negative" : "is-positive"}">${currencyFormatter.format(result.net)}</strong>
        </div>
      `,
    )
    .join("");

  return { results, gross, pnl, net };
}

function getStackShareText() {
  const stack = calculateStack();
  if (!stack) return "";

  return [
    `My Points Stack: ${currencyFormatter.format(stack.net)}`,
    "",
    ...stack.results.map((result) => `${result.name}: ${currencyFormatter.format(result.net)} (${result.mode === "otc" ? "OTC Price" : "Reward Pool"})`),
    `PnL: ${formatSignedCurrency(stack.pnl)}`,
    "",
    "Calculated on PerpHub.",
  ].join("\n");
}

function updateStackShareCard(stack) {
  const [first, second] = stack.results;

  elements.stackShareNet.textContent = currencyFormatter.format(stack.net);
  elements.stackShareNet.classList.toggle("is-negative", stack.net < 0);
  elements.stackShareDexOne.innerHTML = first ? renderStackDexLabel(first) : "DEX 1";
  elements.stackShareDexOneValue.textContent = currencyFormatter.format(first?.net ?? 0);
  elements.stackShareDexOneValue.classList.toggle("is-negative", (first?.net ?? 0) < 0);
  elements.stackShareDexTwo.innerHTML = second ? renderStackDexLabel(second) : "DEX 2";
  elements.stackShareDexTwoValue.textContent = currencyFormatter.format(second?.net ?? 0);
  elements.stackShareDexTwoValue.classList.toggle("is-negative", (second?.net ?? 0) < 0);
  elements.stackShareMeta.textContent = `Gross ${currencyFormatter.format(stack.gross)} · PnL ${formatSignedCurrency(stack.pnl)}`;
}

function openStackShareCard() {
  const stack = calculateStack();
  if (!stack) return;

  updateStackShareCard(stack);
  applyStackCardBackground();
  elements.stackShareModal.classList.remove("hidden");
  elements.stackShareModal.setAttribute("aria-hidden", "false");
}

function closeStackShareCard() {
  elements.stackShareModal.classList.add("hidden");
  elements.stackShareModal.setAttribute("aria-hidden", "true");
}

function chartValueForTotalPoints(totalPoints, litPrice, rewardPoolLit) {
  return totalPoints > 0 ? (rewardPoolLit / totalPoints) * litPrice : 0;
}

function renderChart(userPoints, rewardPoolLit, activeTotalPoints, activeValue) {
  const isCompactChart = window.matchMedia("(max-width: 620px)").matches;
  const mode = estimateModes[activeEstimateMode];
  const svg = elements.chartGrid.closest("svg");
  const left = isCompactChart ? 112 : 136;
  const right = isCompactChart ? 552 : 858;
  const top = isCompactChart ? 12 : 30;
  const bottom = isCompactChart ? 230 : 218;
  const width = right - left;
  const height = bottom - top;
  const viewBoxWidth = isCompactChart ? 580 : 900;
  const valueLabelSize = isCompactChart ? 18 : 16;
  const xLabelY = isCompactChart ? 254 : 246;
  const minPoints = mode.min;
  const maxPoints = mode.max;
  const safeActivePoints = Math.max(minPoints, Math.min(maxPoints, activeTotalPoints));
  const pointLevels = isCompactChart ? mode.compactLevels : mode.levels;
  const bars = [
    ...pointLevels.filter((points) => points !== safeActivePoints).map((points) => ({
      label: formatCompact(points),
      points,
      value: (userPoints / points) * rewardPoolLit,
      active: false,
    })),
    {
      label: "You",
      points: safeActivePoints,
      value: activeValue,
      active: true,
    },
  ].sort((a, b) => a.points - b.points);
  const maxValue = Math.max(...bars.map((bar) => bar.value)) * 1.08;
  const barGap = isCompactChart ? 14 : 16;
  const barWidth = Math.max(isCompactChart ? 38 : 28, (width - barGap * (bars.length - 1)) / bars.length);
  const gridValues = isCompactChart ? [maxValue, maxValue * 0.5, 0] : [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0];
  const y = (value) => bottom - (value / maxValue) * height;

  svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} 260`);

  elements.chartGrid.innerHTML = [
    ...gridValues.map((value) => {
      const gy = y(value).toFixed(1);
      return `<path class="grid-line" d="M${left} ${gy}H${right}" /><text class="axis-label" x="8" y="${Number(gy) + 5}">${formatLit(value)}</text>`;
    }),
    ...bars.map((bar, index) => {
      const x = left + index * (barWidth + barGap);
      const barTop = y(bar.value);
      const barHeight = bottom - barTop;
      const labelX = x + barWidth / 2;
      const valueLabelOffset = isCompactChart ? 12 : 18;
      const valueLabelMinY = top + (isCompactChart ? 18 : 8);
      const valueLabel = bar.active ? `<text class="chart-value-label" x="${labelX.toFixed(1)}" y="${Math.max(barTop - valueLabelOffset, valueLabelMinY).toFixed(1)}" style="font-size:${valueLabelSize}px">${formatLit(bar.value)}</text>` : "";

      return `
        <rect class="chart-bar${bar.active ? " active" : ""}" x="${x.toFixed(1)}" y="${barTop.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${barHeight.toFixed(1)}" rx="5" />
        ${valueLabel}
        <text class="axis-label chart-x-label${bar.active ? " active" : ""}" x="${labelX.toFixed(1)}" y="${xLabelY}">${bar.label}</text>
      `;
    }),
  ].join("");
}

function renderPriceScenarios(estimatedLit) {
  const prices = [1, 2, 3, 5, 10];
  elements.priceScenarios.innerHTML = prices
    .map(
      (price) => `
        <div class="table-row">
          <span>At $${price}</span>
          <strong>${currencyFormatter.format(estimatedLit * price)}</strong>
        </div>
      `,
    )
    .join("");
}

function getShareText(result) {
  if (elements.dexSelect?.value !== "Lighter") {
    const dexName = elements.dexSelect?.value || "DEX";

    return [
      `${dexName} Estimate`,
      "",
      `Season Points: ${numberFormatter.format(result.userPoints)}`,
      `OTC Price / Point: ${currencyFormatter.format(result.litPrice)}`,
      `Estimated Value: ${currencyFormatter.format(result.estimatedUsd)}`,
      `Trading PnL: ${formatSignedCurrency(result.tradingPnl)}`,
      `Net Profit: ${currencyFormatter.format(result.netProfit)}`,
    ].join("\n");
  }

  const mode = estimateModes[result.estimateMode];

  return [
    "Lighter x Robinhood Estimate",
    "",
    `${mode.sharePointsLabel}: ${numberFormatter.format(result.userPoints)}`,
    `${mode.shareTotalTextLabel}: ${numberFormatter.format(result.totalSeasonPoints)}`,
    `Estimated LIT: ${formatLit(result.estimatedLit)}`,
    `LIT Price: ${currencyFormatter.format(result.litPrice)}`,
    `Estimated Value: ${currencyFormatter.format(result.estimatedUsd)}`,
    `Trading PnL: ${formatSignedCurrency(result.tradingPnl)}`,
    `Net Profit: ${currencyFormatter.format(result.netProfit)}`,
    `Estimated Value Per Point: ${currencyFormatter.format(result.estimatedValuePerPointUsd)}`,
  ].join("\n");
}

function getXShareText(result) {
  if (elements.dexSelect?.value !== "Lighter") {
    const dexName = elements.dexSelect?.value || "DEX";
    return `My ${dexName} points estimate: ${numberFormatter.format(result.userPoints)} points / ${currencyFormatter.format(result.estimatedUsd)}. Net incl. PnL: ${currencyFormatter.format(result.netProfit)}.\nCalculated on PerpHub.`;
  }

  return `My Lighter points estimate: ${formatLit(result.estimatedLit)} / ${currencyFormatter.format(result.estimatedUsd)}. Net incl. PnL: ${currencyFormatter.format(result.netProfit)}.\nCalculated on PerpHub.`;
}

function selectedCalculatorBrand() {
  return calculatorDexBrands[elements.dexSelect?.value || "Lighter"] ?? calculatorDexBrands.Lighter;
}

function updateDexMenu() {
  const selectedDex = elements.dexSelect?.value || "Lighter";
  const optionButton = Array.from(elements.dexMenuOptions || []).find((button) => button.dataset.dexOption === selectedDex);
  const logo = optionButton?.querySelector("img")?.getAttribute("src") || "lighterlogo.jpg";

  elements.dexMenuLogo.src = logo;
  elements.dexMenuLabel.textContent = selectedDex;
  elements.dexMenuOptions.forEach((button) => {
    button.classList.toggle("active", button.dataset.dexOption === selectedDex);
  });
}

function updateShareCard(result) {
  const isLighter = elements.dexSelect?.value === "Lighter";
  const brand = selectedCalculatorBrand();

  elements.shareCard.classList.toggle("simple-dex-share", !isLighter);
  elements.sharePrimaryLabel.textContent = isLighter ? "Estimated LIT Allocation" : "USD Airdrop";
  elements.shareLit.textContent = isLighter ? formatLit(result.estimatedLit) : currencyFormatter.format(result.estimatedUsd);
  elements.shareUsdLabel.textContent = isLighter ? "USD Drop" : "Season Points";
  elements.shareUsd.textContent = isLighter ? currencyFormatter.format(result.estimatedUsd) : `${numberFormatter.format(result.userPoints)} points`;
  elements.sharePnl.textContent = formatSignedCurrency(result.tradingPnl);
  elements.shareNetProfit.textContent = currencyFormatter.format(result.netProfit);
  elements.sharePriceLabel.textContent = isLighter ? "LIT Price" : "OTC Price / Point";
  elements.sharePrice.textContent = currencyFormatter.format(result.litPrice);
  elements.shareValuePoint.textContent = isLighter ? formatLitPerPoint(result.estimatedValuePerPointLit) : `${currencyFormatter.format(result.litPrice)} / point`;
  elements.shareProgramLogo.alt = brand.label;
  elements.shareProgramLogo.classList.toggle("hidden", !brand.logo);
  elements.shareProgramText.classList.toggle("hidden", isLighter);
  elements.shareProgramText.textContent = brand.label;
  if (brand.logo) {
    elements.shareProgramLogo.src = brand.logo;
  }
}

function openShareCard() {
  const result = calculate();
  updateShareCard(result);
  applyShareCardBackground();
  elements.shareModal.classList.remove("hidden");
  elements.shareModal.setAttribute("aria-hidden", "false");
}

function closeShareCard() {
  elements.shareModal.classList.add("hidden");
  elements.shareModal.setAttribute("aria-hidden", "true");
}

function openCoffeeModal() {
  elements.coffeeModal.classList.remove("hidden");
  elements.coffeeModal.setAttribute("aria-hidden", "false");
}

function closeCoffeeModal() {
  elements.coffeeModal.classList.add("hidden");
  elements.coffeeModal.setAttribute("aria-hidden", "true");
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function fitText(ctx, text, maxWidth, startSize, weight = 800) {
  let size = startSize;
  do {
    ctx.font = `${weight} ${size}px Menlo, monospace`;
    size -= 2;
  } while (ctx.measureText(text).width > maxWidth && size > 24);
}

async function drawShareCard(result) {
  const isLighter = elements.dexSelect?.value === "Lighter";
  const brand = selectedCalculatorBrand();
  const primaryLabel = isLighter ? "Estimated LIT Allocation" : "USD Airdrop";
  const primaryValue = isLighter ? formatLit(result.estimatedLit) : currencyFormatter.format(result.estimatedUsd);
  const priceLabel = isLighter ? "LIT Price" : "OTC Price";
  const footerValue = isLighter ? formatLitPerPoint(result.estimatedValuePerPointLit) : `${currencyFormatter.format(result.litPrice)} / point`;
  const canvas = document.createElement("canvas");
  const scale = 2;
  const width = 728;
  const height = 420;
  const ctx = canvas.getContext("2d");
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);
  const background = selectedShareCardBackground();
  const backgroundImage = background.src ? await loadImage(background.src) : null;

  if (backgroundImage) {
    drawCoverImage(ctx, backgroundImage, 0, 0, width, height);
    ctx.fillStyle = "rgba(7, 9, 10, 0.56)";
    ctx.fillRect(0, 0, width, height);
    const shade = ctx.createLinearGradient(0, 0, width, 0);
    shade.addColorStop(0, "rgba(7, 9, 10, 0.34)");
    shade.addColorStop(1, "rgba(7, 9, 10, 0)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
  } else {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#07090a");
    gradient.addColorStop(0.54, "#111113");
    gradient.addColorStop(1, "#12230c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  const glow = ctx.createRadialGradient(width * 0.86, height * 0.12, 0, width * 0.86, height * 0.12, 260);
  glow.addColorStop(0, backgroundImage ? "rgba(204, 255, 0, 0.12)" : "rgba(204, 255, 0, 0.2)");
  glow.addColorStop(1, "rgba(204, 255, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(204, 255, 0, 0.034)";
  for (let x = Math.floor(width * 0.34); x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const logo = await loadImage("perphubbbbb.png");
  if (logo) {
    ctx.drawImage(logo, 34, 2, 120, 48);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 24px Menlo, monospace";
    ctx.fillText("PerpHub", 34, 32);
  }

  const programLogo = brand.logo ? await loadImage(brand.logo) : null;
  if (programLogo && isLighter) {
    ctx.drawImage(programLogo, width - 254, -2, 220, 74);
  } else if (programLogo) {
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 20px Menlo, monospace";
    const textWidth = ctx.measureText(brand.label).width;
    const logoSize = 24;
    const right = width - 34;
    const logoX = right - textWidth - 10 - logoSize;
    ctx.drawImage(programLogo, logoX, 16, logoSize, logoSize);
    ctx.fillText(brand.label, right, 36);
    ctx.textAlign = "left";
  } else {
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 20px Menlo, monospace";
    ctx.fillText(brand.label, width - 34, 36);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
  ctx.font = "800 13px Menlo, monospace";
  ctx.fillText(primaryLabel, 34, 154);
  ctx.fillStyle = "#ccff00";
  fitText(ctx, primaryValue, width - 68, 70, 800);
  ctx.fillText(primaryValue, 34, 238);

  const metrics = [
    [isLighter ? "USD Drop" : "Season Points", isLighter ? currencyFormatter.format(result.estimatedUsd) : `${numberFormatter.format(result.userPoints)} points`],
    ["Trading PnL", formatSignedCurrency(result.tradingPnl)],
    ["Net Profit", currencyFormatter.format(result.netProfit)],
    [priceLabel, currencyFormatter.format(result.litPrice)],
  ];
  metrics.forEach(([label, value], index) => {
    const x = 34 + index * 170;
    const y = 324;
    ctx.fillStyle = "rgba(255, 255, 255, 0.46)";
    ctx.font = "800 12px Menlo, monospace";
    ctx.fillText(label, x, y);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 18px Menlo, monospace";
    ctx.fillText(value, x, y + 30);
  });

  ctx.fillStyle = "rgba(255, 255, 255, 0.44)";
  ctx.font = "800 12px Menlo, monospace";
  ctx.fillText(footerValue, 34, height - 30);
  ctx.textAlign = "right";
  ctx.fillText("perp-hub.com", width - 34, height - 30);
  ctx.textAlign = "left";

  return canvas;
}

function downloadCanvas(canvas) {
  const link = document.createElement("a");
  link.download = "perphub-lighter-share-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function downloadCanvasAs(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

async function copyShareImage() {
  const result = calculate();
  const canvas = await drawShareCard(result);
  const blob = await canvasToBlob(canvas);

  try {
    if (!blob || !navigator.clipboard || !window.ClipboardItem) throw new Error("Clipboard image is unavailable");
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    elements.copyCardButton.textContent = "Copied";
  } catch {
    downloadCanvas(canvas);
    elements.copyCardButton.textContent = "Saved";
  }

  setTimeout(() => {
    elements.copyCardButton.textContent = "Copy Image";
  }, 1400);
}

async function saveShareImage() {
  downloadCanvas(await drawShareCard(calculate()));
}

function shareOnX() {
  const result = calculate();
  const text = encodeURIComponent(getXShareText(result));
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank", "noopener,noreferrer");
}

async function drawStackShareCard(stack) {
  const canvas = document.createElement("canvas");
  const scale = 2;
  const width = 728;
  const height = 420;
  const ctx = canvas.getContext("2d");
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);
  const background = selectedStackCardBackground();
  const backgroundImage = background.src ? await loadImage(background.src) : null;

  if (backgroundImage) {
    drawCoverImage(ctx, backgroundImage, 0, 0, width, height);
    ctx.fillStyle = "rgba(7, 9, 10, 0.56)";
    ctx.fillRect(0, 0, width, height);
    const shade = ctx.createLinearGradient(0, 0, width, 0);
    shade.addColorStop(0, "rgba(7, 9, 10, 0.34)");
    shade.addColorStop(1, "rgba(7, 9, 10, 0)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
  } else {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#07090a");
    gradient.addColorStop(0.56, "#111113");
    gradient.addColorStop(1, "#12230c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  const glow = ctx.createRadialGradient(width * 0.84, height * 0.12, 0, width * 0.84, height * 0.12, 260);
  glow.addColorStop(0, backgroundImage ? "rgba(204, 255, 0, 0.12)" : "rgba(204, 255, 0, 0.2)");
  glow.addColorStop(1, "rgba(204, 255, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(204, 255, 0, 0.034)";
  for (let x = Math.floor(width * 0.34); x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const logo = await loadImage("perphubbbbb.png");
  if (logo) {
    ctx.drawImage(logo, 34, 8, 120, 48);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 24px Menlo, monospace";
    ctx.fillText("PerpHub", 34, 38);
  }

  ctx.fillStyle = "#ccff00";
  ctx.font = "900 14px Menlo, monospace";
  ctx.textAlign = "right";
  ctx.fillText("POINTS STACK", width - 34, 38);
  ctx.textAlign = "left";

  ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
  ctx.font = "800 13px Menlo, monospace";
  ctx.fillText("Total Net Value", 34, 148);
  ctx.fillStyle = stack.net < 0 ? "#ff7b7b" : "#ccff00";
  fitText(ctx, currencyFormatter.format(stack.net), width - 68, 74, 900);
  ctx.fillText(currencyFormatter.format(stack.net), 34, 236);

  for (const [index, result] of stack.results.slice(0, 2).entries()) {
    const x = 34 + index * 345;
    const y = 304;
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(x, y, 316, 58);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.075)";
    ctx.strokeRect(x, y, 316, 58);
    const dexLogo = result.logo ? await loadImage(result.logo) : null;
    if (dexLogo) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x + 14, y + 12, 22, 22, 6);
      ctx.clip();
      ctx.drawImage(dexLogo, x + 14, y + 12, 22, 22);
      ctx.restore();
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.46)";
    ctx.font = "800 12px Menlo, monospace";
    ctx.fillText(result.name, x + (dexLogo ? 44 : 14), y + 22);
    ctx.fillStyle = result.net < 0 ? "#ff7b7b" : "#57c0a6";
    ctx.font = "800 19px Menlo, monospace";
    ctx.textAlign = "right";
    ctx.fillText(currencyFormatter.format(result.net), x + 302, y + 38);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.44)";
  ctx.font = "800 12px Menlo, monospace";
  ctx.fillText(`Gross ${currencyFormatter.format(stack.gross)} · PnL ${formatSignedCurrency(stack.pnl)}`, 34, height - 30);
  ctx.textAlign = "right";
  ctx.fillText("perp-hub.com", width - 34, height - 30);
  ctx.textAlign = "left";

  return canvas;
}

async function saveStackShareImage() {
  downloadCanvasAs(await drawStackShareCard(calculateStack()), "perphub-points-stack-card.png");
}

async function copyStackShareImage() {
  const canvas = await drawStackShareCard(calculateStack());
  const blob = await canvasToBlob(canvas);

  try {
    if (!blob || !navigator.clipboard || !window.ClipboardItem) throw new Error("Clipboard image is unavailable");
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    elements.stackCopyCardButton.textContent = "Copied";
  } catch {
    downloadCanvasAs(canvas, "perphub-points-stack-card.png");
    elements.stackCopyCardButton.textContent = "Saved";
  }

  setTimeout(() => {
    elements.stackCopyCardButton.textContent = "Copy Image";
  }, 1400);
}

function shareStackOnX() {
  const text = encodeURIComponent(getStackShareText());
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank", "noopener,noreferrer");
}

async function copyResults() {
  const result = calculate();
  const text = getShareText(result);

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      copyWithFallback(text);
    }
    elements.copyButton.textContent = "Copied";
    setTimeout(() => {
      elements.copyButton.textContent = "Share";
    }, 1400);
  } catch {
    copyWithFallback(text);
    elements.copyButton.textContent = "Copied";
    setTimeout(() => {
      elements.copyButton.textContent = "Share";
    }, 1400);
  }
}

async function copyWallet(walletKey, button) {
  const wallet = DONATION_WALLETS[walletKey];
  const isPlaceholder = !wallet || wallet.startsWith("PASTE_");

  if (isPlaceholder) {
    button.textContent = "Add address";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1400);
    return;
  }

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(wallet);
    } else {
      copyWithFallback(wallet);
    }
    button.textContent = "Copied";
  } catch {
    copyWithFallback(wallet);
    button.textContent = "Copied";
  }

  setTimeout(() => {
    button.textContent = "Copy";
  }, 1400);
}

function copyWithFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function syncAllRanges() {
  syncRangeFromInput(elements.litPrice, elements.litPriceRange);
  syncRangeFromInput(elements.manualTotalPoints, elements.manualTotalPointsRange);
  updateControlLabels();
}

function bindSyncedControl(input, range) {
  input.addEventListener("input", () => {
    syncRangeFromInput(input, range);
    calculate();
  });

  range.addEventListener("input", () => {
    syncInputFromRange(input, range);
    calculate();
  });
}

function setTab(tabName, options = {}) {
  const targetTab = ["home", "calculator", "stack", "vooi", "boost", "wheel"].includes(tabName) ? tabName : "home";
  const previousTab = getStoredTab();

  elements.tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === targetTab);
  });
  elements.moreButtons.forEach((button) => {
    button.classList.toggle("active", targetTab === "stack" || targetTab === "wheel");
    button.setAttribute("aria-expanded", "false");
  });
  elements.moreMenus.forEach((menu) => {
    menu.classList.remove("open");
  });
  elements.burgerMenu?.classList.remove("open");
  elements.burgerButton?.setAttribute("aria-expanded", "false");

  elements.homeTab.classList.toggle("active", targetTab === "home");
  elements.calculatorTab.classList.toggle("active", targetTab === "calculator");
  elements.stackTab.classList.toggle("active", targetTab === "stack");
  elements.vooiTab.classList.toggle("active", targetTab === "vooi");
  elements.boostTab.classList.toggle("active", targetTab === "boost");
  elements.wheelTab.classList.toggle("active", targetTab === "wheel");
  setStoredTab(targetTab);

  if (options.updateHash !== false) {
    updateTabHash(targetTab);
  }

  if (targetTab === "vooi") {
    loadVooiVideo();
  }

  if (previousTab && previousTab !== targetTab) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function spinWheel() {
  if (!elements.fortuneWheel || !elements.wheelSpinButton) return;

  const slotIndex = Math.floor(Math.random() * wheelSlots.length);
  const slotSize = 360 / wheelSlots.length;
  const slotCenter = slotIndex * slotSize;
  const randomOffset = (Math.random() - 0.5) * (slotSize * 0.62);
  const targetAngle = (360 - slotCenter - randomOffset) % 360;
  const currentAngle = ((wheelRotation % 360) + 360) % 360;
  const fullTurns = 2160 + Math.floor(Math.random() * 3) * 360;
  const spinDistance = fullTurns + ((targetAngle - currentAngle + 360) % 360);
  wheelRotation += spinDistance;

  elements.wheelSpinButton.disabled = true;
  elements.wheelStage?.classList.add("is-spinning");
  elements.wheelResultCard?.classList.add("hidden");
  elements.fortuneWheel.style.transform = `rotate(${wheelRotation}deg)`;

  window.setTimeout(() => {
    latestWheelResult = wheelSlots[slotIndex];
    elements.wheelResultTitle.textContent = latestWheelResult.title;
    elements.wheelResultText.textContent = latestWheelResult.text;
    elements.wheelResultText.classList.toggle("long", latestWheelResult.text.length > 42);
    elements.wheelResultCard?.classList.remove("hidden");
    elements.wheelSpinButton.disabled = false;
    elements.wheelStage?.classList.remove("is-spinning");
  }, 5300);
}

function shareWheelResult() {
  if (!latestWheelResult) return;

  const text = encodeURIComponent(`${latestWheelResult.title}: ${latestWheelResult.text}\nSpun on PerpHub.`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank", "noopener,noreferrer");
}

function closeWheelResultCard() {
  elements.wheelResultCard?.classList.add("hidden");
}

function getCanvasTextLines(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
      return;
    }

    if (line) lines.push(line);
    line = word;
  });

  if (line) lines.push(line);
  return lines;
}

function fitCanvasWrappedText(ctx, text, maxWidth, startSize, minSize, maxLines) {
  let size = startSize;
  let lines = [];

  do {
    ctx.font = `800 ${size}px Menlo, monospace`;
    lines = getCanvasTextLines(ctx, text, maxWidth);
    if (lines.length <= maxLines) break;
    size -= 2;
  } while (size >= minSize);

  return { size, lines };
}

async function drawWheelCard(result) {
  const canvas = document.createElement("canvas");
  const scale = 2;
  const width = 728;
  const height = 420;
  const ctx = canvas.getContext("2d");
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#07090a");
  gradient.addColorStop(0.58, "#111113");
  gradient.addColorStop(1, "#101f08");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * 0.84, height * 0.16, 0, width * 0.84, height * 0.16, 270);
  glow.addColorStop(0, "rgba(204, 255, 0, 0.22)");
  glow.addColorStop(1, "rgba(204, 255, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(204, 255, 0, 0.034)";
  for (let x = Math.floor(width * 0.34); x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const logo = await loadImage("perphubbbbb.png");
  if (logo) {
    ctx.drawImage(logo, 34, 22, 120, 48);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 24px Menlo, monospace";
    ctx.fillText("PerpHub", 34, 52);
  }

  ctx.fillStyle = "rgba(204, 255, 0, 0.12)";
  ctx.beginPath();
  ctx.arc(width - 92, 86, 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(204, 255, 0, 0.42)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#ccff00";
  ctx.font = "900 26px Menlo, monospace";
  ctx.textAlign = "center";
  ctx.fillText(result.title.replace("Sector ", "#"), width - 92, 95);
  ctx.textAlign = "left";

  ctx.fillStyle = "rgba(255, 255, 255, 0.52)";
  ctx.font = "800 13px Menlo, monospace";
  ctx.fillText("PERP WHEEL RESULT", 34, 146);
  ctx.fillStyle = "#ccff00";
  ctx.font = "900 52px Menlo, monospace";
  ctx.fillText(result.title, 34, 212);

  ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
  const fittedText = fitCanvasWrappedText(ctx, result.text, width - 68, 28, 20, 3);
  ctx.font = `800 ${fittedText.size}px Menlo, monospace`;
  fittedText.lines.slice(0, 3).forEach((line, index) => {
    ctx.fillText(line, 34, 266 + index * (fittedText.size + 9));
  });

  ctx.fillStyle = "rgba(255, 255, 255, 0.44)";
  ctx.font = "800 12px Menlo, monospace";
  ctx.fillText("Spin before you overtrade.", 34, height - 30);
  ctx.textAlign = "right";
  ctx.fillText("perp-hub.com", width - 34, height - 30);
  ctx.textAlign = "left";

  return canvas;
}

async function saveWheelImage() {
  if (!latestWheelResult) return;
  const canvas = await drawWheelCard(latestWheelResult);
  const link = document.createElement("a");
  link.download = "perphub-wheel-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function copyWheelImage() {
  if (!latestWheelResult) return;
  const canvas = await drawWheelCard(latestWheelResult);
  const blob = await canvasToBlob(canvas);

  try {
    if (!blob || !navigator.clipboard || !window.ClipboardItem) throw new Error("Clipboard image is unavailable");
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    elements.wheelCopyButton.textContent = "Copied";
  } catch {
    const link = document.createElement("a");
    link.download = "perphub-wheel-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    elements.wheelCopyButton.textContent = "Saved";
  }

  setTimeout(() => {
    elements.wheelCopyButton.textContent = "Copy Image";
  }, 1400);
}

function setControlMode(nextMode) {
  elements.inputsPanel.classList.toggle("slider-mode", nextMode === "sliders");
  elements.controlModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.controlMode === nextMode);
  });
}

function syncEstimateRangeSettings() {
  const mode = estimateModes[activeEstimateMode];

  elements.manualTotalPointsRange.min = mode.min;
  elements.manualTotalPointsRange.max = mode.max;
  elements.manualTotalPointsRange.step = mode.step;
  syncRangeFromInput(elements.manualTotalPoints, elements.manualTotalPointsRange);
}

function applyAutoCalculatorValues() {
  if (elements.dexSelect?.value === "Lighter" || activeCalculatorMode !== "auto") return;

  const weeks = Number(elements.autoWeeksRange?.value) || 1;
  elements.manualTotalPoints.value = AUTO_WEEKLY_POINTS * weeks;
  syncRangeFromInput(elements.manualTotalPoints, elements.manualTotalPointsRange);
  updateRangeFill(elements.autoWeeksRange);
  elements.autoWeeksOutput.textContent = `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  elements.autoAssumptionsLabel.textContent = "Uses average distribution of 100K points per week.";
}

function updateSimpleDexInputs() {
  const isCustomPrice = elements.customOtcPrice?.checked;
  const selectedDex = elements.dexSelect?.value || "";
  const dexDefaults = simpleDexDefaults[selectedDex] ?? { otcPrice: DEFAULT_OTC_PRICE_PER_POINT };

  elements.litPrice.disabled = !isCustomPrice;
  if (!isCustomPrice) elements.litPrice.value = dexDefaults.otcPrice;
  elements.litPriceOutput.textContent = currencyFormatter.format(numericValue(elements.litPrice));
}

function setCalculatorMode(nextMode) {
  if (elements.dexSelect?.value === "Lighter") {
    activeEstimateMode = estimateModes[nextMode] ? nextMode : "season";
    syncEstimateRangeSettings();
    updateCalculatorModeControls();
    calculate();
    return;
  }

  activeCalculatorMode = nextMode === "manual" ? "manual" : "auto";

  elements.inputsPanel.classList.toggle("auto-mode", activeCalculatorMode === "auto");
  updateCalculatorModeControls();

  calculate();
}

function updateCalculatorModeControls() {
  const isLighter = elements.dexSelect?.value === "Lighter";
  const labels = isLighter ? ["Season Total", "Weekly Pace"] : ["Auto", "Manual"];
  const modes = isLighter ? ["season", "weekly"] : ["auto", "manual"];
  const activeMode = isLighter ? activeEstimateMode : activeCalculatorMode;

  elements.inputsPanel.classList.toggle("auto-mode", false);
  elements.inputsPanel.classList.toggle("simple-dex-mode", !isLighter);
  elements.calculatorTab.classList.toggle("simple-dex", !isLighter);
  elements.calculatorModeButtons.forEach((button, index) => {
    button.textContent = labels[index];
    button.dataset.calculatorMode = modes[index];
    button.classList.toggle("active", modes[index] === activeMode);
  });
}

function updatePnlState() {
  const isEnabled = elements.includePnl.checked;

  elements.tradingPnl.disabled = !isEnabled;
  elements.tradingPnl.closest(".pnl-field").classList.toggle("is-disabled", !isEnabled);
}

function updateCalculatorTradeButton() {
  const selectedDex = elements.dexSelect?.value || "Lighter";
  const href = calculatorDexLinks[selectedDex];
  const currentTab = tabFromHash() ?? getStoredTab();

  setStoredDex(selectedDex);
  if (currentTab === "calculator") updateTabHash("calculator");

  if (selectedDex !== "Lighter") activeEstimateMode = "season";
  if (selectedDex === "Lighter") {
    elements.litPrice.disabled = false;
    if (numericValue(elements.litPrice) === DEFAULT_OTC_PRICE_PER_POINT) elements.litPrice.value = defaults.litPrice;
  } else {
    const dexDefaults = simpleDexDefaults[selectedDex];
    if (dexDefaults?.points) elements.userPoints.value = dexDefaults.points;
    if (!elements.customOtcPrice?.checked && dexDefaults?.otcPrice) elements.litPrice.value = dexDefaults.otcPrice;
  }

  elements.calculatorTradeButton.textContent = selectedDex === "Lighter" ? "Open Lighter x Robinhood" : `Open ${selectedDex}`;
  elements.calculatorTradeButton.href = href || "#";
  elements.calculatorTradeButton.classList.toggle("is-disabled", !href);
  elements.calculatorTradeButton.setAttribute("aria-disabled", String(!href));
  elements.rewardPoolLabel.closest(".pool-card").classList.toggle("is-hidden", selectedDex !== "Lighter");
  updateDexMenu();
  updateCalculatorModeControls();
  syncEstimateRangeSettings();
  calculate();
}

function applyStoredDex() {
  const nextDex = dexFromHash() ?? getStoredDex();
  const option = Array.from(elements.dexSelect?.options || []).find((item) => item.value === nextDex);
  if (option) elements.dexSelect.value = option.value;
}

function loadVooiVideo() {
  const videoId = elements.vooiVideo?.dataset.youtubeId;
  if (!videoId || elements.vooiVideo.querySelector("iframe")) return;

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0`;
  iframe.title = "VOOI Arbitrage Desk walkthrough";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;

  const mobileLink = document.createElement("a");
  mobileLink.className = "vooi-video-mobile-link";
  mobileLink.href = `https://www.youtube.com/watch?v=${videoId}`;
  mobileLink.target = "_blank";
  mobileLink.rel = "noreferrer";
  mobileLink.setAttribute("aria-label", "Watch VOOI walkthrough on YouTube");

  elements.vooiVideo.innerHTML = "";
  elements.vooiVideo.appendChild(iframe);
  elements.vooiVideo.appendChild(mobileLink);
}

function closeMoreMenus() {
  elements.moreMenus.forEach((menu) => menu.classList.remove("open"));
  elements.moreButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
}

function closeBurgerMenu() {
  elements.burgerMenu?.classList.remove("open");
  elements.burgerButton?.setAttribute("aria-expanded", "false");
}

function toggleMoreMenu(button) {
  const menu = button.closest(".more-menu");
  const shouldOpen = !menu.classList.contains("open");

  closeMoreMenus();
  menu.classList.toggle("open", shouldOpen);
  button.setAttribute("aria-expanded", String(shouldOpen));
}

function toggleBurgerMenu() {
  const shouldOpen = !elements.burgerMenu?.classList.contains("open");

  closeMoreMenus();
  elements.burgerMenu?.classList.toggle("open", shouldOpen);
  elements.burgerButton?.setAttribute("aria-expanded", String(shouldOpen));
}

elements.userPoints.addEventListener("input", calculate);
elements.includePnl.addEventListener("change", calculate);
elements.tradingPnl.addEventListener("input", calculate);
bindSyncedControl(elements.litPrice, elements.litPriceRange);
bindSyncedControl(elements.manualTotalPoints, elements.manualTotalPointsRange);
elements.copyButton.addEventListener("click", openShareCard);
elements.dexSelect?.addEventListener("change", updateCalculatorTradeButton);
elements.dexMenuButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  elements.dexMenu.classList.toggle("open");
  elements.dexMenuButton.setAttribute("aria-expanded", String(elements.dexMenu.classList.contains("open")));
});
elements.dexMenuOptions.forEach((button) => {
  button.addEventListener("click", () => {
    elements.dexSelect.value = button.dataset.dexOption;
    elements.dexMenu.classList.remove("open");
    elements.dexMenuButton.setAttribute("aria-expanded", "false");
    updateCalculatorTradeButton();
  });
});
elements.autoWeeksRange?.addEventListener("input", calculate);
elements.customOtcPrice?.addEventListener("change", calculate);
elements.shareCloseButton.addEventListener("click", closeShareCard);
elements.saveCardButton.addEventListener("click", saveShareImage);
elements.copyCardButton.addEventListener("click", copyShareImage);
elements.shareXButton.addEventListener("click", shareOnX);
elements.coffeeButton.addEventListener("click", openCoffeeModal);
elements.coffeeCloseButton.addEventListener("click", closeCoffeeModal);
elements.wheelSpinButton?.addEventListener("click", spinWheel);
elements.wheelSaveButton?.addEventListener("click", saveWheelImage);
elements.wheelCopyButton?.addEventListener("click", copyWheelImage);
elements.wheelShareButton?.addEventListener("click", shareWheelResult);
elements.wheelCardCloseButton?.addEventListener("click", closeWheelResultCard);
elements.wheelResultCard?.addEventListener("click", (event) => {
  if (event.target === elements.wheelResultCard) closeWheelResultCard();
});
elements.shareModal.addEventListener("click", (event) => {
  if (event.target === elements.shareModal) closeShareCard();
});
elements.stackShareModal?.addEventListener("click", (event) => {
  if (event.target === elements.stackShareModal) closeStackShareCard();
});
elements.coffeeModal.addEventListener("click", (event) => {
  if (event.target === elements.coffeeModal) closeCoffeeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeShareCard();
    closeStackShareCard();
    closeCoffeeModal();
    closeWheelResultCard();
    closeMoreMenus();
    closeBurgerMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".more-menu")) closeMoreMenus();
  if (!event.target.closest(".burger-menu")) closeBurgerMenu();
  if (!event.target.closest(".dex-menu")) {
    elements.dexMenu?.classList.remove("open");
    elements.dexMenuButton?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("resize", calculate);
window.addEventListener("resize", calculateStack);

elements.controlModeButtons.forEach((button) => {
  button.addEventListener("click", () => setControlMode(button.dataset.controlMode));
});

elements.calculatorModeButtons.forEach((button) => {
  button.addEventListener("click", () => setCalculatorMode(button.dataset.calculatorMode));
});

elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.tab));
});

elements.moreButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMoreMenu(button);
  });
});

elements.stackInputs.forEach((input) => {
  input.addEventListener("input", calculateStack);
  input.addEventListener("change", calculateStack);
});

elements.stackShareButton?.addEventListener("click", openStackShareCard);
elements.stackShareCloseButton?.addEventListener("click", closeStackShareCard);
elements.stackSaveCardButton?.addEventListener("click", saveStackShareImage);
elements.stackCopyCardButton?.addEventListener("click", copyStackShareImage);
elements.stackShareXButton?.addEventListener("click", shareStackOnX);

elements.burgerButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleBurgerMenu();
});

elements.mobileCoffeeButton?.addEventListener("click", () => {
  closeBurgerMenu();
  openCoffeeModal();
});

if (elements.homeLogoButton) {
  elements.homeLogoButton.addEventListener("click", () => setTab("home"));
}

elements.homeActionButtons.forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.homeTarget));
});

window.addEventListener("hashchange", () => {
  const nextTab = tabFromHash();
  if (nextTab) setTab(nextTab, { updateHash: false });
});

elements.evmWalletLabel.textContent = DONATION_WALLETS.evm;
elements.solanaWalletLabel.textContent = DONATION_WALLETS.solana;
elements.walletCopyButtons.forEach((button) => {
  button.addEventListener("click", () => copyWallet(button.dataset.walletCopy, button));
});

normalizeLegacyCalculatorHash();
applyStoredDex();
setTab(tabFromHash() ?? getStoredTab(), { updateHash: !tabFromHash() });
setCalculatorMode(activeCalculatorMode);
syncEstimateRangeSettings();
updateCalculatorTradeButton();
updatePnlState();
syncAllRanges();
calculate();
setupStackNumberHints();
renderShareBgPicker();
applyShareCardBackground();
renderStackBgPicker();
applyStackCardBackground();
calculateStack();
document.body.classList.remove("app-loading");
