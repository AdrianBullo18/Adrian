const todoApp = (() => {
  const storageKey = 'modernTodo.tasks';
  let tasks = [];
  let activeFilter = 'all';

  const elements = {
    taskForm: document.getElementById('taskForm'),
    taskInput: document.getElementById('taskInput'),
    taskList: document.getElementById('taskList'),
    taskCount: document.getElementById('taskCount'),
    filterButtons: document.querySelectorAll('.filter-button'),
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.querySelector('.theme-icon'),
    themeText: document.querySelector('.theme-text'),
  };

  const loadTasks = () => {
    const saved = localStorage.getItem(storageKey);
    tasks = saved ? JSON.parse(saved) : [];
  };

  const saveTasks = () => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  };

  const createTask = (text) => ({
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
  });

  const getFilteredTasks = () => {
    if (activeFilter === 'active') return tasks.filter((task) => !task.completed);
    if (activeFilter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  };

  const updateTaskCount = () => {
    const remaining = tasks.filter((task) => !task.completed).length;
    elements.taskCount.textContent = `${remaining} task${remaining === 1 ? '' : 's'} remaining`;
  };

  const renderTasks = () => {
    elements.taskList.innerHTML = '';

    const visibleTasks = getFilteredTasks();

    if (visibleTasks.length === 0) {
      const emptyState = document.createElement('li');
      emptyState.className = 'task-item';
      emptyState.innerHTML = '<p class="task-label">No tasks here. Add one to get started.</p>';
      elements.taskList.appendChild(emptyState);
      updateTaskCount();
      return;
    }

    visibleTasks.forEach((task) => {
      const item = document.createElement('li');
      item.className = `task-item${task.completed ? ' completed' : ''}`;
      item.dataset.id = task.id;

      item.innerHTML = `
        <div class="task-content">
          <input class="task-checkbox" type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Toggle completion for ${task.text}" />
          <span class="task-label" role="textbox" aria-readonly="true">${escapeHtml(task.text)}</span>
        </div>
        <div class="task-actions">
          <button class="action-button edit-button" type="button" aria-label="Edit task">✏️</button>
          <button class="action-button delete-button" type="button" aria-label="Delete task">🗑️</button>
        </div>
      `;

      const checkbox = item.querySelector('.task-checkbox');
      const editButton = item.querySelector('.edit-button');
      const deleteButton = item.querySelector('.delete-button');
      const label = item.querySelector('.task-label');

      checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
      deleteButton.addEventListener('click', () => removeTask(task.id));
      editButton.addEventListener('click', () => beginTaskEdit(item, task));

      elements.taskList.appendChild(item);
    });

    updateTaskCount();
  };

  const escapeHtml = (value) => value.replace(/[&<"'`=\/]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;',
    '=': '&#61;',
    '/': '&#47;',
  }[char]));

  const addTask = (text) => {
    if (!text.trim()) return;
    tasks.unshift(createTask(text));
    saveTasks();
    renderTasks();
  };

  const removeTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  };

  const toggleTaskCompletion = (id) => {
    tasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
  };

  const updateTaskText = (id, newText) => {
    const normalized = newText.trim();
    if (!normalized) return;
    tasks = tasks.map((task) => task.id === id ? { ...task, text: normalized } : task);
    saveTasks();
    renderTasks();
  };

  const beginTaskEdit = (item, task) => {
    const label = item.querySelector('.task-label');
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'task-edit-input';
    editInput.value = task.text;
    editInput.setAttribute('aria-label', `Edit task ${task.text}`);

    label.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    const commitEdit = () => {
      updateTaskText(task.id, editInput.value);
    };

    const cancelEdit = () => {
      renderTasks();
    };

    editInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        commitEdit();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelEdit();
      }
    });

    editInput.addEventListener('blur', commitEdit);
  };

  const setActiveFilter = (filter) => {
    activeFilter = filter;
    elements.filterButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });
    renderTasks();
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('modernTodo.theme');
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(initialTheme);
  };

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === 'dark';
    elements.themeIcon.textContent = isDark ? '☀️' : '🌙';
    elements.themeText.textContent = isDark ? 'Light mode' : 'Dark mode';
    localStorage.setItem('modernTodo.theme', theme);
  };

  const toggleTheme = () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  const attachListeners = () => {
    elements.taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addTask(elements.taskInput.value);
      elements.taskInput.value = '';
      elements.taskInput.focus();
    });

    elements.filterButtons.forEach((button) => {
      button.addEventListener('click', () => setActiveFilter(button.dataset.filter));
    });

    elements.themeToggle.addEventListener('click', toggleTheme);
  };

  const init = () => {
    loadTasks();
    attachListeners();
    initializeTheme();
    renderTasks();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', todoApp.init);
