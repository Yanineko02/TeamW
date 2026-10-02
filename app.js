import { projects, getProjectLink } from './projects.js';

const list = document.querySelector('#project-list');
const count = document.querySelector('#project-count');
const dialog = document.querySelector('#project-dialog');
const closeButton = document.querySelector('#dialog-close');
const dialogPreview = document.querySelector('#dialog-preview');
const dialogType = document.querySelector('#dialog-type');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('#dialog-description');
const dialogLink = document.querySelector('#dialog-link');
let lastTrigger = null;

function createPreview(project, className) {
  const preview = document.createElement('div');
  preview.className = className;

  if (project.image) {
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = `${project.name} 결과 화면`;
    image.loading = 'lazy';
    preview.append(image);
  }

  return preview;
}

function projectLabel(project) {
  if (project.visibility === 'public') return '공개 프로젝트';
  if (project.visibility === 'private') return '비공개 프로젝트';
  return '정보 준비 중';
}

function openProject(project, trigger) {
  lastTrigger = trigger;
  dialogPreview.replaceChildren(createPreview(project, 'dialog-image'));
  dialogType.textContent = projectLabel(project);
  dialogTitle.textContent = project.name;
  dialogDescription.textContent = project.description;

  const link = getProjectLink(project);
  dialogLink.hidden = !link;
  if (link) {
    dialogLink.href = link;
    dialogLink.textContent = project.visibility === 'public' ? 'GitHub에서 보기' : '기획 사이트 보기';
  } else {
    dialogLink.removeAttribute('href');
    dialogLink.textContent = '';
  }

  dialog.showModal();
  closeButton.focus();
}

function createCard(project) {
  const card = document.createElement('button');
  card.className = 'project-card';
  card.type = 'button';
  card.setAttribute('aria-label', `${project.name} 상세 보기`);

  const preview = createPreview(project, 'card-preview');
  const copy = document.createElement('span');
  copy.className = 'card-copy';

  const type = document.createElement('span');
  type.className = 'card-type';
  type.textContent = projectLabel(project);

  const name = document.createElement('strong');
  name.className = 'card-name';
  name.textContent = project.name;

  const description = document.createElement('span');
  description.className = 'card-description';
  description.textContent = project.description;

  const more = document.createElement('span');
  more.className = 'card-more';
  more.textContent = '자세히 보기';

  copy.append(type, name, description, more);
  card.append(preview, copy);
  card.addEventListener('click', () => openProject(project, card));
  return card;
}

if (projects.length) {
  list.replaceChildren(...projects.map(createCard));
  count.textContent = `${projects.length}개의 프로젝트`;
}

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => lastTrigger?.focus());

