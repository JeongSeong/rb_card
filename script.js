const WEEK_TREND = [
  { day: "월", score: 2, emoji: "😊", color: "#ffe9a8", dateKey: "2026-04-13" },
  { day: "화", score: 20, emoji: "😔", color: "#ffc1c4", dateKey: "2026-04-14" },
  { day: "수", score: 10, emoji: "😐", color: "#ececf1", dateKey: "2026-04-15" },
  { day: "목", score: 2, emoji: "😊", color: "#fff0ba", dateKey: "2026-04-16" },
  { day: "금", score: 11, emoji: "😤", color: "#ffd29c", dateKey: "2026-04-17" },
  { day: "토", score: 20, emoji: "☹️", color: "#ffc1c8", dateKey: "2026-04-18" },
  { day: "일", score: 6, emoji: "☺️", color: "#c8f1d8", dateKey: "2026-04-19" },
];

const DIALOGUE_WEEK_TREND = [
  { score: 8, dateKey: "2026-04-13" },
  { score: 18, dateKey: "2026-04-14" },
  { score: 11, dateKey: "2026-04-15" },
  { score: 7, dateKey: "2026-04-16" },
  { score: 16, dateKey: "2026-04-17" },
  { score: 14, dateKey: "2026-04-18" },
  { score: 9, dateKey: "2026-04-19" },
];

const PREVIOUS_WEEK_DIARY_SCORES = [7, 12, 9, 15, 8, 13, 10];
const PREVIOUS_WEEK_DIALOGUE_SCORES = [6, 10, 14, 9, 12, 15, 11];

const PREVIOUS_WEEK_TREND = WEEK_TREND.map((item, index) => ({
  ...item,
  score: PREVIOUS_WEEK_DIARY_SCORES[index],
  dateKey: shiftDateKey(item.dateKey, -7),
}));

const PREVIOUS_DIALOGUE_WEEK_TREND = DIALOGUE_WEEK_TREND.map((item, index) => ({
  ...item,
  score: PREVIOUS_WEEK_DIALOGUE_SCORES[index],
  dateKey: shiftDateKey(item.dateKey, -7),
}));

const WEEK_TREND_HISTORY = [...PREVIOUS_WEEK_TREND, ...WEEK_TREND];
const DIALOGUE_WEEK_TREND_HISTORY = [...PREVIOUS_DIALOGUE_WEEK_TREND, ...DIALOGUE_WEEK_TREND];
const WEEK_WINDOW_SIZE = 7;
const MAX_WEEK_WINDOW_OFFSET = WEEK_TREND_HISTORY.length - WEEK_WINDOW_SIZE;

const WEEKDAY_BADGE_COLORS = {
  월: "#ffe9a8",
  화: "#ffc1c4",
  수: "#ececf1",
  목: "#fff0ba",
  금: "#ffd29c",
  토: "#ffc1c8",
  일: "#c8f1d8",
};

const DIARY_ENTRIES = [
  {
    id: "diary-0416",
    type: "diary",
    writtenAt: "2026-04-16T22:00:00",
    emoji: "😊",
    title: "4월 16일 (목)",
    text: '"친구랑 화해했어요. 집에 와서도 기분이 좋아요."',
    chips: [
      { label: "친구관계", color: "#ffd8d7", textColor: "#ea6f72" },
      { label: "긍정", color: "#dce9ff", textColor: "#5f8eea" },
    ],
  },
  {
    id: "diary-0415",
    type: "diary",
    writtenAt: "2026-04-15T22:00:00",
    emoji: "😐",
    title: "4월 15일 (수)",
    text: '"새 친구랑 학교에서 만났는데 서먹했어요. 집에 와서도 기분이 안 좋았어요."',
    chips: [
      { label: "친구관계", color: "#ffd8d7", textColor: "#ea6f72" },
      { label: "갈등", color: "#ffe1c9", textColor: "#e58d46" },
    ],
  },
  {
    id: "diary-0414",
    type: "diary",
    writtenAt: "2026-04-14T22:00:00",
    emoji: "😌",
    title: "4월 14일 (화)",
    text: '"오늘 학교에서 친구랑 싸웠어요. 제 얘기를 안 들어줘서 화가 났어요. 집에 와서도 기분이 안 좋았어요."',
    chips: [
      { label: "친구 관계", color: "#ffd8d7", textColor: "#ea6f72" },
      { label: "갈등", color: "#ffe1c9", textColor: "#e58d46" },
    ],
  },
  {
    id: "diary-0413",
    type: "diary",
    writtenAt: "2026-04-13T22:00:00",
    emoji: "😊",
    title: "4월 13일 (월)",
    text: '"오늘 학교에서 친구랑 재미있게 놀았어요. 집에 와서도 기분이 좋았어요."',
    chips: [
      { label: "친구관계", color: "#ffd8d7", textColor: "#ea6f72" },
      { label: "긍정", color: "#dce9ff", textColor: "#5f8eea" },
    ],
  },
  {
    id: "diary-0417",
    type: "diary",
    writtenAt: "2026-04-17T22:00:00",
    emoji: "😤",
    title: "4월 17일 (금)",
    text: '"시험공부 너무 힘들어요. 엄마가 계속 공부하라고 해서 짜증나요. 쉬고 싶은데..."',
    chips: [
      { label: "학업 스트레스", color: "#fff1ba", textColor: "#bf9c1e" },
      { label: "가족", color: "#f2deff", textColor: "#b16ae2" },
    ],
  },
  {
    id: "diary-0418",
    type: "diary",
    writtenAt: "2026-04-18T22:00:00",
    emoji: "☹️",
    title: "4월 18일 (토)",
    text: '"오늘은 학교 가는 날도 아니고, 우울하네요."',
    chips: [{ label: "부정", color: "#e8e8eb", textColor: "#7a7f88" }],
  },
  {
    id: "diary-0419",
    type: "diary",
    writtenAt: "2026-04-19T22:00:00",
    emoji: "☺️",
    title: "4월 19일 (일)",
    text: '"가족이랑 영화 봐서 좋았어요. 재미있었어요. 오랜만에 기분 좋은 하루였어요."',
    chips: [
      { label: "가족 활동", color: "#d9f4d4", textColor: "#4f9b4c" },
      { label: "긍정", color: "#dce9ff", textColor: "#5f8eea" },
    ],
  },
];

const DIALOGUE_ENTRIES = [
  {
    id: "dialogue-0418-0903",
    type: "dialogue",
    writtenAt: "2026-04-18T09:03:00",
    badge: "토",
    title: "4월 18일 09:03 - 09:10",
    text: '"우울함"',
    chips: [{ label: "부정", color: "#e7e8eb", textColor: "#7c8188" }],
  },
  {
    id: "dialogue-0417-1759",
    type: "dialogue",
    writtenAt: "2026-04-17T17:59:00",
    badge: "금",
    title: "4월 17일 17:59 - 18:06",
    text: '"짜증나"',
    chips: [{ label: "부정", color: "#e7e8eb", textColor: "#7c8188" }],
  },
  {
    id: "dialogue-0414-2003",
    type: "dialogue",
    writtenAt: "2026-04-14T20:03:00",
    badge: "화",
    title: "4월 14일 20:03 - 20:10",
    text: '"진정됨"',
    chips: [
      { label: "친구 관계", color: "#ffd8d7", textColor: "#ea6f72" },
      { label: "차분함", color: "#dbe7ff", textColor: "#6287e8" },
    ],
  },
  {
    id: "dialogue-0414-1830",
    type: "dialogue",
    writtenAt: "2026-04-14T18:30:00",
    badge: "화",
    title: "4월 14일 18:30 - 18:40",
    text: '"다시 생각나서 화남"',
    chips: [
      { label: "친구 관계", color: "#ffd8d7", textColor: "#ea6f72" },
      { label: "갈등", color: "#ffe1c9", textColor: "#e58d46" },
    ],
  },
  {
    id: "dialogue-0414-1800",
    type: "dialogue",
    writtenAt: "2026-04-14T18:00:00",
    badge: "화",
    title: "4월 14일 18:00 - 18:10",
    text: '"친구한테 화남"',
    chips: [
      { label: "친구 관계", color: "#ffd8d7", textColor: "#ea6f72" },
      { label: "갈등", color: "#ffe1c9", textColor: "#e58d46" },
    ],
  },
  {
    id: "dialogue-0413-2000",
    type: "dialogue",
    writtenAt: "2026-04-13T20:00:00",
    badge: "월",
    title: "4월 13일 20:00 - 20:05",
    text: '"저녁 기분 좋음"',
    chips: [{ label: "긍정", color: "#dbe7ff", textColor: "#6287e8" }],
  },
  {
    id: "dialogue-0413-1800",
    type: "dialogue",
    writtenAt: "2026-04-13T18:00:00",
    badge: "월",
    title: "4월 13일 18:00 - 18:05",
    text: '"학교에서 친구랑 축구함"',
    chips: [
      { label: "친구 관계", color: "#ffd8d7", textColor: "#ea6f72" },
      { label: "긍정", color: "#dbe7ff", textColor: "#6287e8" },
    ],
  },
];

function clampScore(score) {
  return Math.max(0, Math.min(27, Math.round(score)));
}

function buildDenseTrend(anchorItems, valuesBetween) {
  const dense = [];

  anchorItems.forEach((anchor, anchorIndex) => {
    dense.push({
      label: anchor.label,
      score: anchor.score,
      isAnchor: true,
    });

    const nextAnchor = anchorItems[anchorIndex + 1];
    if (!nextAnchor) {
      return;
    }

    for (let step = 1; step <= valuesBetween; step += 1) {
      const progress = step / (valuesBetween + 1);
      const wave = Math.sin(progress * Math.PI) * (anchorIndex % 2 === 0 ? 1.8 : -1.8);
      const drift = (nextAnchor.score - anchor.score) * progress;

      dense.push({
        label: "",
        score: clampScore(anchor.score + drift + wave),
        isAnchor: false,
      });
    }
  });

  return dense;
}

const MONTH_TREND = buildDenseTrend(
  [
    { label: "1주", score: 10 },
    { label: "2주", score: 18 },
    { label: "3주", score: 7 },
    { label: "4주", score: 15 },
    { label: "5주", score: 9 },
  ],
  6
);

const DIALOGUE_MONTH_TREND = buildDenseTrend(
  [
    { label: "1주", score: 8 },
    { label: "2주", score: 16 },
    { label: "3주", score: 11 },
    { label: "4주", score: 18 },
    { label: "5주", score: 12 },
  ],
  6
);

const YEAR_TREND = buildDenseTrend(
  [
    { label: "1월", score: 11 },
    { label: "2월", score: 8 },
    { label: "3월", score: 16 },
    { label: "4월", score: 14 },
    { label: "5월", score: 12 },
    { label: "6월", score: 9 },
    { label: "7월", score: 6 },
    { label: "8월", score: 13 },
    { label: "9월", score: 18 },
    { label: "10월", score: 12 },
    { label: "11월", score: 7 },
    { label: "12월", score: 10 },
  ],
  29
);

const DIALOGUE_YEAR_TREND = buildDenseTrend(
  [
    { label: "1월", score: 9 },
    { label: "2월", score: 12 },
    { label: "3월", score: 14 },
    { label: "4월", score: 16 },
    { label: "5월", score: 10 },
    { label: "6월", score: 8 },
    { label: "7월", score: 11 },
    { label: "8월", score: 15 },
    { label: "9월", score: 13 },
    { label: "10월", score: 17 },
    { label: "11월", score: 10 },
    { label: "12월", score: 8 },
  ],
  29
);

const MONTH_WINDOW_STEP = 7;
const MONTH_WINDOW_SIZE = MONTH_TREND.length;
const MONTH_TREND_HISTORY = [...createShiftedTrend(MONTH_TREND, -2), ...MONTH_TREND];
const DIALOGUE_MONTH_TREND_HISTORY = [
  ...createShiftedTrend(DIALOGUE_MONTH_TREND, -1),
  ...DIALOGUE_MONTH_TREND,
];
const MAX_MONTH_WINDOW_OFFSET = Math.floor((MONTH_TREND_HISTORY.length - MONTH_WINDOW_SIZE) / MONTH_WINDOW_STEP);

const YEAR_WINDOW_STEP = 30;
const YEAR_WINDOW_SIZE = YEAR_TREND.length;
const YEAR_TREND_HISTORY = [...createShiftedTrend(YEAR_TREND, 2), ...YEAR_TREND];
const DIALOGUE_YEAR_TREND_HISTORY = [
  ...createShiftedTrend(DIALOGUE_YEAR_TREND, -2),
  ...DIALOGUE_YEAR_TREND,
];
const MAX_YEAR_WINDOW_OFFSET = Math.floor((YEAR_TREND_HISTORY.length - YEAR_WINDOW_SIZE) / YEAR_WINDOW_STEP);

function sortByLatest(items) {
  return [...items].sort((left, right) => new Date(right.writtenAt) - new Date(left.writtenAt));
}

function createShiftedTrend(data, scoreOffset) {
  return data.map((point, index) => ({
    ...point,
    score: clampScore(point.score + scoreOffset + (index % 3 === 0 ? 1 : 0)),
  }));
}

function shiftDateKey(dateKey, dayOffset) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + dayOffset);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function createLineMarkup(data, width, height, bottomPadding = 20, options = {}) {
  const maxScore = 27;
  const usableHeight = height - bottomPadding;
  const lastIndex = Math.max(data.length - 1, 1);
  const stroke = options.stroke || "#2c2f31";
  const strokeWidth = options.strokeWidth || 1.5;
  const className = options.className ? ` class="${options.className}"` : "";

  const points = data.map((item, index) => {
    const x = (index / lastIndex) * width;
    const y = usableHeight - (item.score / maxScore) * (usableHeight - 20) - 10;
    return { ...item, x, y };
  });

  return {
    points,
    polyline: `<polyline${className} fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" points="${points
      .map((point) => `${point.x},${point.y}`)
      .join(" ")}" />`,
  };
}

class DepressionScoreCard extends HTMLElement {
  constructor() {
    super();
    this.activeTab = "all";
    this.expandedRange = "month";
    this.isModalOpen = false;
    this.selectedDateKey = "";
    this.weekWindowIndex = 0;
    this.expandedWindowOffset = {
      month: 0,
      year: 0,
    };
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  getMergedEntries() {
    return sortByLatest([...DIARY_ENTRIES, ...DIALOGUE_ENTRIES]);
  }

  getVisibleEntries() {
    const filteredByDate = (items) => {
      if (!this.selectedDateKey) {
        return items;
      }

      return items.filter((item) => item.writtenAt.startsWith(this.selectedDateKey));
    };

    if (this.activeTab === "diary") {
      return sortByLatest(filteredByDate(DIARY_ENTRIES));
    }

    if (this.activeTab === "dialogue") {
      return sortByLatest(filteredByDate(DIALOGUE_ENTRIES));
    }

    return sortByLatest(filteredByDate(this.getMergedEntries()));
  }

  getExpandedData() {
    if (this.expandedRange === "year") {
      const startIndex = YEAR_TREND_HISTORY.length - YEAR_WINDOW_SIZE - this.expandedWindowOffset.year * YEAR_WINDOW_STEP;
      const endIndex = startIndex + YEAR_WINDOW_SIZE;

      return {
        diary: YEAR_TREND_HISTORY.slice(startIndex, endIndex),
        dialogue: DIALOGUE_YEAR_TREND_HISTORY.slice(startIndex, endIndex),
      };
    }

    const startIndex = MONTH_TREND_HISTORY.length - MONTH_WINDOW_SIZE - this.expandedWindowOffset.month * MONTH_WINDOW_STEP;
    const endIndex = startIndex + MONTH_WINDOW_SIZE;

    return {
      diary: MONTH_TREND_HISTORY.slice(startIndex, endIndex),
      dialogue: DIALOGUE_MONTH_TREND_HISTORY.slice(startIndex, endIndex),
    };
  }

  getExpandedMoveLimit() {
    return this.expandedRange === "year" ? MAX_YEAR_WINDOW_OFFSET : MAX_MONTH_WINDOW_OFFSET;
  }

  getCurrentWeekTrend() {
    const startIndex = MAX_WEEK_WINDOW_OFFSET - this.weekWindowIndex;
    const endIndex = startIndex + WEEK_WINDOW_SIZE;

    return {
      label: "요일 이동",
      diary: WEEK_TREND_HISTORY.slice(startIndex, endIndex),
      dialogue: DIALOGUE_WEEK_TREND_HISTORY.slice(startIndex, endIndex),
    };
  }

  getVisibleChartTypes() {
    return {
      diary: this.activeTab !== "dialogue",
      dialogue: this.activeTab !== "diary",
    };
  }

  renderChartLegend(visibleTypes, className = "chart-legend") {
    return `
      <div class="${className}" aria-label="그래프 범례">
        ${
          visibleTypes.diary
            ? `<span><i class="chart-legend__swatch chart-legend__swatch--diary"></i>일기</span>`
            : ""
        }
        ${
          visibleTypes.dialogue
            ? `<span><i class="chart-legend__swatch chart-legend__swatch--dialogue"></i>대화</span>`
            : ""
        }
      </div>
    `;
  }

  bindEvents() {
    this.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-tab]");
      if (tab) {
        this.activeTab = tab.dataset.tab;
        this.selectedDateKey = "";
        this.render();
        return;
      }

      const dayFilter = event.target.closest("[data-day-filter]");
      if (dayFilter) {
        this.activeTab = "all";
        this.selectedDateKey =
          this.selectedDateKey === dayFilter.dataset.dayFilter ? "" : dayFilter.dataset.dayFilter;
        this.render();
        return;
      }

      const weekMove = event.target.closest("[data-week-move]");
      if (weekMove) {
        const nextIndex = this.weekWindowIndex + Number(weekMove.dataset.weekMove);
        this.weekWindowIndex = Math.max(0, Math.min(MAX_WEEK_WINDOW_OFFSET, nextIndex));
        this.selectedDateKey = "";
        this.render();
        return;
      }

      const rangeTab = event.target.closest("[data-range]");
      if (rangeTab) {
        this.expandedRange = rangeTab.dataset.range;
        this.render();
        return;
      }

      const expandedMove = event.target.closest("[data-expanded-move]");
      if (expandedMove) {
        const range = this.expandedRange;
        const nextOffset = this.expandedWindowOffset[range] + Number(expandedMove.dataset.expandedMove);
        this.expandedWindowOffset[range] = Math.max(0, Math.min(this.getExpandedMoveLimit(), nextOffset));
        this.render();
        return;
      }

      if (event.target.closest("[data-open-modal]")) {
        this.isModalOpen = true;
        this.render();
        return;
      }

      if (event.target.closest("[data-close-modal]") || event.target.classList.contains("modal")) {
        this.isModalOpen = false;
        this.render();
      }
    });
  }

  renderTabs() {
    const tabs = [
      { key: "all", label: "전체" },
      { key: "diary", label: "일기" },
      { key: "dialogue", label: "대화" },
    ];

    return tabs
      .map(
        (tab) => `
          <button class="tab ${this.activeTab === tab.key ? "is-active" : ""}" type="button" data-tab="${tab.key}">
            ${tab.label}
          </button>
        `
      )
      .join("");
  }

  renderEntry(entry) {
    if (entry.type === "dialogue") {
      return `
        <article class="entry-card entry-card--dialogue">
          <div class="entry-badge" style="background:${WEEKDAY_BADGE_COLORS[entry.badge] || "#ececec"};">${entry.badge}</div>
          <div class="entry-content">
            <div class="entry-heading">
              <strong>${entry.title}</strong>
            </div>
            <p>${entry.text}</p>
            <div class="chips">
              ${entry.chips
                .map(
                  (chip) => `
                    <span class="chip" style="background:${chip.color}; color:${chip.textColor};">${chip.label}</span>
                  `
                )
                .join("")}
            </div>
          </div>
        </article>
      `;
    }

    return `
      <article class="entry-card entry-card--diary">
        <div class="entry-badge entry-badge--emoji">${entry.emoji}</div>
        <div class="entry-content">
          <div class="entry-heading">
            <strong>${entry.title}</strong>
            <span class="entry-meta">22:00 작성</span>
          </div>
          <p>${entry.text}</p>
          <div class="chips">
            ${entry.chips
              .map(
                (chip) => `
                  <span class="chip" style="background:${chip.color}; color:${chip.textColor};">${chip.label}</span>
                `
              )
              .join("")}
          </div>
        </div>
      </article>
    `;
  }

  renderMainChart() {
    const width = 680;
    const height = 138;
    const visibleTypes = this.getVisibleChartTypes();
    const weekTrend = this.getCurrentWeekTrend();
    const canMovePrevious = this.weekWindowIndex < MAX_WEEK_WINDOW_OFFSET;
    const canMoveRecent = this.weekWindowIndex > 0;
    const { points, polyline: diaryPolyline } = createLineMarkup(weekTrend.diary, width, height, 0, {
      stroke: "#2c2f31",
      strokeWidth: 1.7,
      className: "chart-line__path chart-line__path--diary",
    });
    const { points: dialoguePoints, polyline: dialoguePolyline } = createLineMarkup(
      weekTrend.dialogue,
      width,
      height,
      0,
      {
        stroke: "#5f8eea",
        strokeWidth: 1.7,
        className: "chart-line__path chart-line__path--dialogue",
      }
    );

    return `
      <div class="chart-shell">
        <div class="chart-toolbar">
          ${this.renderChartLegend(visibleTypes)}
          <div class="chart-actions">
            <button
              class="chart-nav-button"
              type="button"
              data-week-move="1"
              aria-label="이전 요일 그래프 보기"
              ${canMovePrevious ? "" : "disabled"}
            >
              ‹
            </button>
            <span class="chart-window-label">${weekTrend.label}</span>
            <button
              class="chart-nav-button"
              type="button"
              data-week-move="-1"
              aria-label="최근 요일 그래프 보기"
              ${canMoveRecent ? "" : "disabled"}
            >
              ›
            </button>
            <button class="expand-button" type="button" data-open-modal>크게보기</button>
          </div>
        </div>
        <div class="chart-panel">
          <div class="chart-scale">
            <span>27</span>
            <div class="chart-scale__line"><span></span></div>
            <span>0</span>
          </div>
          <div class="chart-area">
            <svg class="chart-line" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
              ${visibleTypes.diary ? diaryPolyline : ""}
              ${visibleTypes.dialogue ? dialoguePolyline : ""}
            </svg>
            ${
              visibleTypes.dialogue
                ? dialoguePoints
                    .map(
                      (point) => `
                        <span
                          class="chart-dialogue-point"
                          style="left:${(point.x / width) * 100}%; top:${(point.y / height) * 100}%;"
                        ></span>
                      `
                    )
                    .join("")
                : ""
            }
            ${
              visibleTypes.diary
                ? points
                    .map(
                      (point) => `
                        <button
                          class="chart-marker ${this.selectedDateKey === point.dateKey ? "is-active" : ""}"
                          type="button"
                          data-day-filter="${point.dateKey}"
                          aria-label="${point.day}요일 기록 보기"
                          style="left:${(point.x / width) * 100}%; top:${(point.y / height) * 100}%; background:${point.color};"
                        >
                          <span>${point.emoji}</span>
                        </button>
                        <div class="chart-day" style="left:${(point.x / width) * 100}%; top: calc(${(point.y / height) * 100}% + 36px);">
                          ${point.day}
                        </div>
                      `
                    )
                    .join("")
                : ""
            }
          </div>
        </div>
      </div>
    `;
  }

  renderExpandedChart() {
    const data = this.getExpandedData();
    const visibleTypes = { diary: true, dialogue: true };
    const expandedMoveLimit = this.getExpandedMoveLimit();
    const expandedOffset = this.expandedWindowOffset[this.expandedRange];
    const expandedMoveLabel = this.expandedRange === "year" ? "월 이동" : "주 이동";
    const expandedPreviousLabel = this.expandedRange === "year" ? "이전 월 그래프 보기" : "이전 주 그래프 보기";
    const expandedRecentLabel = this.expandedRange === "year" ? "최근 월 그래프 보기" : "최근 주 그래프 보기";
    const width = 720;
    const height = 220;
    const { points: diaryPoints, polyline: diaryPolyline } = createLineMarkup(data.diary, width, height, 0, {
      stroke: "#2c2f31",
      strokeWidth: 1.8,
      className: "expanded-chart__path expanded-chart__path--diary",
    });
    const { points: dialoguePoints, polyline: dialoguePolyline } = createLineMarkup(
      data.dialogue,
      width,
      height,
      0,
      {
        stroke: "#5f8eea",
        strokeWidth: 1.8,
        className: "expanded-chart__path expanded-chart__path--dialogue",
      }
    );
    const labelPoints = diaryPoints;

    return `
      <div class="modal ${this.isModalOpen ? "is-open" : ""}">
        <div class="modal__panel" role="dialog" aria-modal="true" aria-label="확장 그래프">
          <div class="modal__header">
            <h3>감정 흐름 크게보기</h3>
            <button class="modal__close" type="button" aria-label="닫기" data-close-modal>&times;</button>
          </div>
          <div class="modal__body">
            <div class="expanded-controls">
              <div class="range-tabs">
                <button class="range-tab ${this.expandedRange === "month" ? "is-active" : ""}" type="button" data-range="month">월간 보기</button>
                <button class="range-tab ${this.expandedRange === "year" ? "is-active" : ""}" type="button" data-range="year">년간 보기</button>
              </div>
              <div class="expanded-chart__actions">
                <button
                  class="chart-nav-button"
                  type="button"
                  data-expanded-move="1"
                  aria-label="${expandedPreviousLabel}"
                  ${expandedOffset < expandedMoveLimit ? "" : "disabled"}
                >
                  ‹
                </button>
                <span class="chart-window-label">${expandedMoveLabel}</span>
                <button
                  class="chart-nav-button"
                  type="button"
                  data-expanded-move="-1"
                  aria-label="${expandedRecentLabel}"
                  ${expandedOffset > 0 ? "" : "disabled"}
                >
                  ›
                </button>
              </div>
            </div>
            ${this.renderChartLegend(visibleTypes, "chart-legend expanded-chart__legend")}
            <div class="expanded-chart">
              <div class="expanded-chart__canvas">
                <div class="expanded-chart__y">
                  <span>27</span>
                  <span>18</span>
                  <span>9</span>
                  <span>0</span>
                </div>
                <svg class="expanded-chart__line" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
                  ${visibleTypes.diary ? diaryPolyline : ""}
                  ${visibleTypes.dialogue ? dialoguePolyline : ""}
                </svg>
                ${labelPoints
                  .map(
                    (point) => `
                      ${
                        point.isAnchor && point.label
                          ? `<div class="expanded-chart__label" style="left: calc(${(point.x / width) * 100}% + 54px); top: calc(${(point.y / height) * 100}% + 34px);">
                              ${point.label}
                            </div>`
                          : ""
                      }
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.innerHTML = `
      <section class="score-card">
        <header class="score-card__header">
          <div class="score-card__title">
            <h2>최근 표현 분석</h2>
            <p>일주일 감정 흐름</p>
          </div>
          <aside class="insight-box">
            <div class="insight-box__icon">💡</div>
            <div>
              <strong>AI 분석 인사이트</strong>
              <p>
                최근 3일간 부정적 감정이 증가했습니다. 주로 학교 친구 관계와 학업 스트레스가 원인으로 보입니다.
                가족과 함께하는 시간에서 긍정적 반응을 보이고 있습니다.
              </p>
            </div>
          </aside>
        </header>

        ${this.renderMainChart()}

        <section class="log-panel">
          <nav class="tabs" aria-label="표현 기록 분류">
            ${this.renderTabs()}
          </nav>
          ${
            this.selectedDateKey
              ? `<p class="entry-filter-note">${this.getCurrentWeekTrend().diary.find((item) => item.dateKey === this.selectedDateKey)?.day}요일 기록만 보는 중</p>`
              : ""
          }
          <div class="entry-list">
          <div class="entry-list ${this.activeTab === "dialogue" || this.activeTab === "all" ? "entry-list--scroll" : ""}">
            ${this.getVisibleEntries().map((entry) => this.renderEntry(entry)).join("")}
          </div>
        </section>
      </section>

      ${this.renderExpandedChart()}
    `;
  }
}

customElements.define("depression-score-card", DepressionScoreCard);
