// main.js - 메인 컨트롤러 모듈
import * as storage from './storage.js';
import * as ui from './ui.js';

const PAGE_SIZE = 8;

// 상태 관리
let currentEditId = null;
let activeCategory = '전체';
let isDeleteMode = false;
let searchQuery = '';
let currentPage = 1;

/**
 * 앱 초기화
 */
function init() {
  renderApp();
  setupEventListeners();
}

/**
 * 전체 앱 렌더링
 */
function renderApp() {
  const allNotices = storage.loadNotices();

  // 카테고리 탭 렌더링
  ui.renderCategoryTabs(allNotices, activeCategory);

  // 카테고리 필터링
  let notices = activeCategory === '전체'
    ? allNotices
    : allNotices.filter(n => n.category === activeCategory);

  // 검색어 필터링 (title + content, 대소문자 구분 없음)
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    notices = notices.filter(n =>
      (n.title ?? '').toLowerCase().includes(q) ||
      (n.content ?? '').toLowerCase().includes(q)
    );
  }

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date ?? b.createdAt) - new Date(a.date ?? a.createdAt);
  });

  const totalItems = sortedNotices.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE)) || 1;
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const pageStartIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedNotices = sortedNotices.slice(pageStartIndex, pageStartIndex + PAGE_SIZE);

  const container = document.getElementById('notices-container');
  if (container) {
    const tableHTML = ui.renderTable(paginatedNotices, searchQuery, {
      totalItems,
      pageStartIndex
    });
    const paginationHTML = ui.renderPagination({ currentPage, totalPages });
    container.innerHTML = tableHTML + paginationHTML;
    attachTableEventListeners();
    applyDeleteMode();
  }
}

/**
 * 삭제 모드 상태를 DOM에 반영
 */
function applyDeleteMode() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.classList.toggle('hidden', !isDeleteMode);
  });

  const deleteModeBtn = document.getElementById('delete-mode-btn');
  if (deleteModeBtn) {
    if (isDeleteMode) {
      deleteModeBtn.classList.remove('border-zinc-200', 'dark:border-zinc-800', 'bg-white', 'dark:bg-zinc-950', 'hover:bg-red-50', 'hover:text-red-600', 'hover:border-red-200', 'dark:hover:bg-red-950', 'dark:hover:text-red-400', 'dark:hover:border-red-900');
      deleteModeBtn.classList.add('border-red-300', 'dark:border-red-800', 'bg-red-50', 'dark:bg-red-950', 'text-red-600', 'dark:text-red-400');
    } else {
      deleteModeBtn.classList.remove('border-red-300', 'dark:border-red-800', 'bg-red-50', 'dark:bg-red-950', 'text-red-600', 'dark:text-red-400');
      deleteModeBtn.classList.add('border-zinc-200', 'dark:border-zinc-800', 'bg-white', 'dark:bg-zinc-950', 'hover:bg-red-50', 'hover:text-red-600', 'hover:border-red-200', 'dark:hover:bg-red-950', 'dark:hover:text-red-400', 'dark:hover:border-red-900');
    }
  }
}

/**
 * 테이블 이벤트 리스너 연결
 */
function attachTableEventListeners() {
  // 제목 클릭 - accordion 토글
  document.querySelectorAll('.notice-title').forEach(el => {
    el.addEventListener('click', (e) => {
      const id = parseInt(el.dataset.id);
      toggleAccordion(id);
    });
  });

  // 수정 버튼
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.id.replace('edit-', ''));
      showEditForm(id);
    });
  });
  
  // 삭제 버튼
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.id.replace('delete-', ''));
      handleDelete(id);
    });
  });
}

/**
 * 글로벌 이벤트 리스너 설정
 */
function setupEventListeners() {
  // 카테고리 탭 클릭 (이벤트 위임)
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.category-tab');
    if (tab) {
      activeCategory = tab.dataset.category;
      // 검색어 초기화
      searchQuery = '';
      currentPage = 1;
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.value = '';
      renderApp();
    }
  });

  // 검색 입력
  document.getElementById('search-input')?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    currentPage = 1;
    renderApp();
  });

  // 삭제 모드 버튼
  document.getElementById('delete-mode-btn')?.addEventListener('click', () => {
    isDeleteMode = !isDeleteMode;
    applyDeleteMode();
  });

  // 새 공지 작성 버튼
  document.getElementById('add-notice-btn')?.addEventListener('click', showAddForm);
  
  // JSON 다운로드
  document.getElementById('download-btn')?.addEventListener('click', () => {
    storage.downloadAsJSON();
    ui.showToast('JSON 파일이 다운로드되었습니다', 'success');
  });
  
  // JSON 업로드
  document.getElementById('upload-btn')?.addEventListener('click', () => {
    document.getElementById('file-input')?.click();
  });
  
  document.getElementById('file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await storage.uploadFromJSON(file);
        renderApp();
        ui.showToast('데이터를 성공적으로 불러왔습니다', 'success');
      } catch (error) {
        ui.showToast('파일을 불러오는데 실패했습니다', 'error');
      }
      e.target.value = '';
    }
  });
  
  // 초기화 버튼
  document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (ui.confirmDialog('정말 초기 데이터로 복원하시겠습니까?')) {
      storage.resetToInitial();
      currentPage = 1;
      renderApp();
      ui.showToast('초기 데이터로 복원되었습니다', 'info');
    }
  });

  // 페이지네이션 버튼 클릭
  document.addEventListener('click', (e) => {
    const pageBtn = e.target.closest('button[data-page]');
    if (pageBtn) {
      const nextPage = parseInt(pageBtn.dataset.page, 10);
      if (!Number.isNaN(nextPage)) {
        currentPage = Math.max(1, nextPage);
        renderApp();
      }
    }
  });
  
  // 모달 배경 클릭 시 닫기 (작성/편집 모달은 제외)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      const modalId = e.target.dataset.modal;
      if (modalId && modalId !== 'form-modal') {
        ui.closeModal(modalId);
      }
    }
  });

  // ESC 키로 모달 닫기 (상세 모달만 해당)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const detailModal = document.getElementById('detail-modal');
      const isDetailModalOpen = detailModal && !detailModal.classList.contains('hidden');
      if (isDetailModalOpen) {
        ui.closeModal('detail-modal');
      }
    }
  });
  
  // 폼 제출
  document.getElementById('modals-container')?.addEventListener('submit', (e) => {
    if (e.target.id === 'notice-form') {
      e.preventDefault();
      handleFormSubmit();
    }
  });
  
  // 폼 모달 버튼들
  document.getElementById('modals-container')?.addEventListener('click', (e) => {
    if (e.target.id === 'cancel-form-btn' || e.target.closest('#cancel-form-btn')) {
      ui.closeModal('form-modal');
      currentEditId = null;
    }
    if (e.target.id === 'submit-form-btn' || e.target.closest('#submit-form-btn')) {
      document.getElementById('notice-form')?.requestSubmit();
    }
    if (e.target.id === 'close-detail-btn' || e.target.closest('#close-detail-btn')) {
      ui.closeModal('detail-modal');
    }
    if (e.target.closest('.modal-close-btn')) {
      const modalId = e.target.closest('.modal-close-btn')?.dataset.modal;
      if (modalId) {
        ui.closeModal(modalId);
        if (modalId === 'form-modal') {
          currentEditId = null;
        }
      }
    }
  });
}

/**
 * Accordion 토글 (isOpen 상태 저장 + DOM 즉시 반영)
 * @param {number} id - 공지사항 ID
 */
function toggleAccordion(id) {
  const notice = storage.getNoticeById(id);
  if (!notice) return;

  const nextOpen = !notice.isOpen;
  storage.updateNotice(id, { isOpen: nextOpen });

  // DOM 즉시 업데이트 (리렌더링 없이)
  const accordionEl = document.getElementById(`accordion-${id}`);
  const chevronEl = document.querySelector(`.notice-title[data-id="${id}"] .chevron-icon`);

  if (accordionEl) {
    accordionEl.classList.toggle('open', nextOpen);
  }
  if (chevronEl) {
    chevronEl.classList.toggle('open', nextOpen);
  }
}

/**
 * 새 공지 작성 폼 표시
 */
function showAddForm() {
  currentEditId = null;
  const modalContainer = document.getElementById('modals-container');
  
  const modalHTML = ui.createModal({
    id: 'form-modal',
    title: '새 공지사항 작성',
    content: ui.createNoticeForm(),
    footer: `
      ${ui.createButton({ text: '취소', variant: 'outline', id: 'cancel-form-btn' })}
      ${ui.createButton({ text: '저장', variant: 'default', id: 'submit-form-btn', type: 'button' })}
    `
  });
  
  modalContainer.innerHTML = modalHTML;
  ui.openModal('form-modal');
  document.getElementById('form-title')?.focus();
}

/**
 * 수정 폼 표시
 * @param {number} id - 공지사항 ID
 */
function showEditForm(id) {
  const notice = storage.getNoticeById(id);
  if (!notice) {
    ui.showToast('공지사항을 찾을 수 없습니다', 'error');
    return;
  }
  
  currentEditId = id;
  const modalContainer = document.getElementById('modals-container');
  
  const modalHTML = ui.createModal({
    id: 'form-modal',
    title: '공지사항 수정',
    content: ui.createNoticeForm(notice),
    footer: `
      ${ui.createButton({ text: '취소', variant: 'outline', id: 'cancel-form-btn' })}
      ${ui.createButton({ text: '저장', variant: 'default', id: 'submit-form-btn', type: 'button' })}
    `
  });
  
  modalContainer.innerHTML = modalHTML;
  ui.openModal('form-modal');
  document.getElementById('form-title')?.focus();
}

/**
 * 상세 보기 표시
 * @param {number} id - 공지사항 ID
 */
function showNoticeDetail(id) {
  const notice = storage.getNoticeById(id);
  if (!notice) {
    ui.showToast('공지사항을 찾을 수 없습니다', 'error');
    return;
  }
  
  const modalContainer = document.getElementById('modals-container');
  
  const modalHTML = ui.createModal({
    id: 'detail-modal',
    title: notice.title,
    content: ui.createNoticeDetail(notice),
    footer: ui.createButton({ text: '닫기', variant: 'outline', id: 'close-detail-btn' })
  });
  
  modalContainer.innerHTML = modalHTML;
  ui.openModal('detail-modal');
}

/**
 * 폼 제출 처리
 */
function handleFormSubmit() {
  const form = document.getElementById('notice-form');
  if (!form) return;
  
  const title = document.getElementById('form-title')?.value.trim();
  const category = document.getElementById('form-category')?.value || '일반';
  const content = document.getElementById('form-content')?.value.trim();
  const isPinned = document.getElementById('form-pinned')?.checked || false;
  
  if (!title || !content) {
    ui.showToast('모든 필드를 입력해주세요', 'error');
    return;
  }
  
  if (currentEditId) {
    // 수정
    storage.updateNotice(currentEditId, { title, category, content, isPinned });
    ui.showToast('공지사항이 수정되었습니다', 'success');
  } else {
    // 새로 추가
    storage.addNotice({ title, category, content, isPinned });
    currentPage = 1;
    ui.showToast('공지사항이 등록되었습니다', 'success');
  }
  
  ui.closeModal('form-modal');
  currentEditId = null;
  renderApp();
}

/**
 * 삭제 처리
 * @param {number} id - 공지사항 ID
 */
function handleDelete(id) {
  const notice = storage.getNoticeById(id);
  if (!notice) {
    ui.showToast('공지사항을 찾을 수 없습니다', 'error');
    return;
  }
  
  if (ui.confirmDialog(`"${notice.title}" 공지사항을 삭제하시겠습니���?`)) {
    storage.deleteNotice(id);
    ui.showToast('공지사항이 삭제되었습니다', 'success');
    renderApp();
  }
}

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', init);
