// ui.js - UI 렌더링 및 컴포넌트 생성 모듈

/**
 * 날짜 포맷팅
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} 포맷팅된 날짜
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Shadcn 스타일 버튼 생성
 * @param {Object} options - 버튼 옵션
 * @returns {string} 버튼 HTML
 */
export function createButton({ text, variant = 'default', size = 'default', icon = '', className = '', id = '', type = 'button' }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90',
    destructive: 'bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90',
    outline: 'border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
    secondary: 'bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
    ghost: 'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
    link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50'
  };
  
  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9'
  };
  
  const idAttr = id ? `id="${id}"` : '';
  
  return `<button type="${type}" ${idAttr} class="${baseClasses} ${variants[variant]} ${sizes[size]} ${className}">${icon}${text}</button>`;
}

/**
 * Shadcn 스타일 배지 생성
 * @param {Object} options - 배지 옵션
 * @returns {string} 배지 HTML
 */
export function createBadge({ text, variant = 'default' }) {
  const baseClasses = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  
  const variants = {
    default: 'border-transparent bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80',
    secondary: 'border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
    destructive: 'border-transparent bg-red-500 text-zinc-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80',
    outline: 'text-zinc-950 dark:text-zinc-50'
  };
  
  return `<span class="${baseClasses} ${variants[variant]}">${text}</span>`;
}

/**
 * 아이콘 SVG 생성
 */
export const icons = {
  pin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
  reset: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`,
  chevron: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon shrink-0 text-zinc-400"><polyline points="6 9 12 15 18 9"/></svg>`
};

/**
 * 텍스트에서 검색어를 강조 처리
 * @param {string} text - 원본 텍스트
 * @param {string} query - 검색어
 * @returns {string} 강조된 HTML 문자열
 */
export function highlight(text, query) {
  if (!query || !text) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800/60 text-yellow-900 dark:text-yellow-200 font-semibold rounded px-0.5">$1</mark>');
}

/**
 * content에서 검색어 주변 미리보기 텍스트 추출
 * @param {string} content - 전체 내용
 * @param {string} query - 검색어
 * @param {number} radius - 앞뒤 글자 수
 * @returns {string|null} 미리보기 텍스트 또는 null
 */
function extractPreview(content, query, radius = 60) {
  if (!query || !content) return null;
  const lower = content.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return null;
  const start = Math.max(0, idx - radius);
  const end = Math.min(content.length, idx + query.length + radius);
  const snippet = content.slice(start, end).replace(/\n/g, ' ');
  return (start > 0 ? '...' : '') + snippet + (end < content.length ? '...' : '');
}

/**
 * 테이블 행 생성
 * @param {Object} notice - 공지사항 객체
 * @param {string} [searchQuery] - 현재 검색어 (하이라이트용)
 * @param {number|null} [rowNumber] - 화면에 표시할 순번
 * @returns {string} 테이블 행 HTML
 */
export function createTableRow(notice, searchQuery = '', rowNumber = null) {
  const pinnedBadge = notice.isPinned 
    ? `<span class="inline-flex items-center gap-1 mr-2">${icons.pin}</span>` 
    : '';

  const categoryColors = {
    '일반':   'border-transparent bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    '긴급':   'border-transparent bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    '업데이트': 'border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    '정책':   'border-transparent bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    '프로젝트': 'border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
  };
  const categoryClass = categoryColors[notice.category] ?? categoryColors['일반'];
  const categoryBadge = notice.category
    ? `<span class="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium mr-2 ${categoryClass}">${notice.category}</span>`
    : '';

  const isOpen = notice.isOpen === true;
  const contentLines = (notice.content ?? '').split('\n').map(l =>
    `<p class="leading-relaxed">${l === '' ? '&nbsp;' : highlight(l, searchQuery)}</p>`
  ).join('');

  // 검색어가 content에 포함된 경우 미리보기 표시
  const preview = searchQuery ? extractPreview(notice.content ?? '', searchQuery) : null;
  const previewHTML = preview
    ? `<p class="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">${highlight(preview, searchQuery)}</p>`
    : '';

  const highlightedTitle = highlight(notice.title, searchQuery);
  const numberLabel = typeof rowNumber === 'number'
    ? String(rowNumber)
    : '-';

  return `
    <tr class="border-b border-zinc-200 dark:border-zinc-800 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30 notice-row" data-id="${notice.id}">
      <td class="align-middle px-4 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50 whitespace-nowrap w-20 text-center">${numberLabel}</td>
      <td class="p-4 align-middle font-medium">
        <div class="flex items-center gap-1">
          ${pinnedBadge}
          ${categoryBadge}
          <button class="notice-title flex-1 text-left flex items-center justify-between gap-2 group" data-id="${notice.id}">
            <span class="group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors flex flex-col gap-1">
              <span class="leading-tight">${highlightedTitle}</span>
              ${previewHTML}
            </span>
            <span class="${isOpen ? 'chevron-icon open' : 'chevron-icon'}">${icons.chevron}</span>
          </button>
        </div>
        <div class="accordion-content ${isOpen ? 'open' : ''}" id="accordion-${notice.id}">
          <div>
            <div class="pt-3 pb-1 pl-1 pr-10 text-sm text-zinc-600 dark:text-zinc-400 space-y-1 border-t border-zinc-100 dark:border-zinc-800 mt-3">
              ${contentLines}
            </div>
          </div>
        </div>
      </td>
      <td class="hidden sm:table-cell p-4 align-top text-zinc-500 dark:text-zinc-400 whitespace-nowrap w-28">${notice.date ?? formatDate(notice.createdAt)}</td>
      <td class="p-4 align-top text-right w-20">
        <div class="flex items-center justify-end gap-1">
          ${createButton({ text: '', variant: 'ghost', size: 'icon', icon: icons.edit, className: 'edit-btn', id: `edit-${notice.id}` })}
          ${createButton({ text: '', variant: 'ghost', size: 'icon', icon: icons.trash, className: 'delete-btn hidden text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950', id: `delete-${notice.id}` })}
        </div>
      </td>
    </tr>
  `;
}

/**
 * 카테고리 탭 렌더링
 * @param {Array} notices - 전체 공지사항 배열
 * @param {string} activeCategory - 현재 선택된 카테고리
 */
export function renderCategoryTabs(notices, activeCategory = '전체') {
  const categories = ['전체', ...new Set(notices.map(n => n.category).filter(Boolean))];
  const tabEl = document.getElementById('category-tabs');
  if (!tabEl) return;

  tabEl.innerHTML = categories.map(cat => {
    const count = cat === '전체' ? notices.length : notices.filter(n => n.category === cat).length;
    const isActive = cat === activeCategory;
    return `
      <button
        class="category-tab inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${isActive ? 'active' : 'bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300'}"
        data-category="${cat}"
      >${cat}<span class="rounded-full bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 text-xs font-semibold leading-none ${isActive ? 'bg-zinc-600 dark:bg-zinc-400 text-white dark:text-zinc-900' : ''}">${count}</span></button>
    `;
  }).join('');
}

/**
 * 공지사항 테이블 렌더링
 * @param {Array} notices - 공지사항 배열 (페이지네이션 반영 가능)
 * @param {string} [searchQuery] - 현재 검색어
 * @param {Object} [options]
 * @param {number} [options.totalItems] - 전체 공지 개수 (페이지네이션용)
 * @param {number} [options.pageStartIndex] - 현재 페이지 시작 인덱스 (0 기반)
 * @returns {string} 테이블 HTML
 */
export function renderTable(notices, searchQuery = '', options = {}) {
  const sorted = [...notices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date ?? b.createdAt) - new Date(a.date ?? a.createdAt);
  });

  const totalItems = typeof options.totalItems === 'number' ? options.totalItems : sorted.length;
  const pageStartIndex = options.pageStartIndex ?? 0;
  
  if (sorted.length === 0) {
    const emptyMsg = searchQuery
      ? `"${searchQuery}"에 대한 검색 결과가 없습니다`
      : '등록된 공지사항이 없습니다';
    const subMsg = searchQuery ? '다른 검색어를 입력해보세요' : '새 공지사항을 작성해보세요';
    return `
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div class="p-12 text-center text-zinc-500 dark:text-zinc-400">
          <p class="text-lg font-medium">${emptyMsg}</p>
          <p class="text-sm mt-1">${subMsg}</p>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
      <table class="w-full caption-bottom text-sm">
        <thead class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th class="h-12 px-4 text-center align-middle font-medium text-zinc-500 dark:text-zinc-400 w-20">번호</th>
            <th class="h-12 px-4 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">제목</th>
            <th class="hidden sm:table-cell h-12 px-4 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400 w-28">작성일</th>
            <th class="h-12 px-4 text-right align-middle font-medium text-zinc-500 dark:text-zinc-400 w-20">관리</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map((notice, index) => {
            const descendingNumber = totalItems - (pageStartIndex + index);
            return createTableRow(notice, searchQuery, descendingNumber);
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * 페이지네이션 렌더링
 * @param {Object} options - 페이지네이션 옵션
 * @param {number} options.currentPage - 현재 페이지 (1부터 시작)
 * @param {number} options.totalPages - 전체 페이지 수
 * @param {Function} [options.onPageClick] - 버튼 클릭 시 호출할 헬퍼 (data-page 속성 활용)
 * @returns {string} 페이지네이션 HTML
 */
export function renderPagination({ currentPage = 1, totalPages = 1 } = {}) {
  if (totalPages <= 1) return '';

  const createPageButton = (page, label = page, disabled = false, isActive = false) => {
    const baseClass = 'inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium transition-colors';
    const stateClass = disabled
      ? 'border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
      : isActive
        ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900'
        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800';
    const dataAttr = disabled ? '' : `data-page="${page}"`;
    return `<button type="button" ${dataAttr} class="${baseClass} ${stateClass}">${label}</button>`;
  };

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const pageButtons = [];
  for (let page = 1; page <= totalPages; page += 1) {
    pageButtons.push(createPageButton(page, page, false, page === currentPage));
  }

  return `
    <div class="flex items-center justify-center gap-2 mt-6" role="navigation" aria-label="페이지네이션">
      ${createPageButton(currentPage - 1, '이전', prevDisabled)}
      <div class="flex items-center gap-1">${pageButtons.join('')}</div>
      ${createPageButton(currentPage + 1, '다음', nextDisabled)}
    </div>
  `;
}

/**
 * 모달 HTML 생성
 * @param {Object} options - 모달 옵션
 * @returns {string} 모달 HTML
 */
export function createModal({ id, title, content, footer = '' }) {
  return `
    <div id="${id}" class="fixed inset-0 z-50 hidden">
      <div class="fixed inset-0 bg-black/80 modal-backdrop" data-modal="${id}"></div>
      <div class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-lg rounded-lg">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold leading-none tracking-tight">${title}</h2>
          <button type="button" class="modal-close-btn inline-flex items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" data-modal="${id}">
            ${icons.close}
          </button>
        </div>
        <div class="modal-content">
          ${content}
        </div>
        ${footer ? `<div class="flex justify-end gap-2">${footer}</div>` : ''}
      </div>
    </div>
  `;
}

/**
 * 공지사항 폼 생성
 * @param {Object|null} notice - 수정 시 기존 데이터
 * @returns {string} 폼 HTML
 */
export function createNoticeForm(notice = null) {
  const isEdit = notice !== null;
  const categories = ['일반', '긴급', '업데이트', '정책', '프로젝트'];
  const selectedCategory = notice?.category || '일반';
  
  return `
    <form id="notice-form" class="space-y-4">
      <div class="space-y-2">
        <label for="title" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">제목</label>
        <input type="text" id="form-title" name="title" value="${isEdit ? notice.title : ''}" required
          class="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="공지사항 제목을 입력하세요">
      </div>
      <div class="space-y-2">
        <label for="category" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">카테고리</label>
        <select id="form-category" name="category" required
          class="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50">
          ${categories.map(cat => `<option value="${cat}" ${selectedCategory === cat ? 'selected' : ''}>${cat}</option>`).join('')}
        </select>
      </div>
      <div class="space-y-2">
        <label for="content" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">내용</label>
        <textarea id="form-content" name="content" rows="6" required
          class="flex min-h-[200px] w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          placeholder="공지사항 내용을 입력하세요">${isEdit ? notice.content : ''}</textarea>
      </div>
      <div class="flex items-center space-x-2">
        <input type="checkbox" id="form-pinned" name="isPinned" ${isEdit && notice.isPinned ? 'checked' : ''}
          class="h-4 w-4 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-zinc-500">
        <label for="form-pinned" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">상단 고정</label>
      </div>
      ${isEdit ? `<input type="hidden" id="form-id" value="${notice.id}">` : ''}
    </form>
  `;
}

/**
 * 공지사항 상세 보기 생성
 * @param {Object} notice - 공지사항 객체
 * @returns {string} 상세 보기 HTML
 */
export function createNoticeDetail(notice) {
  return `
    <div class="space-y-4">
      <div class="flex items-center gap-2 flex-wrap">
        ${notice.isPinned ? createBadge({ text: '고정됨', variant: 'default' }) : ''}
        ${notice.category ? createBadge({ text: notice.category, variant: 'secondary' }) : ''}
      </div>
      <div class="prose prose-sm dark:prose-invert max-w-none">
        <p class="text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">${notice.content}</p>
      </div>
      <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
        <p>작성일: ${notice.date ?? formatDate(notice.createdAt)}</p>
      </div>
    </div>
  `;
}

/**
 * 토스트 메시지 표시
 * @param {string} message - 메시지 내용
 * @param {string} type - 메시지 타입 (success, error, info)
 */
export function showToast(message, type = 'success') {
  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-zinc-800'
  };
  
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-up`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * 모달 열기
 * @param {string} modalId - 모달 ID
 */
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * 모달 닫기
 * @param {string} modalId - 모달 ID
 */
export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

/**
 * 확인 다이얼로그 표시
 * @param {string} message - 확인 메시지
 * @returns {boolean} 확인 여부
 */
export function confirmDialog(message) {
  return confirm(message);
}
