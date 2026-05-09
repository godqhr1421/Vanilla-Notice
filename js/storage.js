// storage.js - localStorage 및 JSON 파일 관리 모듈
import { initialNotices } from '../data/notices.js';

const STORAGE_KEY = 'notices_data';

/**
 * localStorage에서 공지사항 목록 불러오기
 * @returns {Array} 공지사항 배열
 */
export function loadNotices() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // 초기 데이터로 설정
    saveNotices(initialNotices);
    return initialNotices;
  } catch (error) {
    console.error('Failed to load notices:', error);
    return initialNotices;
  }
}

/**
 * localStorage에 공지사항 목록 저장
 * @param {Array} notices - 저장할 공지사항 배열
 */
export function saveNotices(notices) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
  } catch (error) {
    console.error('Failed to save notices:', error);
  }
}

/**
 * 새 공지사항 추가
 * @param {Object} notice - 추가할 공지사항 객체
 * @returns {Object} 추가된 공지사항 (id 포함)
 */
export function addNotice(notice) {
  const notices = loadNotices();
  const newNotice = {
    ...notice,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  notices.unshift(newNotice);
  saveNotices(notices);
  return newNotice;
}

/**
 * 공지사항 수정
 * @param {number} id - 수정할 공지사항 ID
 * @param {Object} updates - 수정할 필드들
 * @returns {Object|null} 수정된 공지사항 또는 null
 */
export function updateNotice(id, updates) {
  const notices = loadNotices();
  const index = notices.findIndex(n => n.id === id);
  if (index === -1) return null;
  
  notices[index] = {
    ...notices[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  saveNotices(notices);
  return notices[index];
}

/**
 * 공지사항 삭제
 * @param {number} id - 삭제할 공지사항 ID
 * @returns {boolean} 삭제 성공 여부
 */
export function deleteNotice(id) {
  const notices = loadNotices();
  const filtered = notices.filter(n => n.id !== id);
  if (filtered.length === notices.length) return false;
  saveNotices(filtered);
  return true;
}

/**
 * ID로 공지사항 찾기
 * @param {number} id - 찾을 공지사항 ID
 * @returns {Object|null} 공지사항 또는 null
 */
export function getNoticeById(id) {
  const notices = loadNotices();
  return notices.find(n => n.id === id) || null;
}

/**
 * 공지사항을 JSON 파일로 다운로드
 */
export function downloadAsJSON() {
  const notices = loadNotices();
  const dataStr = JSON.stringify(notices, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `notices_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * JSON 파일에서 공지사항 불러오기
 * @param {File} file - 업로드된 JSON 파일
 * @returns {Promise<Array>} 불러온 공지사항 배열
 */
export function uploadFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const notices = JSON.parse(e.target.result);
        if (!Array.isArray(notices)) {
          throw new Error('Invalid format: expected an array');
        }
        saveNotices(notices);
        resolve(notices);
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * 모든 데이터 초기화 (초기 데이터로 복원)
 */
export function resetToInitial() {
  saveNotices(initialNotices);
  return initialNotices;
}
