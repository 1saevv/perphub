const DEFAULT_REWARD_POOL_LIT = 11000000;
const ACTIVE_TAB_STORAGE_KEY = "perphub.activeTab";

const defaults = {
  userPoints: 16.8,
  litPrice: 4.7,
  totalSeasonPoints: 250000,
  rewardPool: DEFAULT_REWARD_POOL_LIT,
};

const elements = {
  rewardPoolLabel: document.querySelector("#rewardPoolLabel"),
  userPoints: document.querySelector("#userPoints"),
  litPrice: document.querySelector("#litPrice"),
  litPriceRange: document.querySelector("#litPriceRange"),
  litPriceOutput: document.querySelector("#litPriceOutput"),
  rewardPool: document.querySelector("#rewardPool"),
  manualTotalPoints: document.querySelector("#manualTotalPoints"),
  manualTotalPointsRange: document.querySelector("#manualTotalPointsRange"),
  manualTotalPointsOutput: document.querySelector("#manualTotalPointsOutput"),
  estimatedLit: document.querySelector("#estimatedLit"),
  estimatedUsd: document.querySelector("#estimatedUsd"),
  valuePerPointLit: document.querySelector("#valuePerPointLit"),
  valuePerPointUsd: document.querySelector("#valuePerPointUsd"),
  userShare: document.querySelector("#userShare"),
  priceScenarios: document.querySelector("#priceScenarios"),
  copyButton: document.querySelector("#copyButton"),
  inputsPanel: document.querySelector(".inputs-panel"),
  controlModeButtons: document.querySelectorAll("[data-control-mode]"),
  tabButtons: document.querySelectorAll("[data-tab]"),
  homeLogoButton: document.querySelector("#homeLogoButton"),
  homeActionButtons: document.querySelectorAll("[data-home-target]"),
  vooiVideo: document.querySelector("#vooiVideo"),
  homeTab: document.querySelector("#homeTab"),
  calculatorTab: document.querySelector("#calculatorTab"),
  vooiTab: document.querySelector("#vooiTab"),
  boostTab: document.querySelector("#boostTab"),
  chartGrid: document.querySelector("#chartGrid"),
  shareModal: document.querySelector("#shareModal"),
  shareCloseButton: document.querySelector("#shareCloseButton"),
  shareLit: document.querySelector("#shareLit"),
  shareUsd: document.querySelector("#shareUsd"),
  sharePoints: document.querySelector("#sharePoints"),
  shareTotalPoints: document.querySelector("#shareTotalPoints"),
  sharePrice: document.querySelector("#sharePrice"),
  shareValuePoint: document.querySelector("#shareValuePoint"),
  saveCardButton: document.querySelector("#saveCardButton"),
  copyCardButton: document.querySelector("#copyCardButton"),
  shareXButton: document.querySelector("#shareXButton"),
};

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

function numericValue(input) {
  const rawValue = input.value.trim();
  const value = Number(rawValue);

  if (rawValue !== "" && Number.isFinite(value) && value > 0) {
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

function formatCompact(value) {
  return compactFormatter.format(value);
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

  elements.litPriceOutput.textContent = currencyFormatter.format(litPrice);
  elements.manualTotalPointsOutput.textContent = formatCompact(totalPoints);
  elements.rewardPoolLabel.textContent = `${numberFormatter.format(DEFAULT_REWARD_POOL_LIT)} LIT`;
}

function calculate() {
  const userPoints = numericValue(elements.userPoints);
  const litPrice = numericValue(elements.litPrice);
  const rewardPoolLit = DEFAULT_REWARD_POOL_LIT;
  const totalSeasonPoints = numericValue(elements.manualTotalPoints);
  const userShare = totalSeasonPoints > 0 ? userPoints / totalSeasonPoints : 0;
  const estimatedLit = userShare * rewardPoolLit;
  const estimatedUsd = estimatedLit * litPrice;
  const estimatedValuePerPointLit = totalSeasonPoints > 0 ? rewardPoolLit / totalSeasonPoints : 0;
  const estimatedValuePerPointUsd = estimatedValuePerPointLit * litPrice;

  elements.estimatedLit.textContent = formatLit(estimatedLit);
  elements.estimatedUsd.textContent = currencyFormatter.format(estimatedUsd);
  elements.valuePerPointLit.textContent = formatLitPerPoint(estimatedValuePerPointLit);
  elements.valuePerPointUsd.textContent = `${currencyFormatter.format(estimatedValuePerPointUsd)} / point`;
  elements.userShare.textContent = formatPercent(userShare * 100);

  renderPriceScenarios(estimatedLit);
  renderChart(userPoints, rewardPoolLit, totalSeasonPoints, estimatedLit);
  updateControlLabels();

  return {
    userPoints,
    litPrice,
    totalSeasonPoints,
    estimatedLit,
    estimatedUsd,
    estimatedValuePerPointLit,
    estimatedValuePerPointUsd,
  };
}

function chartValueForTotalPoints(totalPoints, litPrice, rewardPoolLit) {
  return totalPoints > 0 ? (rewardPoolLit / totalPoints) * litPrice : 0;
}

function renderChart(userPoints, rewardPoolLit, activeTotalPoints, activeValue) {
  const isCompactChart = window.matchMedia("(max-width: 620px)").matches;
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
  const minPoints = 100000;
  const maxPoints = 5000000;
  const safeActivePoints = Math.max(minPoints, Math.min(maxPoints, activeTotalPoints));
  const pointLevels = isCompactChart
    ? [100000, 500000, 1000000, 2000000, 5000000]
    : [100000, 250000, 500000, 1000000, 1500000, 2000000, 3000000, 5000000];
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
  return [
    "Lighter x Robinhood Estimate",
    "",
    `My Points: ${numberFormatter.format(result.userPoints)}`,
    `Estimated Total Points: ${numberFormatter.format(result.totalSeasonPoints)}`,
    `Estimated LIT: ${formatLit(result.estimatedLit)}`,
    `LIT Price: ${currencyFormatter.format(result.litPrice)}`,
    `Estimated Value: ${currencyFormatter.format(result.estimatedUsd)}`,
    `Estimated Value Per Point: ${currencyFormatter.format(result.estimatedValuePerPointUsd)}`,
  ].join("\n");
}

function getXShareText(result) {
  return `My Lighter points estimate: ${formatLit(result.estimatedLit)} / ${currencyFormatter.format(result.estimatedUsd)}.\nCalculated on PerpHub.`;
}

function updateShareCard(result) {
  elements.shareLit.textContent = formatLit(result.estimatedLit);
  elements.shareUsd.textContent = currencyFormatter.format(result.estimatedUsd);
  elements.sharePoints.textContent = numberFormatter.format(result.userPoints);
  elements.shareTotalPoints.textContent = formatCompact(result.totalSeasonPoints);
  elements.sharePrice.textContent = currencyFormatter.format(result.litPrice);
  elements.shareValuePoint.textContent = formatLitPerPoint(result.estimatedValuePerPointLit);
}

function openShareCard() {
  const result = calculate();
  updateShareCard(result);
  elements.shareModal.classList.remove("hidden");
  elements.shareModal.setAttribute("aria-hidden", "false");
}

function closeShareCard() {
  elements.shareModal.classList.add("hidden");
  elements.shareModal.setAttribute("aria-hidden", "true");
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
  gradient.addColorStop(0.54, "#111113");
  gradient.addColorStop(1, "#12230c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * 0.86, height * 0.12, 0, width * 0.86, height * 0.12, 260);
  glow.addColorStop(0, "rgba(204, 255, 0, 0.2)");
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

  const programLogo = await loadImage("logoRL.png");
  if (programLogo) {
    ctx.drawImage(programLogo, width - 254, 16, 220, 74);
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
  ctx.font = "800 13px Menlo, monospace";
  ctx.fillText("Estimated LIT Allocation", 34, 154);
  ctx.fillStyle = "#ccff00";
  fitText(ctx, formatLit(result.estimatedLit), width - 68, 70, 800);
  ctx.fillText(formatLit(result.estimatedLit), 34, 238);

  const metrics = [
    ["USD Value", currencyFormatter.format(result.estimatedUsd)],
    ["Your Points", numberFormatter.format(result.userPoints)],
    ["Total Points", formatCompact(result.totalSeasonPoints)],
    ["LIT Price", currencyFormatter.format(result.litPrice)],
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
  ctx.fillText(formatLitPerPoint(result.estimatedValuePerPointLit), 34, height - 30);
  ctx.textAlign = "right";
  ctx.fillText("perphub.xyz", width - 34, height - 30);
  ctx.textAlign = "left";

  return canvas;
}

function downloadCanvas(canvas) {
  const link = document.createElement("a");
  link.download = "perphub-lighter-share-card.png";
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

function setTab(tabName) {
  const targetTab = ["home", "calculator", "vooi", "boost"].includes(tabName) ? tabName : "home";
  const previousTab = getStoredTab();

  elements.tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === targetTab);
  });

  elements.homeTab.classList.toggle("active", targetTab === "home");
  elements.calculatorTab.classList.toggle("active", targetTab === "calculator");
  elements.vooiTab.classList.toggle("active", targetTab === "vooi");
  elements.boostTab.classList.toggle("active", targetTab === "boost");
  setStoredTab(targetTab);

  if (targetTab === "vooi") {
    loadVooiVideo();
  }

  if (previousTab && previousTab !== targetTab) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function setControlMode(nextMode) {
  elements.inputsPanel.classList.toggle("slider-mode", nextMode === "sliders");
  elements.controlModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.controlMode === nextMode);
  });
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

elements.userPoints.addEventListener("input", calculate);
bindSyncedControl(elements.litPrice, elements.litPriceRange);
bindSyncedControl(elements.manualTotalPoints, elements.manualTotalPointsRange);
elements.copyButton.addEventListener("click", openShareCard);
elements.shareCloseButton.addEventListener("click", closeShareCard);
elements.saveCardButton.addEventListener("click", saveShareImage);
elements.copyCardButton.addEventListener("click", copyShareImage);
elements.shareXButton.addEventListener("click", shareOnX);
elements.shareModal.addEventListener("click", (event) => {
  if (event.target === elements.shareModal) closeShareCard();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeShareCard();
});

window.addEventListener("resize", calculate);

elements.controlModeButtons.forEach((button) => {
  button.addEventListener("click", () => setControlMode(button.dataset.controlMode));
});

elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.tab));
});

if (elements.homeLogoButton) {
  elements.homeLogoButton.addEventListener("click", () => setTab("home"));
}

elements.homeActionButtons.forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.homeTarget));
});

setTab(getStoredTab());
syncAllRanges();
calculate();
