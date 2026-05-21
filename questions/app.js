'use strict';

(function () {
  /* ------------------------------------------------------------------ */
  /*  State                                                              */
  /* ------------------------------------------------------------------ */

  /** @type {{questions: string[], answers: string[], reviewed: Object<number,boolean>, marked: Object<number,boolean>, flipped: Object<number,boolean>, cursor: number, isShuffled: boolean, selectedTopics: Set<number>, theme: string}} */
  const state = {
    questions: [],
    answers: [],
    reviewed: {},
    marked: {},
    flipped: {},
    cursor: 0,
    isShuffled: false,
    selectedTopics: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    theme: 'dark',
  };

  /* ------------------------------------------------------------------ */
  /*  DOM Cache                                                          */
  /* ------------------------------------------------------------------ */

  /** @type {Object<string, HTMLElement>} */
  const dom = {
    sidebar: document.getElementById('sidebar'),
    main: document.getElementById('main'),
    textStatus: document.getElementById('textStatus'),
    progress: document.getElementById('progress'),
    progressBar: document.querySelector('#progress > div'),
    card: document.getElementById('card'),
    question: document.getElementById('question'),
    answer: document.getElementById('answer'),
    counter: document.getElementById('counter'),
    btnReview: document.getElementById('btn-review'),
    markList: document.getElementById('markList'),
    markMeta: document.getElementById('markMeta'),
  };

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                            */
  /* ------------------------------------------------------------------ */

  /**
   * Build a localStorage key from the currently selected topic indices.
   * @returns {string} Key such as `flashcards_0_1_2_3`.
   */
  function storageKey() {
    const sorted = [...state.selectedTopics].sort((a, b) => a - b);
    return `flashcards_${sorted.join('_')}`;
  }

  /**
   * Replace literal back-slash-n sequences with `<br>` tags for display.
   * @param {string} text - Raw text from the data source.
   * @returns {string} HTML-safe string with line breaks.
   */
  function nlToBr(text) {
    return text.replace(/\\n/g, '<br>');
  }

  /* ------------------------------------------------------------------ */
  /*  Persistence                                                        */
  /* ------------------------------------------------------------------ */

  /**
   * Save reviewed and marked maps to localStorage, keyed by the
   * current topic selection so each combination keeps its own progress.
   * @returns {void}
   */
  function saveState() {
    const key = storageKey();
    const payload = {
      reviewed: state.reviewed,
      marked: state.marked,
    };
    try {
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (_) {
      /* quota exceeded — silently ignore */
    }
  }

  /**
   * Restore reviewed and marked maps from localStorage for the
   * current topic selection.
   * @returns {void}
   */
  function loadState() {
    const key = storageKey();
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const payload = JSON.parse(raw);
      if (payload.reviewed) state.reviewed = payload.reviewed;
      if (payload.marked) state.marked = payload.marked;
    } catch (_) {
      /* corrupt data — start fresh */
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Theme                                                              */
  /* ------------------------------------------------------------------ */

  /**
   * Toggle between dark and light themes and save to localStorage.
   * @returns {void}
   */
  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    if (state.theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('flashcards_theme', state.theme);
    } catch (_) {}
  }

  /**
   * Load the theme from localStorage on startup.
   * @returns {void}
   */
  function initTheme() {
    try {
      const savedTheme = localStorage.getItem('flashcards_theme');
      if (savedTheme === 'light') {
        state.theme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        state.theme = 'dark';
        document.documentElement.removeAttribute('data-theme');
      }
    } catch (_) {}
  }

  /* ------------------------------------------------------------------ */
  /*  Topic Filtering                                                    */
  /* ------------------------------------------------------------------ */

  /**
   * Check every topic checkbox and apply the filter.
   * @returns {void}
   */
  function selectAllTopics() {
    const boxes = document.querySelectorAll('.topic-checkbox');
    boxes.forEach((cb) => { cb.checked = true; });
    applyTopicFilter();
  }

  /**
   * Uncheck every topic checkbox and apply the filter.
   * @returns {void}
   */
  function selectNoTopics() {
    const boxes = document.querySelectorAll('.topic-checkbox');
    boxes.forEach((cb) => { cb.checked = false; });
    applyTopicFilter();
  }

  /**
   * Read the checked state of every topic checkbox, update
   * `state.selectedTopics`, and reload questions for those topics.
   * @returns {void}
   */
  function applyTopicFilter() {
    const boxes = document.querySelectorAll('.topic-checkbox');
    const indices = new Set();
    boxes.forEach((cb) => {
      if (cb.checked) {
        indices.add(Number(cb.dataset.topicIndex));
      }
    });
    state.selectedTopics = indices;
    loadSelectedTopics(indices);
  }

  /**
   * Combine questions and answers from the selected
   * `EMBEDDED_DATA` entries, reset transient state, restore
   * persisted progress, and render.
   * @param {Set<number>} topicIndices - Topic indices to include.
   * @returns {void}
   */
  function loadSelectedTopics(topicIndices) {
    const questions = [];
    const answers = [];

    EMBEDDED_DATA.forEach((entry) => {
      if (!topicIndices.has(entry.i)) return;
      entry.q.forEach((q, idx) => {
        questions.push(q);
        answers.push(entry.a[idx]);
      });
    });

    state.questions = questions;
    state.answers = answers;
    state.reviewed = {};
    state.marked = {};
    state.flipped = {};
    state.cursor = 0;
    state.isShuffled = false;

    loadState();
    render();
  }

  /* ------------------------------------------------------------------ */
  /*  Navigation                                                         */
  /* ------------------------------------------------------------------ */

  /**
   * Move the cursor forward to the next non-reviewed question.
   * Stops at the last card if no further unreviewed card exists.
   * @returns {void}
   */
  function navigateNext() {
    const total = state.questions.length;
    if (total === 0) return;

    for (let i = state.cursor + 1; i < total; i++) {
      if (!state.reviewed[i]) {
        state.cursor = i;
        render();
        return;
      }
    }
    /* No unreviewed card ahead — stay put */
  }

  /**
   * Move the cursor backward to the previous non-reviewed question.
   * Stops at the first card if no earlier unreviewed card exists.
   * @returns {void}
   */
  function navigatePrev() {
    const total = state.questions.length;
    if (total === 0) return;

    for (let i = state.cursor - 1; i >= 0; i--) {
      if (!state.reviewed[i]) {
        state.cursor = i;
        render();
        return;
      }
    }
    /* No unreviewed card behind — stay put */
  }

  /**
   * Jump directly to a specific question index.
   * @param {number} index - Zero-based question index.
   * @returns {void}
   */
  function jumpToQuestion(index) {
    if (index < 0 || index >= state.questions.length) return;
    state.cursor = index;
    render();
  }

  /* ------------------------------------------------------------------ */
  /*  Card Actions                                                       */
  /* ------------------------------------------------------------------ */

  /**
   * Toggle the reviewed state of the current card.
   * When marking as reviewed the card is also unmarked and the
   * cursor automatically advances to the next unreviewed question.
   * @returns {void}
   */
  function toggleReviewed() {
    const total = state.questions.length;
    if (total === 0) return;

    const idx = state.cursor;

    if (state.reviewed[idx]) {
      delete state.reviewed[idx];
      saveState();
      render();
      return;
    }

    state.reviewed[idx] = true;
    delete state.marked[idx];
    saveState();
    navigateNext();
    /* navigateNext calls render(); if cursor didn't move we still
       need a render to update the card styling. */
    render();
  }

  /**
   * Toggle the marked state of the current card.
   * Marking is only allowed on cards that have not been reviewed.
   * @returns {void}
   */
  function toggleMark() {
    const total = state.questions.length;
    if (total === 0) return;

    const idx = state.cursor;
    if (state.reviewed[idx]) return;

    if (state.marked[idx]) {
      delete state.marked[idx];
    } else {
      state.marked[idx] = true;
    }

    saveState();
    render();
  }

  /**
   * Toggle the flip (question ↔ answer) state of the current card.
   * The actual visual flip is handled by the CSS `.flipped` class.
   * @returns {void}
   */
  function toggleFlip() {
    if (state.questions.length === 0) return;

    const idx = state.cursor;
    if (state.flipped[idx]) {
      delete state.flipped[idx];
    } else {
      state.flipped[idx] = true;
    }
    render();
  }

  /* ------------------------------------------------------------------ */
  /*  Shuffle                                                            */
  /* ------------------------------------------------------------------ */

  /**
   * Perform a Fisher-Yates shuffle on the questions and answers
   * arrays (keeping them in sync) and reset all per-card state.
   * @returns {void}
   */
  function shuffleQuestions() {
    const len = state.questions.length;
    if (len === 0) return;

    for (let i = len - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [state.questions[i], state.questions[j]] =
        [state.questions[j], state.questions[i]];
      [state.answers[i], state.answers[j]] =
        [state.answers[j], state.answers[i]];
    }

    state.reviewed = {};
    state.marked = {};
    state.flipped = {};
    state.cursor = 0;
    state.isShuffled = true;

    saveState();
    render();
  }

  /* ------------------------------------------------------------------ */
  /*  Rendering                                                          */
  /* ------------------------------------------------------------------ */

  /**
   * Re-render every dynamic part of the UI based on the current state.
   * @returns {void}
   */
  function render() {
    const total = state.questions.length;
    const reviewedCount = Object.keys(state.reviewed).length;
    const remaining = total - reviewedCount;

    /* --- Status text ------------------------------------------------ */
    if (total === 0) {
      dom.textStatus.textContent = 'No questions loaded.';
    } else {
      dom.textStatus.textContent =
        `${reviewedCount} reviewed / ${remaining} remaining (${total} total)`;
    }

    /* --- Progress bar ----------------------------------------------- */
    const pct = total > 0 ? (reviewedCount / total) * 100 : 0;
    dom.progressBar.style.width = `${pct}%`;

    /* --- Card ------------------------------------------------------- */
    if (total === 0) {
      dom.card.classList.remove('reviewed', 'marked', 'flipped');
      dom.question.innerHTML =
        'No questions selected &mdash; pick topics in the sidebar';
      dom.answer.innerHTML = '';
      dom.counter.textContent = '';
      dom.btnReview.textContent = 'Reviewed ✓';
      renderMarkedQueue();
      return;
    }

    const idx = state.cursor;

    dom.card.classList.toggle('reviewed', !!state.reviewed[idx]);
    dom.card.classList.toggle('marked', !!state.marked[idx]);
    dom.card.classList.toggle('flipped', !!state.flipped[idx]);

    dom.question.innerHTML = nlToBr(state.questions[idx]);
    dom.answer.innerHTML = nlToBr(state.answers[idx]);

    /* --- Counter ---------------------------------------------------- */
    dom.counter.textContent = `${idx + 1} / ${total}`;

    /* --- Review button text ----------------------------------------- */
    dom.btnReview.textContent =
      state.reviewed[idx] ? 'Undo' : 'Reviewed ✓';

    /* --- Marked queue ----------------------------------------------- */
    renderMarkedQueue();
  }

  /**
   * Update the sidebar list of marked questions and the meta counter.
   * Each entry is a button that jumps to that question when clicked.
   * @returns {void}
   */
  function renderMarkedQueue() {
    const markedIndices = Object.keys(state.marked)
      .map(Number)
      .sort((a, b) => a - b);

    dom.markMeta.textContent =
      `${markedIndices.length} marked question${markedIndices.length !== 1 ? 's' : ''}`;

    if (markedIndices.length === 0) {
      dom.markList.innerHTML =
        '<div class="mark-empty">Mark questions to build a review queue.</div>';
      return;
    }

    const fragment = document.createDocumentFragment();

    markedIndices.forEach((qIdx) => {
      const btn = document.createElement('button');
      btn.className = 'mark-item';
      if (qIdx === state.cursor) {
        btn.classList.add('active');
      }
      const preview = state.questions[qIdx].length > 60
        ? `${state.questions[qIdx].substring(0, 57)}…`
        : state.questions[qIdx];
      btn.textContent = preview;
      btn.addEventListener('click', () => jumpToQuestion(qIdx));
      fragment.appendChild(btn);
    });

    dom.markList.innerHTML = '';
    dom.markList.appendChild(fragment);
  }

  /* ------------------------------------------------------------------ */
  /*  Event Binding                                                      */
  /* ------------------------------------------------------------------ */

  /**
   * Wire up all event listeners (buttons, card, keyboard, checkboxes).
   * @returns {void}
   */
  function bindEvents() {
    /* Buttons */
    document.getElementById('btn-select-all')
      .addEventListener('click', selectAllTopics);
    document.getElementById('btn-select-none')
      .addEventListener('click', selectNoTopics);
    document.getElementById('btn-theme-toggle')
      .addEventListener('click', toggleTheme);
    document.getElementById('btn-shuffle')
      .addEventListener('click', shuffleQuestions);
    document.getElementById('btn-mark')
      .addEventListener('click', toggleMark);
    document.getElementById('btn-review')
      .addEventListener('click', toggleReviewed);
    document.getElementById('btn-flip')
      .addEventListener('click', toggleFlip);
    document.getElementById('btn-prev')
      .addEventListener('click', navigatePrev);
    document.getElementById('btn-next')
      .addEventListener('click', navigateNext);

    /* Card click → flip */
    dom.card.addEventListener('click', toggleFlip);

    /* Topic checkboxes */
    document.querySelectorAll('.topic-checkbox').forEach((cb) => {
      cb.addEventListener('change', applyTopicFilter);
    });

    /* Keyboard shortcuts */
    document.addEventListener('keydown', handleKeyboard);
  }

  /**
   * Global keyboard shortcut handler.
   * Ignores key presses when an input element is focused.
   * @param {KeyboardEvent} event
   * @returns {void}
   */
  function handleKeyboard(event) {
    if (document.activeElement !== document.body) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        navigateNext();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        navigatePrev();
        break;
      case ' ':
      case 'f':
      case 'F':
        event.preventDefault();
        toggleFlip();
        break;
      case 'r':
      case 'R':
        event.preventDefault();
        toggleReviewed();
        break;
      case 'm':
      case 'M':
        event.preventDefault();
        toggleMark();
        break;
      case 's':
      case 'S':
        event.preventDefault();
        shuffleQuestions();
        break;
      default:
        break;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Initialisation                                                     */
  /* ------------------------------------------------------------------ */

  /**
   * Application entry point.
   * Binds all event listeners, loads questions for the default
   * (all selected) topics, and performs the initial render.
   * @returns {void}
   */
  function initApp() {
    initTheme();
    bindEvents();
    loadSelectedTopics(state.selectedTopics);
  }

  /* Kick off once the DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
