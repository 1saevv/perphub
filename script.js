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
const ACTIVE_LANGUAGE_STORAGE_KEY = "perphub.language";
const supportedLanguages = new Set(["en", "zh", "ja", "ko"]);
const languageHtmlCodes = {
  en: "en",
  zh: "zh-Hans",
  ja: "ja",
  ko: "ko",
};
const languageNames = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
};
const i18nText = {
  Home: { zh: "首页", ja: "ホーム", ko: "홈" },
  Calculator: { zh: "计算器", ja: "計算機", ko: "계산기" },
  Strategies: { zh: "策略", ja: "戦略", ko: "전략" },
  Competition: { zh: "竞赛", ja: "大会", ko: "대회" },
  More: { zh: "更多", ja: "その他", ko: "더보기" },
  "Points Stack": { zh: "积分组合", ja: "ポイントスタック", ko: "포인트 스택" },
  "Trading Programs & Incentives": { zh: "交易项目与激励", ja: "取引プログラムと報酬", ko: "거래 프로그램 및 인센티브" },
  "Referral links, boosts and active reward programs": { zh: "推荐链接、加成和进行中的奖励项目", ja: "紹介リンク、ブースト、実施中の報酬プログラム", ko: "추천 링크, 부스트, 진행 중인 보상 프로그램" },
  Points: { zh: "积分", ja: "ポイント", ko: "포인트" },
  Reward: { zh: "奖励", ja: "報酬", ko: "보상" },
  Rebate: { zh: "返佣", ja: "リベート", ko: "리베이트" },
  Boost: { zh: "加成", ja: "ブースト", ko: "부스트" },
  Fees: { zh: "手续费", ja: "手数料", ko: "수수료" },
  Weekly: { zh: "每周", ja: "毎週", ko: "주간" },
  perks: { zh: "权益", ja: "特典", ko: "혜택" },
  dex: { zh: "交易所", ja: "取引所", ko: "거래소" },
  aggregator: { zh: "聚合器", ja: "アグリゲーター", ko: "애그리게이터" },
  "fee deals": { zh: "费率优惠", ja: "手数料優遇", ko: "수수료 혜택" },
  All: { zh: "全部", ja: "すべて", ko: "전체" },
  "Search exchange": { zh: "搜索交易所", ja: "取引所を検索", ko: "거래소 검색" },
  "Search DEX": { zh: "搜索 DEX", ja: "DEXを検索", ko: "DEX 검색" },
  DEX: { zh: "交易所", ja: "取引所", ko: "거래소" },
  "Reward / Boost": { zh: "奖励 / 加成", ja: "報酬 / ブースト", ko: "보상 / 부스트" },
  Via: { zh: "来源", ja: "経由", ko: "경유" },
  Type: { zh: "类型", ja: "タイプ", ko: "유형" },
  Link: { zh: "链接", ja: "リンク", ko: "링크" },
  Direct: { zh: "直接", ja: "直接", ko: "직접" },
  Trade: { zh: "交易", ja: "取引", ko: "거래" },
  "Direct or VOOI": { zh: "直接或 VOOI", ja: "直接または VOOI", ko: "직접 또는 VOOI" },
  "Boost + fees": { zh: "加成 + 手续费", ja: "ブースト + 手数料", ko: "부스트 + 수수료" },
  "Fee discount": { zh: "手续费折扣", ja: "手数料割引", ko: "수수료 할인" },
  "Points boost": { zh: "积分加成", ja: "ポイントブースト", ko: "포인트 부스트" },
  "Weekly + fees": { zh: "每周 + 手续费", ja: "毎週 + 手数料", ko: "주간 + 수수료" },
  "Points + fees": { zh: "积分 + 手续费", ja: "ポイント + 手数料", ko: "포인트 + 수수료" },
  Auto: { zh: "自动", ja: "自動", ko: "자동" },
  Manual: { zh: "手动", ja: "手動", ko: "수동" },
  "Airdrop Calculator": { zh: "空投计算器", ja: "エアドロップ計算機", ko: "에어드롭 계산기" },
  "Estimate your points share, token allocation and USD value from one clean desk.": {
    zh: "在一个简洁面板中估算你的积分份额、代币分配和美元价值。",
    ja: "ポイント比率、トークン配分、USD価値をひとつの画面で見積もります。",
    ko: "하나의 깔끔한 화면에서 포인트 지분, 토큰 배정, USD 가치를 추정합니다.",
  },
  "Total reward pool": { zh: "总奖励池", ja: "総報酬プール", ko: "총 보상 풀" },
  Inputs: { zh: "输入", ja: "入力", ko: "입력" },
  "Auto mode": { zh: "自动模式", ja: "自動モード", ko: "자동 모드" },
  "Uses average distribution of 100K points per week.": {
    zh: "按每周平均分配 100K 积分计算。",
    ja: "週平均 100K ポイントの配分を使用します。",
    ko: "주당 평균 100K 포인트 분배를 사용합니다.",
  },
  "Your Points": { zh: "你的积分", ja: "あなたのポイント", ko: "내 포인트" },
  "Use custom OTC price (Updated 09.09.2026)": {
    zh: "使用自定义 OTC 价格（更新于 2026.09.09）",
    ja: "カスタム OTC 価格を使用（2026.09.09 更新）",
    ko: "사용자 OTC 가격 사용 (2026.09.09 업데이트)",
  },
  "LIT Price": { zh: "LIT 价格", ja: "LIT 価格", ko: "LIT 가격" },
  "Include Trading PnL": { zh: "包含交易盈亏", ja: "取引PnLを含める", ko: "거래 PnL 포함" },
  "Trading PnL": { zh: "交易盈亏", ja: "取引PnL", ko: "거래 PnL" },
  "Distribution weeks": { zh: "分配周数", ja: "配分週数", ko: "분배 주수" },
  "Estimated Total Season Points": { zh: "预计赛季总积分", ja: "推定シーズン総ポイント", ko: "예상 시즌 총 포인트" },
  "Estimated Airdrop": { zh: "预计空投", ja: "推定エアドロップ", ko: "예상 에어드롭" },
  Share: { zh: "份额", ja: "シェア", ko: "지분" },
  "Open Lighter x Robinhood": { zh: "打开 Lighter x Robinhood", ja: "Lighter x Robinhood を開く", ko: "Lighter x Robinhood 열기" },
  "Estimated LIT Allocation": { zh: "预计 LIT 分配", ja: "推定 LIT 配分", ko: "예상 LIT 배정" },
  "Estimated USD Value": { zh: "预计美元价值", ja: "推定USD価値", ko: "예상 USD 가치" },
  "Value per Point": { zh: "每积分价值", ja: "ポイント単価", ko: "포인트당 가치" },
  "Share of Total Points": { zh: "总积分占比", ja: "総ポイント比率", ko: "총 포인트 지분" },
  "Net Profit incl. PnL": { zh: "含 PnL 净收益", ja: "PnL込み純利益", ko: "PnL 포함 순이익" },
  "What if LIT price changes?": { zh: "如果 LIT 价格变化？", ja: "LIT価格が変わると？", ko: "LIT 가격이 변하면?" },
  "Combine reward-pool estimates and OTC point prices into one perp farming stack.": {
    zh: "把奖励池估算和 OTC 积分价格合并成一个永续合约积分组合。",
    ja: "報酬プールの見積もりとOTCポイント価格を、ひとつのポイント獲得スタックにまとめます。",
    ko: "보상 풀 추정치와 OTC 포인트 가격을 하나의 포인트 파밍 스택으로 합칩니다.",
  },
  "Stack net value": { zh: "组合净值", ja: "スタック純額", ko: "스택 순가치" },
  "Reward Pool": { zh: "奖励池", ja: "報酬プール", ko: "보상 풀" },
  "OTC Price": { zh: "OTC 价格", ja: "OTC価格", ko: "OTC 가격" },
  "Perp DEX": { zh: "永续合约交易所", ja: "Perp取引所", ko: "Perp 거래소" },
  "Total Points": { zh: "总积分", ja: "総ポイント", ko: "총 포인트" },
  "Token Price": { zh: "代币价格", ja: "トークン価格", ko: "토큰 가격" },
  "OTC Price / Point": { zh: "OTC 价格 / 积分", ja: "OTC価格 / ポイント", ko: "OTC 가격 / 포인트" },
  "Stack Results": { zh: "组合结果", ja: "スタック結果", ko: "스택 결과" },
  "Gross Points Value": { zh: "积分总价值", ja: "ポイント総価値", ko: "포인트 총가치" },
  "Total PnL": { zh: "总 PnL", ja: "総PnL", ko: "총 PnL" },
  "Total Net Value": { zh: "总净值", ja: "総純額", ko: "총 순가치" },
  "Add points to build your stack.": { zh: "添加积分来构建组合。", ja: "ポイントを追加してスタックを作成します。", ko: "포인트를 추가해 스택을 구성하세요." },
  "Perp Competitions & Campaigns": { zh: "永续合约竞赛与活动", ja: "Perp大会・キャンペーン", ko: "무기한 선물 대회 및 캠페인" },
  "Live and upcoming competitions, rewards, and campaigns from perp DEXs.": {
    zh: "来自永续合约交易所的进行中和即将开始的竞赛、奖励与活动。",
    ja: "Perp DEXの開催中・近日開催予定の大会、報酬、キャンペーン。",
    ko: "무기한 선물 DEX의 진행 중 및 예정 대회, 보상, 캠페인.",
  },
  "Competition details": { zh: "竞赛详情", ja: "大会詳細", ko: "대회 상세" },
  "Campaign details": { zh: "活动详情", ja: "キャンペーン詳細", ko: "캠페인 상세" },
  "Sep 16-30": { zh: "9月16日-30日", ja: "9月16日-30日", ko: "9월 16일-30일" },
  "Aug 24 - Oct 4": { zh: "8月24日 - 10月4日", ja: "8月24日 - 10月4日", ko: "8월 24일 - 10월 4일" },
  "Sep 15-29": { zh: "9月15日-29日", ja: "9月15日-29日", ko: "9월 15일-29일" },
  "VOOI competition": { zh: "VOOI 竞赛", ja: "VOOI大会", ko: "VOOI 대회" },
  "Trade ONDO perps through VOOI, climb the leaderboard and compete for a share of up to $15,000 in rewards.": {
    zh: "通过 VOOI 交易 ONDO 永续合约，冲击排行榜并争夺最高 $15,000 奖励份额。",
    ja: "VOOIでONDO Perpを取引し、ランキング上位を目指して最大15,000ドルの報酬を狙います。",
    ko: "VOOI에서 ONDO 무기한 선물을 거래하고 리더보드에 올라 최대 $15,000 보상 풀을 노리세요.",
  },
  "Ondo rewards": { zh: "Ondo 奖励", ja: "Ondo報酬", ko: "Ondo 보상" },
  "Eligible traders also join Ondo's weekly 175,000 USDC distribution.": {
    zh: "符合条件的交易者还可参与 Ondo 每周 175,000 USDC 分配。",
    ja: "対象トレーダーはOndoの週次175,000 USDC配分にも参加できます。",
    ko: "대상 트레이더는 Ondo의 주간 175,000 USDC 분배에도 참여합니다.",
  },
  "Possible strategy": { zh: "可能策略", ja: "戦略例", ko: "가능한 전략" },
  "Ondo x VOOI Trading Competition": { zh: "Ondo x VOOI 交易竞赛", ja: "Ondo x VOOI 取引大会", ko: "Ondo x VOOI 거래 대회" },
  "Trade ONDO perps on VOOI and grow the shared prize pool.": {
    zh: "在 VOOI 交易 ONDO 永续合约，扩大共享奖池。",
    ja: "VOOIでONDO Perpを取引し、共有賞金プールを拡大します。",
    ko: "VOOI에서 ONDO 무기한 선물을 거래하고 공동 상금 풀을 키우세요.",
  },
  "Earn rewards": { zh: "赚取奖励", ja: "報酬を獲得", ko: "보상 받기" },
  Ongoing: { zh: "进行中", ja: "開催中", ko: "진행 중" },
  "Lighter x Robinhood points": { zh: "Lighter x Robinhood 积分", ja: "Lighter x Robinhoodポイント", ko: "Lighter x Robinhood 포인트" },
  "How to earn": { zh: "如何赚取", ja: "獲得方法", ko: "획득 방법" },
  "Lighter on Robinhood Points": { zh: "Robinhood 上的 Lighter 积分", ja: "RobinhoodのLighterポイント", ko: "Robinhood의 Lighter 포인트" },
  "Trade now": { zh: "立即交易", ja: "今すぐ取引", ko: "지금 거래" },
  "SAI season 1": { zh: "SAI 第一季", ja: "SAIシーズン1", ko: "SAI 시즌 1" },
  "Farm points during SAI's first season while trading eligible perp markets.": {
    zh: "在 SAI 第一季交易符合条件的永续合约市场并赚取积分。",
    ja: "SAIシーズン1で対象Perp市場を取引しながらポイントを獲得します。",
    ko: "SAI 시즌 1 동안 대상 무기한 선물 시장을 거래하며 포인트를 적립하세요.",
  },
  Trading: { zh: "交易", ja: "取引", ko: "거래" },
  "1 pt / $1. Every dollar of notional volume.": {
    zh: "每 $1 名义交易量获得 1 积分。",
    ja: "想定取引量1ドルごとに1ポイント。",
    ko: "명목 거래량 $1당 1포인트.",
  },
  "USDC rewards": { zh: "USDC 奖励", ja: "USDC報酬", ko: "USDC 보상" },
  "Fee rebates": { zh: "手续费返佣", ja: "手数料リベート", ko: "수수료 리베이트" },
  "SAI Season 1 Points Competition": { zh: "SAI 第一季积分竞赛", ja: "SAIシーズン1ポイント大会", ko: "SAI 시즌 1 포인트 대회" },
  "Trade on SAI, farm season 1 points and compete for USDC rewards.": {
    zh: "在 SAI 交易，赚取第一季积分并竞争 USDC 奖励。",
    ja: "SAIで取引し、シーズン1ポイントを獲得してUSDC報酬を競います。",
    ko: "SAI에서 거래하고 시즌 1 포인트와 USDC 보상을 경쟁하세요.",
  },
  "Trading: 1 pt / $1 notional": { zh: "交易：每 $1 名义量 1 积分", ja: "取引：想定1ドルごとに1pt", ko: "거래: 명목 $1당 1pt" },
  "20% trading fee rebates": { zh: "20% 交易手续费返佣", ja: "取引手数料20%リベート", ko: "거래 수수료 20% 리베이트" },
  "Join SAI": { zh: "加入 SAI", ja: "SAIに参加", ko: "SAI 참여" },
  "Ondo Campaign": { zh: "Ondo 活动", ja: "Ondoキャンペーン", ko: "Ondo 캠페인" },
  "Trade on OndoPerps to earn weekly USDC rewards and points based on your trading activity.": {
    zh: "在 OndoPerps 交易，根据交易活动赚取每周 USDC 奖励和积分。",
    ja: "OndoPerpsで取引し、取引活動に応じて週次USDC報酬とポイントを獲得します。",
    ko: "OndoPerps에서 거래하고 활동에 따라 주간 USDC 보상과 포인트를 받으세요.",
  },
  "Join campaign": { zh: "参加活动", ja: "キャンペーン参加", ko: "캠페인 참여" },
  "RWA trading competition": { zh: "RWA 交易竞赛", ja: "RWA取引大会", ko: "RWA 거래 대회" },
  Scoring: { zh: "计分", ja: "スコア", ko: "점수 산정" },
  Leaderboard: { zh: "排行榜", ja: "ランキング", ko: "리더보드" },
  "Extended RWA Trading Competition": { zh: "Extended RWA 交易竞赛", ja: "Extended RWA取引大会", ko: "Extended RWA 거래 대회" },
  "Join competition": { zh: "参加竞赛", ja: "大会に参加", ko: "대회 참여" },
  "10% rebates": { zh: "10% 返佣", ja: "10%リベート", ko: "10% 리베이트" },
  "+15% points boost": { zh: "+15% 积分加成", ja: "+15%ポイントブースト", ko: "+15% 포인트 부스트" },
  "10% trading fee discount": { zh: "10% 交易手续费折扣", ja: "取引手数料10%割引", ko: "거래 수수료 10% 할인" },
  "120% rebate": { zh: "120% 返佣", ja: "120%リベート", ko: "120% 리베이트" },
  "4% discount": { zh: "4% 折扣", ja: "4%割引", ko: "4% 할인" },
  "+5% trading fee discount": { zh: "+5% 交易手续费折扣", ja: "取引手数料+5%割引", ko: "+5% 거래 수수료 할인" },
  "20% rebates": { zh: "20% 返佣", ja: "20%リベート", ko: "20% 리베이트" },
  "Points program": { zh: "积分项目", ja: "ポイントプログラム", ko: "포인트 프로그램" },
  "points program": { zh: "积分项目", ja: "ポイントプログラム", ko: "포인트 프로그램" },
  "+15% points boost / 10% fee discount": { zh: "+15% 积分加成 / 10% 手续费折扣", ja: "+15%ポイントブースト / 手数料10%割引", ko: "+15% 포인트 부스트 / 10% 수수료 할인" },
  "175,000 USDC / 5% fee discount": { zh: "175,000 USDC / 5% 手续费折扣", ja: "175,000 USDC / 手数料5%割引", ko: "175,000 USDC / 5% 수수료 할인" },
  "20% rebates / points program": { zh: "20% 返佣 / 积分项目", ja: "20%リベート / ポイントプログラム", ko: "20% 리베이트 / 포인트 프로그램" },
  "Your Season Points": { zh: "你的赛季积分", ja: "あなたのシーズンポイント", ko: "내 시즌 포인트" },
  "Your Share of Total Points": { zh: "你的总积分占比", ja: "総ポイントに対する比率", ko: "내 총 포인트 지분" },
  "Season Points": { zh: "赛季积分", ja: "シーズンポイント", ko: "시즌 포인트" },
  "Total Season": { zh: "赛季总量", ja: "シーズン総量", ko: "시즌 총량" },
  "Estimated Total Points": { zh: "预计总积分", ja: "推定総ポイント", ko: "예상 총 포인트" },
  "Your Avg Points / Week": { zh: "你的周均积分", ja: "あなたの週平均ポイント", ko: "내 주간 평균 포인트" },
  "All Users Avg Points / Week": { zh: "所有用户周均积分", ja: "全ユーザー週平均ポイント", ko: "전체 사용자 주간 평균 포인트" },
  "Your Share of Weekly Pace": { zh: "你的周节奏占比", ja: "週次ペースでの比率", ko: "내 주간 페이스 지분" },
  "Your Avg / Week": { zh: "你的周均", ja: "あなたの週平均", ko: "내 주간 평균" },
  "All Users / Week": { zh: "所有用户 / 周", ja: "全ユーザー / 週", ko: "전체 사용자 / 주" },
  "Season Total": { zh: "赛季总量", ja: "シーズン総量", ko: "시즌 총량" },
  "Weekly Pace": { zh: "每周节奏", ja: "週次ペース", ko: "주간 페이스" },
  "100K points": { zh: "100K 积分", ja: "100Kポイント", ko: "100K 포인트" },
  "5M points": { zh: "5M 积分", ja: "5Mポイント", ko: "5M 포인트" },
  "1K points": { zh: "1K 积分", ja: "1Kポイント", ko: "1K 포인트" },
  "500K points": { zh: "500K 积分", ja: "500Kポイント", ko: "500K 포인트" },
  "1 week": { zh: "1 周", ja: "1週間", ko: "1주" },
  "3 weeks": { zh: "3 周", ja: "3週間", ko: "3주" },
  "52 weeks": { zh: "52 周", ja: "52週間", ko: "52주" },
  "Estimated OTC Value": { zh: "预计 OTC 价值", ja: "推定OTC価値", ko: "예상 OTC 가치" },
  "Estimated Value per Point": { zh: "预计每积分价值", ja: "推定ポイント単価", ko: "예상 포인트당 가치" },
  "OTC value": { zh: "OTC 价值", ja: "OTC価値", ko: "OTC 가치" },
  "USD Airdrop": { zh: "USD 空投", ja: "USDエアドロップ", ko: "USD 에어드롭" },
  "USD Drop": { zh: "USD 空投", ja: "USDドロップ", ko: "USD 드롭" },
  "Estimated Value": { zh: "预计价值", ja: "推定価値", ko: "예상 가치" },
  "Estimated Value Per Point": { zh: "预计每积分价值", ja: "推定ポイント単価", ko: "예상 포인트당 가치" },
  "PnL is eating the stack.": { zh: "PnL 正在吞掉组合收益。", ja: "PnLがスタックを圧迫しています。", ko: "PnL이 스택 수익을 깎고 있습니다." },
  "Enter perp DEX name": { zh: "输入永续合约交易所名称", ja: "Perp DEX名を入力", ko: "Perp DEX 이름 입력" },
  "Enter your points amount": { zh: "输入你的积分数量", ja: "あなたのポイント数を入力", ko: "내 포인트 수량 입력" },
  "Enter total points amount": { zh: "输入总积分数量", ja: "総ポイント数を入力", ko: "총 포인트 수량 입력" },
  "Enter OTC price per point": { zh: "输入每积分 OTC 价格", ja: "ポイントあたりOTC価格を入力", ko: "포인트당 OTC 가격 입력" },
  "Use a delta-neutral setup in VOOI Arbitrage Desk, for example Robinhood + Ondo, to farm Robinhood points while joining Ondo rewards and the VOOI competition.": {
    zh: "在 VOOI Arbitrage Desk 使用 Delta 中性组合，例如 Robinhood + Ondo，一边赚取 Robinhood 积分，一边参与 Ondo 奖励和 VOOI 竞赛。",
    ja: "VOOI Arbitrage DeskでRobinhood + Ondoなどのデルタニュートラル構成を使い、Robinhoodポイントを獲得しながらOndo報酬とVOOI大会に参加できます。",
    ko: "VOOI Arbitrage Desk에서 Robinhood + Ondo 같은 델타 중립 구성을 사용해 Robinhood 포인트를 적립하면서 Ondo 보상과 VOOI 대회에 참여할 수 있습니다.",
  },
  "Keep trading activity on eligible Robinhood perp markets and track your points as the campaign continues.": {
    zh: "在符合条件的 Robinhood 永续合约市场保持交易，并随着活动推进追踪积分。",
    ja: "対象のRobinhood Perp市場で取引を続け、キャンペーン期間中にポイントを追跡します。",
    ko: "대상 Robinhood 무기한 선물 시장에서 거래 활동을 유지하고 캠페인 기간 동안 포인트를 추적하세요.",
  },
  "Competition rewards are paid in USDC for eligible participants.": {
    zh: "符合条件的参与者将以 USDC 获得竞赛奖励。",
    ja: "対象参加者には大会報酬がUSDCで支払われます。",
    ko: "대상 참가자는 대회 보상을 USDC로 받습니다.",
  },
  "How to earn USDC": { zh: "如何赚取 USDC", ja: "USDCの獲得方法", ko: "USDC 획득 방법" },
  "A fixed USDC reward pool is set at the start of each week. Your share is determined by your trading activity, and rewards are paid out 2 days after the week closes.": {
    zh: "每周开始时会设定固定 USDC 奖池。你的份额由交易活动决定，奖励会在该周结束 2 天后发放。",
    ja: "毎週開始時に固定USDC報酬プールが設定されます。配分は取引活動で決まり、週終了の2日後に支払われます。",
    ko: "매주 시작 시 고정 USDC 보상 풀이 설정됩니다. 내 지분은 거래 활동에 따라 결정되며, 보상은 주간 종료 2일 후 지급됩니다.",
  },
  "How to earn points": { zh: "如何赚取积分", ja: "ポイントの獲得方法", ko: "포인트 획득 방법" },
  "Points are distributed weekly from a fixed allocation. Your share is based on weekly trading activity, and points are credited shortly after the week ends.": {
    zh: "积分每周从固定额度中分配。你的份额基于每周交易活动，积分会在该周结束后不久记入。",
    ja: "ポイントは固定配分から毎週配布されます。配分は週次取引活動に基づき、週終了後まもなく付与されます。",
    ko: "포인트는 고정 배정량에서 매주 분배됩니다. 내 지분은 주간 거래 활동 기준이며, 포인트는 주간 종료 후 곧 적립됩니다.",
  },
  "5M points every week": { zh: "每周 5M 积分", ja: "毎週5Mポイント", ko: "매주 5M 포인트" },
  "$175,000 rewards pool": { zh: "$175,000 奖励池", ja: "$175,000報酬プール", ko: "$175,000 보상 풀" },
  "$2.5K -> $15,000 pool": { zh: "$2.5K -> $15,000 奖池", ja: "$2.5K -> $15,000賞金プール", ko: "$2.5K -> $15,000 풀" },
  "$15,000 pool": { zh: "$15,000 奖池", ja: "$15,000賞金プール", ko: "$15,000 풀" },
  "+ 175,000 USDC weekly by Ondo": { zh: "+ Ondo 每周 175,000 USDC", ja: "+ Ondoから毎週175,000 USDC", ko: "+ Ondo 주간 175,000 USDC" },
  "Trade perps on Lighter x Robinhood and earn points from the $11M LIT points pool.": {
    zh: "在 Lighter x Robinhood 交易永续合约，并从 $11M LIT 积分池中赚取积分。",
    ja: "Lighter x RobinhoodでPerpを取引し、$11M LITポイントプールからポイントを獲得します。",
    ko: "Lighter x Robinhood에서 무기한 선물을 거래하고 $11M LIT 포인트 풀에서 포인트를 받으세요.",
  },
  "Trade perps on Lighter x Robinhood and earn points from the LIT points pool.": {
    zh: "在 Lighter x Robinhood 交易永续合约，并从 LIT 积分池中赚取积分。",
    ja: "Lighter x RobinhoodでPerpを取引し、LITポイントプールからポイントを獲得します。",
    ko: "Lighter x Robinhood에서 무기한 선물을 거래하고 LIT 포인트 풀에서 포인트를 받으세요.",
  },
  "$11M LIT points pool": { zh: "$11M LIT 积分池", ja: "$11M LITポイントプール", ko: "$11M LIT 포인트 풀" },
  "Get 20% rebates on trading fees while the campaign is active.": {
    zh: "活动期间可获得 20% 交易手续费返佣。",
    ja: "キャンペーン期間中、取引手数料の20%リベートを受け取れます。",
    ko: "캠페인 기간 동안 거래 수수료 20% 리베이트를 받을 수 있습니다.",
  },
  "$50K prize pool": { zh: "$50K 奖池", ja: "$50K賞金プール", ko: "$50K 상금 풀" },
  "Trade RWA markets on Extended to participate in the competition and compete for the 50,000 USDC prize pool.": {
    zh: "在 Extended 交易 RWA 市场，参与竞赛并争夺 50,000 USDC 奖池。",
    ja: "ExtendedでRWA市場を取引し、50,000 USDC賞金プールを競います。",
    ko: "Extended에서 RWA 시장을 거래하고 50,000 USDC 상금 풀을 경쟁하세요.",
  },
  "Your score combines PnL, weighted volume and open interest using PnL x 4th root of weighted volume x OI.": {
    zh: "你的分数由 PnL、加权交易量和持仓量组成，公式为 PnL x 加权交易量四次方根 x OI。",
    ja: "スコアはPnL、加重出来高、建玉を組み合わせ、PnL x 加重出来高の4乗根 x OIで計算されます。",
    ko: "점수는 PnL, 가중 거래량, 미결제약정을 조합하며 PnL x 가중 거래량의 4제곱근 x OI로 계산됩니다.",
  },
  "The top 100 traders share the prize pool, and rankings update every minute.": {
    zh: "前 100 名交易者共享奖池，排名每分钟更新。",
    ja: "上位100名のトレーダーが賞金プールを分け合い、ランキングは毎分更新されます。",
    ko: "상위 100명 트레이더가 상금 풀을 공유하며 순위는 매분 업데이트됩니다.",
  },
  "Trade RWA markets on Extended and climb the leaderboard with PnL, weighted volume and open interest.": {
    zh: "在 Extended 交易 RWA 市场，用 PnL、加权交易量和持仓量冲击排行榜。",
    ja: "ExtendedでRWA市場を取引し、PnL、加重出来高、建玉でランキング上位を目指します。",
    ko: "Extended에서 RWA 시장을 거래하고 PnL, 가중 거래량, 미결제약정으로 리더보드에 오르세요.",
  },
  "Perp dashboards, calculators and farming tools.": {
    zh: "永续合约仪表盘、计算器和积分工具。",
    ja: "Perpダッシュボード、計算機、ポイント獲得ツール。",
    ko: "무기한 선물 대시보드, 계산기, 포인트 파밍 도구.",
  },
  "Farm perp points with VOOI": { zh: "用 VOOI 赚取永续合约积分", ja: "VOOIでPerpポイントを獲得", ko: "VOOI로 무기한 선물 포인트 파밍" },
  "Use VOOI to find delta-neutral setups across perp DEXs and turn hedged positions into points farming on": {
    zh: "使用 VOOI 在多个永续合约交易所中寻找 Delta 中性组合，把对冲仓位转化为积分收益：",
    ja: "VOOIで複数のPerp取引所にまたがるデルタニュートラル構成を見つけ、ヘッジポジションをポイント獲得につなげます：",
    ko: "VOOI로 여러 무기한 선물 거래소의 델타 중립 구성을 찾고, 헤지 포지션을 포인트 파밍으로 전환하세요:",
  },
  "and other ecosystems.": { zh: "以及其他生态系统。", ja: "その他のエコシステム。", ko: "및 기타 생태계." },
  "Strategy guide": { zh: "策略指南", ja: "戦略ガイド", ko: "전략 가이드" },
  "VOOI — What It Is & Why I Use It": { zh: "VOOI — 它是什么以及我为什么使用", ja: "VOOI — 概要と使う理由", ko: "VOOI — 무엇이고 왜 쓰는가" },
  "VOOI — What It Is &amp; Why I Use It": { zh: "VOOI — 它是什么以及我为什么使用", ja: "VOOI — 概要と使う理由", ko: "VOOI — 무엇이고 왜 쓰는가" },
  "Arbitrage Desk — How It Works": { zh: "Arbitrage Desk — 工作原理", ja: "Arbitrage Desk — 仕組み", ko: "Arbitrage Desk — 작동 방식" },
  "Delta-Neutral Points Farming Strategy": { zh: "Delta 中性积分策略", ja: "デルタニュートラル・ポイント獲得戦略", ko: "델타 중립 포인트 파밍 전략" },
  "How to Open & Manage the Position": { zh: "如何开仓和管理仓位", ja: "ポジションの建て方と管理", ko: "포지션 열기 및 관리" },
  "How to Open &amp; Manage the Position": { zh: "如何开仓和管理仓位", ja: "ポジションの建て方と管理", ko: "포지션 열기 및 관리" },
  "Risks & Important Notes": { zh: "风险和重要说明", ja: "リスクと重要事項", ko: "리스크 및 중요 사항" },
  "Risks &amp; Important Notes": { zh: "风险和重要说明", ja: "リスクと重要说明", ko: "리스크 및 중요 사항" },
  "VOOI is a perp DEX aggregator that brings multiple decentralized perpetual exchanges into one place. Instead of opening several platforms separately, you can use VOOI to access different markets and compare opportunities from a single interface.": {
    zh: "VOOI 是一个永续合约 DEX 聚合器，把多个去中心化永续合约交易所集中到一个界面里。你不用分别打开多个平台，可以直接在 VOOI 访问不同市场并比较机会。",
    ja: "VOOIは複数の分散型Perp取引所をひとつにまとめるPerp DEXアグリゲーターです。複数のプラットフォームを別々に開かず、VOOI上で市場にアクセスして機会を比較できます。",
    ko: "VOOI는 여러 탈중앙화 무기한 선물 거래소를 한곳에 모아주는 Perp DEX 애그리게이터입니다. 여러 플랫폼을 따로 열지 않고 VOOI에서 다양한 시장과 기회를 비교할 수 있습니다.",
  },
  "I’ve personally been using VOOI for more than two years, including while farming Lighter, Orderly, Overlay and other perp ecosystems.": {
    zh: "我个人已经使用 VOOI 超过两年，包括在参与 Lighter、Orderly、Overlay 和其他永续合约生态系统的积分活动时。",
    ja: "私はLighter、Orderly、OverlayなどのPerpエコシステムでポイントを獲得する中で、VOOIを2年以上使っています。",
    ko: "저는 Lighter, Orderly, Overlay 등 여러 Perp 생태계에서 포인트를 파밍하면서 VOOI를 2년 넘게 사용해 왔습니다.",
  },
  "For this strategy, the most useful part of VOOI is Arbitrage Desk.": {
    zh: "对于这个策略，VOOI 里最有用的部分是 Arbitrage Desk。",
    ja: "この戦略でVOOIの中でもっとも役立つのはArbitrage Deskです。",
    ko: "이 전략에서 VOOI의 가장 유용한 부분은 Arbitrage Desk입니다.",
  },
  "Start here": { zh: "从这里开始", ja: "ここから開始", ko: "여기서 시작" },
  "Arbitrage Desk is basically a scanner for potential delta-neutral setups across different perp DEXs.": {
    zh: "Arbitrage Desk 本质上是一个扫描器，用来寻找不同永续合约交易所之间潜在的 Delta 中性组合。",
    ja: "Arbitrage Deskは、異なるPerp取引所間のデルタニュートラル構成を探すスキャナーのようなものです。",
    ko: "Arbitrage Desk는 여러 무기한 선물 거래소 사이의 잠재적인 델타 중립 구성을 찾는 스캐너에 가깝습니다.",
  },
  "Instead of manually opening multiple exchanges and comparing the same market, the desk puts the important numbers in one place:": {
    zh: "你不需要手动打开多个交易所比较同一个市场，Desk 会把关键数据集中到一个地方：",
    ja: "複数の取引所を手動で開いて同じ市場を比較する代わりに、Deskは重要な数値を一か所にまとめます：",
    ko: "여러 거래소를 직접 열어 같은 시장을 비교하는 대신, Desk가 중요한 숫자를 한곳에 모아줍니다:",
  },
  "Long / Short venues — where each leg can be opened": { zh: "Long / Short 平台 — 每条腿可在哪个平台开仓", ja: "Long / Shortの取引先 — 各レッグを建てられる場所", ko: "Long / Short 거래소 — 각 레그를 열 수 있는 곳" },
  "Funding rates — what each side currently pays or receives": { zh: "资金费率 — 每一侧当前支付或收取的费率", ja: "Funding rate — 各サイドが現在支払う/受け取る資金調達率", ko: "펀딩비 — 각 사이드가 현재 지불하거나 받는 비율" },
  "Spread — the difference between prices across venues": { zh: "Spread — 不同平台之间的价格差", ja: "Spread — 取引所間の価格差", ko: "Spread — 거래소 간 가격 차이" },
  "Estimated APR — the current estimated return of the setup": { zh: "Estimated APR — 当前组合的预估收益率", ja: "Estimated APR — 現在の推定リターン", ko: "Estimated APR — 현재 예상 수익률" },
  "For example, you might find a setup where the desk suggests going Long ETH on one DEX and Short ETH on another.": {
    zh: "例如，你可能会看到 Desk 建议在一个交易所做多 ETH，同时在另一个交易所做空 ETH。",
    ja: "たとえば、あるDEXでETHをLong、別のDEXでETHをShortにする構成が表示されることがあります。",
    ko: "예를 들어 한 DEX에서는 ETH Long, 다른 DEX에서는 ETH Short을 제안하는 구성을 볼 수 있습니다.",
  },
  "The important part: don’t automatically choose the highest APR.": { zh: "重点是：不要自动选择 APR 最高的组合。", ja: "重要なのは、APRが一番高いものを自動的に選ばないことです。", ko: "중요한 점: APR이 가장 높은 구성을 무조건 선택하지 마세요." },
  "APR and funding rates can change quickly. I also look at the venues involved, liquidity, spread and — for points farming — whether either side has an active points program.": {
    zh: "APR 和资金费率变化很快。我还会看涉及的平台、流动性、价差，以及从赚取积分的角度看，任意一侧是否有活跃的积分项目。",
    ja: "APRとFunding rateはすぐ変わります。関係する取引所、流動性、スプレッドに加えて、ポイント獲得の観点ではどちらかに有効なポイントプログラムがあるかも確認します。",
    ko: "APR과 펀딩비는 빠르게 변할 수 있습니다. 저는 관련 거래소, 유동성, 스프레드, 그리고 포인트 파밍 관점에서 어느 한쪽이라도 활성 포인트 프로그램이 있는지 확인합니다.",
  },
  "This is where we turn a normal arbitrage setup into a points-farming strategy.": { zh: "这里就是把普通套利组合转化为积分策略的地方。", ja: "ここで通常のアービトラージ構成をポイント獲得戦略に変えます。", ko: "여기서 일반 차익거래 구성을 포인트 파밍 전략으로 바꿉니다." },
  "The basic structure is:": { zh: "基本结构是：", ja: "基本構成は：", ko: "기본 구조는:" },
  "DEX A → LONG $5,000 BTC": { zh: "交易所 A → LONG $5,000 BTC", ja: "取引所A → LONG $5,000 BTC", ko: "거래소 A → LONG $5,000 BTC" },
  "DEX B → SHORT $5,000 BTC": { zh: "交易所 B → SHORT $5,000 BTC", ja: "取引所B → SHORT $5,000 BTC", ko: "거래소 B → SHORT $5,000 BTC" },
  "Both positions use the same asset and approximately the same notional size.": { zh: "两个仓位使用同一种资产，并且名义规模大致相同。", ja: "両方のポジションは同じ資産で、ほぼ同じ想定元本にします。", ko: "두 포지션은 같은 자산을 사용하고 명목 규모도 거의 같게 맞춥니다." },
  "If BTC goes up, the long gains while the short loses. If BTC goes down, the short gains while the long loses.": {
    zh: "如果 BTC 上涨，Long 盈利而 Short 亏损；如果 BTC 下跌，Short 盈利而 Long 亏损。",
    ja: "BTCが上がるとLongが利益、Shortが損失になります。BTCが下がるとShortが利益、Longが損失になります。",
    ko: "BTC가 오르면 Long은 이익, Short은 손실입니다. BTC가 내리면 Short은 이익, Long은 손실입니다.",
  },
  "The two legs therefore offset most of the directional exposure.": { zh: "因此，两条腿会抵消大部分方向性敞口。", ja: "そのため、2つのレッグは方向性エクスポージャーの大部分を相殺します。", ko: "따라서 두 레그는 방향성 노출의 대부분을 상쇄합니다." },
  "But there is another layer.": { zh: "但这里还有另一层。", ja: "ただし、もう一つの層があります。", ko: "하지만 여기에 한 단계가 더 있습니다." },
  "Instead of choosing two random DEXs, I prefer setups where at least one — and ideally both — legs are connected to points or incentive programs.": {
    zh: "我不会随便选择两个交易所，而是更偏好至少一条腿，最好两条腿都连接到积分或激励项目的组合。",
    ja: "ランダムに2つのDEXを選ぶのではなく、少なくとも片方、理想的には両方のレッグがポイントやインセンティブプログラムにつながる構成を選びます。",
    ko: "무작위로 두 DEX를 고르기보다, 최소 한쪽 또는 가능하면 양쪽 레그가 포인트나 인센티브 프로그램과 연결된 구성을 선호합니다.",
  },
  "For example:": { zh: "例如：", ja: "例：", ko: "예:" },
  "Lighter × Robinhood → LONG HYPE → farming Lighter points": { zh: "Lighter × Robinhood → LONG HYPE → 赚取 Lighter 积分", ja: "Lighter × Robinhood → LONG HYPE → Lighterポイントを獲得", ko: "Lighter × Robinhood → LONG HYPE → Lighter 포인트 파밍" },
  "Another points DEX → SHORT HYPE → farming its points": { zh: "另一个积分交易所 → SHORT HYPE → 赚取它的积分", ja: "別のポイントDEX → SHORT HYPE → そのポイントを獲得", ko: "다른 포인트 DEX → SHORT HYPE → 해당 포인트 파밍" },
  "Now the hedge itself is productive.": { zh: "这样，对冲本身也变得有产出。", ja: "こうすると、ヘッジ自体が生産的になります。", ko: "이제 헤지 자체가 생산적인 포지션이 됩니다." },
  "One leg farms one program, the second leg farms another, while the positions largely hedge each other’s directional exposure.": {
    zh: "一条腿赚取一个项目的积分，另一条腿赚取另一个项目的积分，同时两个仓位大体互相对冲方向性敞口。",
    ja: "片方のレッグで一つのプログラムのポイントを獲得し、もう片方で別のプログラムのポイントを獲得しながら、ポジション同士が方向性エクスポージャーを大きく相殺します。",
    ko: "한 레그는 한 프로그램을 파밍하고, 다른 레그는 다른 프로그램을 파밍하면서 두 포지션이 방향성 노출을 크게 상쇄합니다.",
  },
  "Here is the actual process I use.": { zh: "这是我实际使用的流程。", ja: "私が実際に使う手順です。", ko: "제가 실제로 사용하는 과정입니다." },
  "Step 1 — Open VOOI Arbitrage Desk": { zh: "步骤 1 — 打开 VOOI Arbitrage Desk", ja: "ステップ1 — VOOI Arbitrage Deskを開く", ko: "1단계 — VOOI Arbitrage Desk 열기" },
  "Look through the available setups and choose an asset that is available on two venues you want to use.": { zh: "浏览可用组合，并选择一个在你想使用的两个平台上都可交易的资产。", ja: "利用可能な構成を見て、使いたい2つの取引先で取引できる資産を選びます。", ko: "사용 가능한 구성을 살펴보고, 사용하려는 두 거래소 모두에서 가능한 자산을 선택합니다." },
  "For points farming, I prioritize combinations where one or both venues have incentives I want to farm.": { zh: "如果目标是赚取积分，我会优先选择一侧或两侧都有激励项目的组合。", ja: "ポイント獲得が目的なら、片方または両方の取引先に狙いたいインセンティブがある組み合わせを優先します。", ko: "포인트 파밍 목적이라면 한쪽 또는 양쪽 거래소에 원하는 인센티브가 있는 조합을 우선합니다." },
  "Step 2 — Check the Setup": { zh: "步骤 2 — 检查组合", ja: "ステップ2 — 構成を確認", ko: "2단계 — 구성 확인" },
  "Before entering, check:": { zh: "进场前检查：", ja: "入る前に確認：", ko: "진입 전 확인:" },
  "which venue is Long and which is Short": { zh: "哪个平台做多，哪个平台做空", ja: "どの取引先がLongで、どこがShortか", ko: "어느 거래소가 Long이고 어느 쪽이 Short인지" },
  "funding on both sides": { zh: "两侧 funding", ja: "両サイドのFunding", ko: "양쪽 펀딩" },
  spread: { zh: "价差", ja: "スプレッド", ko: "스프레드" },
  "estimated APR": { zh: "预估 APR", ja: "推定APR", ko: "예상 APR" },
  liquidity: { zh: "流动性", ja: "流動性", ko: "유동성" },
  "active points/incentives": { zh: "活跃积分/激励", ja: "有効なポイント/インセンティブ", ko: "활성 포인트/인센티브" },
  "The highest APR is not necessarily the best opportunity.": { zh: "最高 APR 不一定是最好的机会。", ja: "最高APRが必ずしも最良の機会とは限りません。", ko: "가장 높은 APR이 반드시 최고의 기회는 아닙니다." },
  "Step 3 — Decide Your Position Size": { zh: "步骤 3 — 决定仓位规模", ja: "ステップ3 — ポジションサイズを決める", ko: "3단계 — 포지션 규모 결정" },
  "Both legs should have approximately the same notional value.": { zh: "两条腿应有大致相同的名义价值。", ja: "両レッグはほぼ同じ想定元本にします。", ko: "두 레그는 거의 같은 명목 가치를 가져야 합니다." },
  "Long HYPE → $5,000": { zh: "Long HYPE → $5,000", ja: "Long HYPE → $5,000", ko: "Long HYPE → $5,000" },
  "Short HYPE → $5,000": { zh: "Short HYPE → $5,000", ja: "Short HYPE → $5,000", ko: "Short HYPE → $5,000" },
  "Be careful with leverage here.": { zh: "这里要小心杠杆。", ja: "ここではレバレッジに注意してください。", ko: "여기서는 레버리지에 주의하세요." },
  "If you deposit $1,000 and use 5x leverage, your position is approximately $5,000 — so you need to compare the actual position notional, not just the collateral deposited.": {
    zh: "如果你存入 $1,000 并使用 5x 杠杆，你的仓位约为 $5,000，所以需要比较实际仓位名义价值，而不只是抵押金额。",
    ja: "$1,000を入金して5倍レバレッジを使うと、ポジションは約$5,000になります。預けた担保だけでなく、実際の想定元本を比較する必要があります。",
    ko: "$1,000를 예치하고 5x 레버리지를 쓰면 포지션은 약 $5,000입니다. 예치 담보가 아니라 실제 포지션 명목 가치를 비교해야 합니다.",
  },
  "Step 4 — Open Both Legs": { zh: "步骤 4 — 同时打开两条腿", ja: "ステップ4 — 両方のレッグを開く", ko: "4단계 — 양쪽 레그 열기" },
  "Open the Long and Short as close together as possible.": { zh: "尽量同时打开 Long 和 Short。", ja: "LongとShortはできるだけ近いタイミングで建てます。", ko: "Long과 Short을 가능한 한 비슷한 시점에 여세요." },
  "Once both positions are live, check that the notional sizes are approximately equal. If one side is significantly larger, you still have directional exposure.": {
    zh: "两个仓位都开启后，检查名义规模是否大致相等。如果一侧明显更大，你仍然有方向性敞口。",
    ja: "両方のポジションが建ったら、想定元本がほぼ同じか確認します。片方が大きすぎると方向性エクスポージャーが残ります。",
    ko: "두 포지션이 모두 열린 뒤 명목 규모가 거의 같은지 확인하세요. 한쪽이 훨씬 크면 방향성 노출이 남습니다.",
  },
  "Step 5 — Let the Strategy Work": { zh: "步骤 5 — 让策略运行", ja: "ステップ5 — 戦略を稼働させる", ko: "5단계 — 전략 작동시키기" },
  "Once the hedge is established, both positions can generate trading activity while the funding component of the setup continues to work.": {
    zh: "对冲建立后，两个仓位都可以产生交易活动，同时 funding 组成部分继续发挥作用。",
    ja: "ヘッジができたら、両ポジションで取引活動を作りつつ、Funding要素も機能し続けます。",
    ko: "헤지가 구축되면 두 포지션 모두 거래 활동을 만들고, 구성의 펀딩 요소도 계속 작동합니다.",
  },
  "If both venues have points programs, both legs can farm simultaneously.": { zh: "如果两个平台都有积分项目，两条腿可以同时赚取积分。", ja: "両方の取引先にポイントプログラムがあれば、両レッグで同時にポイントを獲得できます。", ko: "양쪽 거래소 모두 포인트 프로그램이 있다면 두 레그가 동시에 파밍할 수 있습니다." },
  "Step 6 — Monitor the Setup": { zh: "步骤 6 — 监控组合", ja: "ステップ6 — 構成を監視", ko: "6단계 — 구성 모니터링" },
  "You don’t need to predict every market move, but you still need to monitor the position.": { zh: "你不需要预测每一次市场波动，但仍然需要监控仓位。", ja: "すべての市場変動を予測する必要はありませんが、ポジションの監視は必要です。", ko: "모든 시장 움직임을 예측할 필요는 없지만 포지션은 계속 모니터링해야 합니다." },
  "Watch the funding rates, APR, spread, margin and size of both legs.": { zh: "关注两侧的 funding rates、APR、价差、保证金和仓位规模。", ja: "両レッグのFunding rate、APR、スプレッド、マージン、サイズを確認します。", ko: "양쪽 레그의 펀딩비, APR, 스프레드, 마진, 규모를 확인하세요." },
  "If funding changes significantly, the APR disappears, the spread becomes unattractive or one leg becomes unbalanced, it may be time to rebalance or close the setup.": {
    zh: "如果 funding 大幅变化、APR 消失、价差不再有吸引力，或一条腿失衡，就可能需要再平衡或关闭组合。",
    ja: "Fundingが大きく変わる、APRが消える、スプレッドが魅力的でなくなる、片方のレッグが不均衡になる場合は、リバランスまたはクローズを検討します。",
    ko: "펀딩이 크게 바뀌거나 APR이 사라지거나 스프레드가 매력적이지 않거나 한쪽 레그가 불균형해지면 리밸런싱 또는 종료를 고려할 때입니다.",
  },
  "When exiting, remember to close both legs. Otherwise, you are left with a directional position.": { zh: "退出时记得关闭两条腿。否则你会留下方向性仓位。", ja: "退出時は必ず両方のレッグを閉じます。そうしないと方向性ポジションが残ります。", ko: "종료할 때는 양쪽 레그를 모두 닫으세요. 그렇지 않으면 방향성 포지션이 남습니다." },
  "Delta-neutral does not mean risk-free.": { zh: "Delta-neutral 不代表无风险。", ja: "デルタニュートラルは無リスクではありません。", ko: "델타 중립이 무위험을 의미하지는 않습니다." },
  "The strategy reduces directional exposure, but there are still several things you need to keep in mind:": { zh: "该策略降低方向性敞口，但仍有几件事需要注意：", ja: "この戦略は方向性エクスポージャーを減らしますが、注意点はまだあります：", ko: "이 전략은 방향성 노출을 줄이지만 여전히 유의할 점이 있습니다:" },
  "Funding can change — a profitable setup can become less attractive or even turn negative.": { zh: "Funding 会变化 — 盈利组合可能变得不再有吸引力，甚至转负。", ja: "Fundingは変化します — 利益のある構成が魅力を失ったりマイナスになることがあります。", ko: "펀딩은 변할 수 있습니다 — 수익성 있는 구성이 덜 매력적이거나 마이너스가 될 수 있습니다." },
  "Liquidation is still possible — each leg has its own margin and liquidation price. Don’t forget to set TP/SL and monitor both positions.": {
    zh: "仍然可能被清算 — 每条腿都有自己的保证金和清算价。不要忘记设置 TP/SL 并监控两个仓位。",
    ja: "清算は起こり得ます — 各レッグにはそれぞれの証拠金と清算価格があります。TP/SLの設定と両ポジションの監視を忘れないでください。",
    ko: "청산은 여전히 가능합니다 — 각 레그에는 자체 마진과 청산가가 있습니다. TP/SL 설정과 양쪽 포지션 모니터링을 잊지 마세요.",
  },
  "Spreads can change — prices can diverge between DEXs and affect the final result.": { zh: "价差会变化 — 交易所之间价格可能分化并影响最终结果。", ja: "スプレッドは変わります — DEX間で価格が乖離し、最終結果に影響することがあります。", ko: "스프레드는 변할 수 있습니다 — DEX 간 가격이 벌어져 최종 결과에 영향을 줄 수 있습니다." },
  "Points are speculative — their future value and potential rewards are not guaranteed.": { zh: "积分具有投机性 — 未来价值和潜在奖励都没有保证。", ja: "ポイントは投機的です — 将来価値や報酬は保証されません。", ko: "포인트는 투기적입니다 — 미래 가치와 잠재 보상은 보장되지 않습니다." },
  "APR is not fixed — it is calculated based on current conditions and can change quickly.": { zh: "APR 不是固定的 — 它基于当前条件计算，可能快速变化。", ja: "APRは固定ではありません — 現在の条件で計算され、すぐ変わることがあります。", ko: "APR은 고정이 아닙니다 — 현재 조건에 따라 계산되며 빠르게 변할 수 있습니다." },
  "The goal of the strategy isn’t to remove every possible risk.": { zh: "这个策略的目标不是消除所有风险。", ja: "この戦略の目的はすべてのリスクを消すことではありません。", ko: "이 전략의 목표는 모든 리스크를 제거하는 것이 아닙니다." },
  "The goal is to reduce dependence on market direction while using both sides of the hedge as efficiently as possible.": {
    zh: "目标是在降低对市场方向依赖的同时，尽可能高效地利用对冲的两侧。",
    ja: "目的は、市場方向への依存を下げつつ、ヘッジの両サイドをできるだけ効率的に使うことです。",
    ko: "목표는 시장 방향 의존도를 줄이면서 헤지 양쪽을 최대한 효율적으로 활용하는 것입니다.",
  },
  "Open home": { zh: "打开首页", ja: "ホームを開く", ko: "홈 열기" },
  Tools: { zh: "工具", ja: "ツール", ko: "도구" },
  "Open menu": { zh: "打开菜单", ja: "メニューを開く", ko: "메뉴 열기" },
  "Mobile tools": { zh: "移动端工具", ja: "モバイルツール", ko: "모바일 도구" },
  "PerpHub markets": { zh: "PerpHub 市场", ja: "PerpHubマーケット", ko: "PerpHub 마켓" },
  "Trading programs": { zh: "交易项目", ja: "取引プログラム", ko: "거래 프로그램" },
  "PerpHub DEX directory": { zh: "PerpHub 交易所目录", ja: "PerpHub DEXディレクトリ", ko: "PerpHub DEX 디렉터리" },
  "Reward filters": { zh: "奖励筛选", ja: "報酬フィルター", ko: "보상 필터" },
  "Exchange reward table": { zh: "交易所奖励表", ja: "取引所報酬テーブル", ko: "거래소 보상 표" },
  "Select DEX": { zh: "选择交易所", ja: "DEXを選択", ko: "DEX 선택" },
  "Calculator mode": { zh: "计算器模式", ja: "計算機モード", ko: "계산기 모드" },
  "Use custom OTC price": { zh: "使用自定义 OTC 价格", ja: "カスタムOTC価格を使用", ko: "사용자 OTC 가격 사용" },
  "DEX 1 valuation mode": { zh: "交易所 1 估值模式", ja: "DEX 1の評価モード", ko: "DEX 1 평가 모드" },
  "DEX 2 valuation mode": { zh: "交易所 2 估值模式", ja: "DEX 2の評価モード", ko: "DEX 2 평가 모드" },
  "Enter reward pool token amount": { zh: "输入奖励池代币数量", ja: "報酬プールのトークン数量を入力", ko: "보상 풀 토큰 수량 입력" },
  "Enter token price": { zh: "输入代币价格", ja: "トークン価格を入力", ko: "토큰 가격 입력" },
  "Enter your trading PnL": { zh: "输入你的交易 PnL", ja: "取引PnLを入力", ko: "거래 PnL 입력" },
  "VOOI guide sections": { zh: "VOOI 指南章节", ja: "VOOIガイドのセクション", ko: "VOOI 가이드 섹션" },
  Close: { zh: "关闭", ja: "閉じる", ko: "닫기" },
  "Card backgrounds": { zh: "卡片背景", ja: "カード背景", ko: "카드 배경" },
  "Current language: English": { zh: "当前语言：English", ja: "現在の言語：English", ko: "현재 언어: English" },
  "Share card": { zh: "分享卡片", ja: "共有カード", ko: "공유 카드" },
  "Net Profit": { zh: "净收益", ja: "純利益", ko: "순이익" },
  "Points Stack card": { zh: "积分组合卡片", ja: "ポイントスタックカード", ko: "포인트 스택 카드" },
  "POINTS STACK": { zh: "积分组合", ja: "ポイントスタック", ko: "포인트 스택" },
  "Gross": { zh: "总额", ja: "グロス", ko: "총액" },
  point: { zh: "积分", ja: "ポイント", ko: "포인트" },
  points: { zh: "积分", ja: "ポイント", ko: "포인트" },
  Drop: { zh: "空投", ja: "ドロップ", ko: "드롭" },
  "Save Card": { zh: "保存卡片", ja: "カード保存", ko: "카드 저장" },
  "Copy Image": { zh: "复制图片", ja: "画像をコピー", ko: "이미지 복사" },
  "Share on X": { zh: "分享到 X", ja: "Xで共有", ko: "X에 공유" },
};
const i18nNodeSources = new WeakMap();
const i18nAttributeSources = new WeakMap();
const tabHashByName = {
  home: "",
  calculator: "calculator",
  stack: "points-stack",
  vooi: "strategies",
  competition: "competition",
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
  competition: "competition",
  competitions: "competition",
  contest: "competition",
  contests: "competition",
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
let activeLanguage = "en";

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
  Extended: "https://app.extended.exchange/join/PERPHUB",
  Ostium: "https://ultra.vooi.io/i/S9UDFLJC",
  Variational: "https://www.variational.io/en",
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
  languageMenu: document.querySelector(".language-menu"),
  languageButton: document.querySelector("#languageButton"),
  languageOptions: document.querySelectorAll("[data-language]"),
  burgerMenu: document.querySelector(".burger-menu"),
  burgerButton: document.querySelector("#burgerButton"),
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
  competitionTab: document.querySelector("#competitionTab"),
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
  return `${compactNumberFormatter.format(value)} LIT / ${translateToken("point")}`;
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
  return `${translateToken("Drop")} ${operator} ${currencyFormatter.format(Math.abs(value))} PnL`;
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
  elements.valuePerPointUsd.textContent = `${currencyFormatter.format(estimatedValuePerPointUsd)} / ${translateToken("point")}`;
  elements.userShare.textContent = formatPercent(userShare * 100);

  renderPriceScenarios(estimatedLit);
  renderChart(userPoints, rewardPoolLit, totalSeasonPoints, estimatedLit);
  updateControlLabels();
  updatePnlState();
  reapplyLanguage();

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

  elements.estimatedLit.textContent = `${numberFormatter.format(userPoints)} ${translateToken("points")}`;
  elements.estimatedUsd.textContent = currencyFormatter.format(estimatedUsd);
  elements.netProfit.textContent = currencyFormatter.format(netProfit);
  elements.pnlBreakdown.textContent = formatPnlBreakdown(tradingPnl);
  elements.netProfit.closest(".result-card").classList.toggle("is-negative", netProfit < 0);
  elements.valuePerPointLit.textContent = `${currencyFormatter.format(otcPrice)} / ${translateToken("point")}`;
  elements.valuePerPointUsd.textContent = "OTC value";
  elements.userShare.textContent = "-";
  updateControlLabels();
  updatePnlState();
  reapplyLanguage();

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

function syncStackModeToggles() {
  elements.stackDexCards.forEach((card) => {
    const mode = card.querySelector(".stack-mode")?.value ?? "token";
    card.querySelectorAll("[data-stack-mode-option]").forEach((button) => {
      button.classList.toggle("active", button.dataset.stackModeOption === mode);
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

  syncStackModeToggles();
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
  reapplyLanguage();

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
  elements.stackShareMeta.textContent = `${translateToken("Gross")} ${currencyFormatter.format(stack.gross)} · PnL ${formatSignedCurrency(stack.pnl)}`;
  reapplyLanguage();
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
  elements.shareUsd.textContent = isLighter ? currencyFormatter.format(result.estimatedUsd) : `${numberFormatter.format(result.userPoints)} ${translateToken("points")}`;
  elements.sharePnl.textContent = formatSignedCurrency(result.tradingPnl);
  elements.shareNetProfit.textContent = currencyFormatter.format(result.netProfit);
  elements.sharePriceLabel.textContent = isLighter ? "LIT Price" : "OTC Price / Point";
  elements.sharePrice.textContent = currencyFormatter.format(result.litPrice);
  elements.shareValuePoint.textContent = isLighter ? formatLitPerPoint(result.estimatedValuePerPointLit) : `${currencyFormatter.format(result.litPrice)} / ${translateToken("point")}`;
  elements.shareProgramLogo.alt = brand.label;
  elements.shareProgramLogo.classList.toggle("hidden", !brand.logo);
  elements.shareProgramText.classList.toggle("hidden", isLighter);
  elements.shareProgramText.textContent = brand.label;
  if (brand.logo) {
    elements.shareProgramLogo.src = brand.logo;
  }
  reapplyLanguage();
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

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function closeLanguageMenu() {
  elements.languageMenu?.classList.remove("open");
  elements.languageButton?.setAttribute("aria-expanded", "false");
}

function translateText(source, language) {
  if (language === "en") return source;
  return i18nText[source]?.[language] || source;
}

function translateToken(source) {
  return translateText(source, activeLanguage);
}

function applyTextTranslations(root, language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest("script, style, noscript")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    if (!i18nNodeSources.has(node)) i18nNodeSources.set(node, node.nodeValue);
    let source = i18nNodeSources.get(node);
    const currentTrimmed = node.nodeValue.trim();
    const expectedTranslation = translateText(source.trim(), language);
    if (language !== "en" && currentTrimmed && i18nText[currentTrimmed]) {
      source = node.nodeValue;
      i18nNodeSources.set(node, source);
    } else if (currentTrimmed && currentTrimmed !== source.trim() && currentTrimmed !== expectedTranslation && i18nText[currentTrimmed]) {
      source = node.nodeValue;
      i18nNodeSources.set(node, source);
    }
    const trimmed = source.trim();
    if (!trimmed) return;

    const translated = translateText(trimmed, language);
    node.nodeValue = source.replace(trimmed, translated);
  });
}

function applyAttributeTranslations(language) {
  document.querySelectorAll("[placeholder], [aria-label]").forEach((element) => {
    if (!i18nAttributeSources.has(element)) {
      i18nAttributeSources.set(element, {
        placeholder: element.getAttribute("placeholder"),
        ariaLabel: element.getAttribute("aria-label"),
      });
    }

    const source = i18nAttributeSources.get(element);
    if (source.placeholder) element.setAttribute("placeholder", translateText(source.placeholder, language));
    if (source.ariaLabel) element.setAttribute("aria-label", translateText(source.ariaLabel, language));
  });
}

function applyTranslations(language) {
  applyTextTranslations(document.body, language);
  applyAttributeTranslations(language);
}

function setLanguage(language) {
  const nextLanguage = supportedLanguages.has(language) ? language : "en";
  const option = Array.from(elements.languageOptions).find((item) => item.dataset.language === nextLanguage);
  const label = option?.dataset.languageLabel || "EN";

  activeLanguage = nextLanguage;
  document.documentElement.lang = languageHtmlCodes[nextLanguage] || "en";
  elements.languageOptions.forEach((item) => item.classList.toggle("active", item.dataset.language === nextLanguage));
  applyTranslations(nextLanguage);
  elements.languageButton.textContent = label;
  elements.languageButton.setAttribute("aria-label", `Current language: ${languageNames[nextLanguage] || label}`);

  try {
    localStorage.setItem(ACTIVE_LANGUAGE_STORAGE_KEY, nextLanguage);
  } catch {
    // Language choice is cosmetic; ignore storage failures.
  }

  if (elements.userPoints && elements.stackDexCards) {
    calculate();
    calculateStack();
  }
}

function reapplyLanguage() {
  if (activeLanguage !== "en") applyTranslations(activeLanguage);
}

function getStoredLanguage() {
  try {
    const language = localStorage.getItem(ACTIVE_LANGUAGE_STORAGE_KEY);
    return supportedLanguages.has(language) ? language : "en";
  } catch {
    return "en";
  }
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
  const primaryLabel = translateToken(isLighter ? "Estimated LIT Allocation" : "USD Airdrop");
  const primaryValue = isLighter ? formatLit(result.estimatedLit) : currencyFormatter.format(result.estimatedUsd);
  const priceLabel = translateToken(isLighter ? "LIT Price" : "OTC Price");
  const footerValue = isLighter ? formatLitPerPoint(result.estimatedValuePerPointLit) : `${currencyFormatter.format(result.litPrice)} / ${translateToken("point")}`;
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
    [translateToken(isLighter ? "USD Drop" : "Season Points"), isLighter ? currencyFormatter.format(result.estimatedUsd) : `${numberFormatter.format(result.userPoints)} ${translateToken("points")}`],
    [translateToken("Trading PnL"), formatSignedCurrency(result.tradingPnl)],
    [translateToken("Net Profit"), currencyFormatter.format(result.netProfit)],
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
  ctx.fillText(translateToken("POINTS STACK"), width - 34, 38);
  ctx.textAlign = "left";

  ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
  ctx.font = "800 13px Menlo, monospace";
  ctx.fillText(translateToken("Total Net Value"), 34, 148);
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
  ctx.fillText(`${translateToken("Gross")} ${currencyFormatter.format(stack.gross)} · PnL ${formatSignedCurrency(stack.pnl)}`, 34, height - 30);
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
    if (input.disabled) return;
    syncRangeFromInput(input, range);
    calculate();
  });

  range.addEventListener("input", () => {
    if (range.disabled || input.disabled) return;
    syncInputFromRange(input, range);
    calculate();
  });
}

function setTab(tabName, options = {}) {
  const targetTab = ["home", "calculator", "stack", "vooi", "competition"].includes(tabName) ? tabName : "home";
  const previousTab = getStoredTab();

  elements.tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === targetTab);
  });
  elements.moreButtons.forEach((button) => {
    button.classList.toggle("active", targetTab === "stack");
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
  elements.competitionTab.classList.toggle("active", targetTab === "competition");
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
  elements.litPriceRange.disabled = !isCustomPrice;
  elements.litPrice.closest(".price-field").classList.toggle("is-disabled", !isCustomPrice);
  if (!isCustomPrice) elements.litPrice.value = dexDefaults.otcPrice;
  syncRangeFromInput(elements.litPrice, elements.litPriceRange);
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
  reapplyLanguage();
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
    elements.litPriceRange.disabled = false;
    elements.litPrice.closest(".price-field").classList.remove("is-disabled");
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
  reapplyLanguage();
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
elements.shareModal.addEventListener("click", (event) => {
  if (event.target === elements.shareModal) closeShareCard();
});
elements.stackShareModal?.addEventListener("click", (event) => {
  if (event.target === elements.stackShareModal) closeStackShareCard();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeShareCard();
    closeStackShareCard();
    closeMoreMenus();
    closeLanguageMenu();
    closeBurgerMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".more-menu")) closeMoreMenus();
  if (!event.target.closest(".language-menu")) closeLanguageMenu();
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

elements.languageButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  const shouldOpen = !elements.languageMenu.classList.contains("open");
  closeMoreMenus();
  closeBurgerMenu();
  elements.languageMenu.classList.toggle("open", shouldOpen);
  elements.languageButton.setAttribute("aria-expanded", String(shouldOpen));
});

elements.languageOptions.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
    closeLanguageMenu();
  });
});

elements.stackInputs.forEach((input) => {
  input.addEventListener("input", calculateStack);
  input.addEventListener("change", calculateStack);
});

elements.stackDexCards.forEach((card) => {
  card.querySelectorAll("[data-stack-mode-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const select = card.querySelector(".stack-mode");
      if (!select) return;

      select.value = button.dataset.stackModeOption;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
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

const programRail = document.querySelector(".home-program-rail");
const programScrollHint = document.querySelector(".home-program-scroll-hint");
const programScrollThumb = document.querySelector(".home-program-scroll-hint span");

function updateProgramScrollHint() {
  if (!programRail || !programScrollHint || !programScrollThumb) return;
  const maxScroll = programRail.scrollWidth - programRail.clientWidth;
  const isScrollable = maxScroll > 1;
  const thumbWidth = isScrollable ? Math.max(18, (programRail.clientWidth / programRail.scrollWidth) * 100) : 100;
  const thumbTravel = 100 - thumbWidth;
  const thumbLeft = isScrollable ? (programRail.scrollLeft / maxScroll) * thumbTravel : 0;

  programScrollHint.classList.toggle("is-scrollable", isScrollable);
  programScrollThumb.style.width = `${thumbWidth}%`;
  programScrollThumb.style.left = `${thumbLeft}%`;
}

if (programRail && programScrollHint && programScrollThumb) {
  let programDragStartX = 0;
  let programDragStartScrollLeft = 0;

  programRail.addEventListener("scroll", updateProgramScrollHint, { passive: true });
  window.addEventListener("resize", updateProgramScrollHint);

  programScrollHint.addEventListener("pointerdown", (event) => {
    const maxScroll = programRail.scrollWidth - programRail.clientWidth;
    if (maxScroll <= 1 || event.button !== 0 || event.target !== programScrollThumb) return;

    event.preventDefault();
    programDragStartX = event.clientX;
    programDragStartScrollLeft = programRail.scrollLeft;
    programScrollHint.setPointerCapture(event.pointerId);

    const syncFromPointer = (pointerEvent) => {
      const trackWidth = programScrollHint.clientWidth;
      const thumbWidth = programScrollThumb.offsetWidth;
      const travelWidth = Math.max(1, trackWidth - thumbWidth);
      const scrollRatio = maxScroll / travelWidth;
      programRail.scrollLeft = programDragStartScrollLeft + (pointerEvent.clientX - programDragStartX) * scrollRatio;
    };

    const stopDragging = () => {
      programScrollHint.removeEventListener("pointermove", syncFromPointer);
      programScrollHint.removeEventListener("pointerup", stopDragging);
      programScrollHint.removeEventListener("pointercancel", stopDragging);
    };

    programScrollHint.addEventListener("pointermove", syncFromPointer);
    programScrollHint.addEventListener("pointerup", stopDragging);
    programScrollHint.addEventListener("pointercancel", stopDragging);
  });
}

const dexDirectoryButtons = document.querySelectorAll("[data-dex-filter]");
const dexDirectorySearch = document.querySelector("[data-dex-search]");
const dexDirectoryRows = document.querySelectorAll("[data-dex-row]");
let activeDexDirectoryFilter = "all";

function updateDexDirectory() {
  const query = (dexDirectorySearch?.value || "").trim().toLowerCase();

  dexDirectoryRows.forEach((row) => {
    const categories = row.dataset.dexCategory || "";
    const searchValue = row.dataset.dexSearchValue || row.textContent.toLowerCase();
    const matchesFilter = activeDexDirectoryFilter === "all" || categories.includes(activeDexDirectoryFilter);
    const matchesSearch = !query || searchValue.includes(query);
    row.hidden = !matchesFilter || !matchesSearch;
  });
}

dexDirectoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeDexDirectoryFilter = button.dataset.dexFilter || "all";
    dexDirectoryButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateDexDirectory();
  });
});

dexDirectorySearch?.addEventListener("input", updateDexDirectory);

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
updateProgramScrollHint();
setLanguage(getStoredLanguage());
document.body.classList.remove("app-loading");
