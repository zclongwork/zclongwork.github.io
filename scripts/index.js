(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  const taskButton = document.querySelector('[data-widget-task]');
  const taskText = document.querySelector('[data-task-text]');
  const undoText = document.querySelector('[data-undo-text]');
  const progressLabel = document.querySelector('[data-progress-label]');
  const progressBar = document.querySelector('[data-progress-bar]');
  const widgetHint = document.querySelector('[data-widget-hint]');
  let undoTimer;

  if (taskButton && progressLabel && progressBar) {
    taskButton.addEventListener('click', () => {
      const isDone = taskButton.getAttribute('aria-pressed') === 'true';
      window.clearTimeout(undoTimer);
      taskButton.setAttribute('aria-pressed', String(!isDone));
      taskButton.classList.toggle('is-done', !isDone);
      taskButton.querySelector('.widget-check').textContent = isDone ? '' : '✓';
      progressLabel.textContent = isDone ? '已完成 1 / 3' : '已完成 2 / 3';
      progressBar.style.width = isDone ? '33.333%' : '66.666%';
      if (taskText) taskText.textContent = '完成官网初稿';
      if (undoText) undoText.textContent = isDone ? '' : '再次点击撤销';
      if (widgetHint) widgetHint.textContent = isDone ? '点一下，直接完成' : '完成状态已同步';

      if (!isDone) {
        undoTimer = window.setTimeout(() => {
          if (undoText) undoText.textContent = '';
          if (widgetHint) widgetHint.textContent = '今天又向前一步';
        }, 4000);
      }
    });
  }

  const daySteps = [...document.querySelectorAll('[data-step]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  const stageCaption = document.querySelector('[data-stage-caption]');
  const captions = [
    '重复事项按需生成，每天独立完成。',
    '桌面与应用共享今天的完成进度。',
    '固定 25 分钟，暂停或结束都由你决定。',
    '回看过去，不为今天提前打分。'
  ];

  daySteps.forEach((step) => {
    const button = step.querySelector('button');
    if (!button) return;
    button.addEventListener('click', () => {
      const selected = step.dataset.step;
      daySteps.forEach((item) => item.classList.toggle('is-active', item === step));
      panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.panel === selected));
      if (stageCaption) stageCaption.textContent = captions[Number(selected)] || '';
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();

