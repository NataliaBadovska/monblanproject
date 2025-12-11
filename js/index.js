document.addEventListener('DOMContentLoaded', () => {
  const gridBtn = document.getElementById('grid-view-btn');
  const listBtn = document.getElementById('list-view-btn');
  const contentContainer =
    document.getElementById('content-list-container') ||
    document.getElementById('content-container');
  const buttons = [gridBtn, listBtn].filter(Boolean);

  function switchView(viewType) {
    if (viewType === 'grid') {
      if (contentContainer) {
        contentContainer.classList.remove('list-view');
        contentContainer.classList.add('grid-view');
      }
    } else if (viewType === 'list') {
      if (contentContainer) {
        contentContainer.classList.remove('grid-view');
        contentContainer.classList.add('list-view');
      }
    }

    buttons.forEach(btn => {
      if (btn.getAttribute('data-view') === viewType) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.dispatchEvent(
      new CustomEvent('viewChange', { detail: { view: viewType } })
    );
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const viewType = btn.getAttribute('data-view');
      switchView(viewType);
    });
  });

  switchView('grid');
  document.dispatchEvent(
    new CustomEvent('viewChange', { detail: { view: 'grid' } })
  );
});

const fromPicker = flatpickr('#date-from', {
  dateFormat: 'd_m_Y',
  allowInput: false,
  onChange(selectedDates, dateStr) {
    toggleClear('from', !!dateStr);
  },
});

const toPicker = flatpickr('#date-to', {
  dateFormat: 'd_m_Y',
  allowInput: false,
  onChange(selectedDates, dateStr) {
    toggleClear('to', !!dateStr);
  },
});

document.querySelectorAll('.calendar-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    const parent = e.target.closest('.date-picker');
    const type = parent.dataset.type;

    if (type === 'from') fromPicker.open();
    else toPicker.open();
  });
});

function toggleClear(type, visible) {
  const btn = document.querySelector(
    `.date-picker[data-type="${type}"] .clear-btn`
  );
  btn.classList.toggle('hidden', !visible);
}

document.querySelectorAll('.clear-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const parent = e.target.closest('.date-picker');
    const type = parent.dataset.type;

    if (type === 'from') {
      fromPicker.clear();
      toggleClear('from', false);
    } else {
      toPicker.clear();
      toggleClear('to', false);
    }
  });
});
