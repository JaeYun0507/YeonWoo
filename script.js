/**
 * 연우 (YeonWoo) — All-in-One Client Interactive Engine (script.js)
 * Features:
 *   - 터치 및 클릭 이벤트 안정화 (Safari 터치 불발 완전 방지)
 *   - 알림 드롭다운 및 프로필/예산 모달 토글
 *   - 원형 게이지 바 애니메이션 및 3단계 의사결정 상태머신
 *   - 24시간 쿨다운 시계 타이머 & 찜 보관 토글
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

let toastTimer;
function showToast(text, iconName = 'sparkles') {
  const toast = document.getElementById('toast-notify');
  const toastMsg = document.getElementById('toast-msg');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = text;
  if (toastIcon) toastIcon.textContent = iconName;

  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-12px]');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-12px]');
  }, 2400);
}

// 1. Notification dropdown
const notifBtn = document.getElementById('notif-btn');
const notifDropdown = document.getElementById('notif-dropdown');
const notifBadge = document.getElementById('notif-badge');

function toggleNotifications() {
  if (notifDropdown) {
    notifDropdown.classList.toggle('hidden');
  }
}

if (notifBtn) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNotifications();
  });
}

document.addEventListener('click', (e) => {
  if (notifDropdown && !notifDropdown.classList.contains('hidden') && !notifDropdown.contains(e.target) && !notifBtn?.contains(e.target)) {
    notifDropdown.classList.add('hidden');
  }
});

function clearNotifications() {
  if (notifBadge) notifBadge.classList.add('hidden');
  showToast('모든 알림을 읽음 처리했습니다! 🌸', 'notifications');
  toggleNotifications();
}

// 2. Profile & Budget Modal
const modalProfile = document.getElementById('modal-profile');

function toggleProfileDrawer() {
  if (modalProfile) {
    modalProfile.classList.toggle('hidden');
  }
}

function updateBudget(val) {
  const display = document.getElementById('budget-display');
  if (display) {
    display.textContent = Number(val).toLocaleString() + '원';
  }
}

function saveProfileSettings() {
  toggleProfileDrawer();
  showToast('쇼핑 예산 설정이 안전하게 저장되었어요 🐰', 'savings');
}

// 3. Score Simulation & Visual Gauge
function setScoreState(type) {
  const scoreNum = document.getElementById('score-num');
  const scoreCircle = document.getElementById('score-circle');
  const badgeVerdict = document.getElementById('badge-verdict');
  const scoreHeadline = document.getElementById('score-headline');
  const scoreSubtext = document.getElementById('score-subtext');
  const yeonwooBubble = document.getElementById('yeonwoo-bubble');

  const circumference = 251.2; // 2 * PI * 40

  if (type === 'high') {
    if (scoreNum) scoreNum.textContent = '88';
    if (scoreCircle) {
      scoreCircle.style.strokeDashoffset = (circumference - (circumference * 0.88)).toString();
      scoreCircle.setAttribute('stroke', '#f59e0b');
    }
    if (badgeVerdict) {
      badgeVerdict.textContent = '🐰 사도 후회 없어요!';
      badgeVerdict.className = 'px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold';
    }
    if (scoreHeadline) scoreHeadline.textContent = '"올겨울 출근룩의 든든한 지원군!"';
    if (scoreSubtext) scoreSubtext.textContent = '옷장 속 하의 4벌과 즉시 매치되며, 이번 달 남은 예산 182,000원 범위(38%) 안에 쏙 들어와요.';
    if (yeonwooBubble) yeonwooBubble.textContent = '"서현님! 이 니트는 지금 장바구니에 담아두신 다른 코트와도 무드 톤이 아주 예쁘게 겹쳐요 💖 다만 하프집업 지퍼 안쪽 마감이 뻣뻣할 수 있으니 안에 얇은 이너 티셔츠를 레이어드해 입는 것을 권해드려요 ✨"';
    showToast('추천 지수 88점: 사도 후회 없는 조합! ✨', 'thumb_up');
  } else if (type === 'mid') {
    if (scoreNum) scoreNum.textContent = '52';
    if (scoreCircle) {
      scoreCircle.style.strokeDashoffset = (circumference - (circumference * 0.52)).toString();
      scoreCircle.setAttribute('stroke', '#a43073');
    }
    if (badgeVerdict) {
      badgeVerdict.textContent = '⏳ 잠깐만! 24시간 식혀봐요';
      badgeVerdict.className = 'px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold';
    }
    if (scoreHeadline) scoreHeadline.textContent = '"비슷한 크림 니트가 이미 2벌 있어요"';
    if (scoreSubtext) scoreSubtext.textContent = '기존 옷장 속 케이블 니트와 색상 차이가 10% 미만이에요. 지금 당장 사기보단 쿨다운을 추천해요.';
    if (yeonwooBubble) yeonwooBubble.textContent = '"서현님, 혹시 오늘 스트레스 받으신 일 있으셨나요? 🐰 옷장에 작년에 산 에잇세컨즈 크림 니트가 아직 깨끗해요! 오늘 밤만 푹 자고 내일 아침에 다시 생각해보는 건 어떨까요? ✨"';
    showToast('추천 지수 52점: 24시간 쿨다운 추천 ☕', 'timer');
  } else if (type === 'low') {
    if (scoreNum) scoreNum.textContent = '20';
    if (scoreCircle) {
      scoreCircle.style.strokeDashoffset = (circumference - (circumference * 0.20)).toString();
      scoreCircle.setAttribute('stroke', '#867461');
    }
    if (badgeVerdict) {
      badgeVerdict.textContent = '🛑 패스하자! 홧김 쇼핑 경보';
      badgeVerdict.className = 'px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-bold';
    }
    if (scoreHeadline) scoreHeadline.textContent = '"예산 초과 및 관리 난이도 상"';
    if (scoreSubtext) scoreSubtext.textContent = '손빨래 불가 + 옷장 하의와 색조 불일치로 실착용 횟수가 연 2회 미만으로 떨어질 위험이 커요.';
    if (yeonwooBubble) yeonwooBubble.textContent = '"서현님, 연우가 지갑을 꼬옥 쥐어드릴게요! 🐰 이 옷은 드라이 비용만 매번 만 원씩 나가고 소재가 따가워 금방 옷장에 갇힐 확률 99%예요. 69,900원으로 맛있는 디저트를 먹어요 💖"';
    showToast('추천 지수 20점: 이번엔 과감히 패스! 🍃', 'block');
  }
}

// 4. Feature Triggers
function handleAnalyze() {
  const input = document.getElementById('input-shop-url');
  if (!input || !input.value.trim()) {
    alert('쇼핑몰 링크를 넣어주면 연우가 바로 분석해줄게! ✨');
    return;
  }
  showToast('쇼핑몰 데이터와 실착 후기를 정밀 대조 중이에요 🐰', 'search_check');
  setTimeout(() => {
    setScoreState('high');
  }, 600);
}

function handleSyncMusinsa() {
  showToast('무신사 좋아요 12개 품목을 성공적으로 동기화했어요! 💖', 'favorite');
}

function handleIosShortcut() {
  showToast('iOS 단축어가 호출되었습니다. 사파리에서 바로 공유해보세요!', 'ios_share');
}

function testClosetMatch(itemName, fitRate) {
  showToast(`[${itemName}] 매칭 궁합 ${fitRate} 반영 완료! 🐰`, 'checkroom');
}

let isWished = false;
function toggleWishlistAction() {
  isWished = !isWished;
  const btnText = document.getElementById('btn-save-wish-text');
  if (isWished) {
    if (btnText) btnText.textContent = '찜 목록에 쏙 들어갔어요!';
    showToast('연우의 비밀 찜보관함에 저장했어요 💖', 'favorite');
  } else {
    if (btnText) btnText.textContent = '연우의 찜 바구니에 보관';
    showToast('찜 목록에서 정리했어요.', 'delete_outline');
  }
}

let cooldownActive = false;
let timerInterval;
function startCooldownTimer() {
  const btnText = document.getElementById('btn-cooldown-text');
  if (!cooldownActive) {
    cooldownActive = true;
    let remaining = 24 * 3600;
    showToast('24시간 쿨다운 시작! 충동구매를 막고 마음을 식혀요 ⏳', 'timer');
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(timerInterval);
        if (btnText) btnText.textContent = '쿨다운 만료! 결정 시간 🐰';
      } else {
        const h = Math.floor(remaining / 3600);
        const m = Math.floor((remaining % 3600) / 60);
        const s = remaining % 60;
        if (btnText) btnText.textContent = `${h}시간 ${m}분 ${s}초 남음`;
      }
    }, 1000);
  } else {
    showToast('이미 쿨다운 시계가 똑딱똑딱 돌고 있어요 🐰', 'hourglass_top');
  }
}

// 5. Navigation Tab Switching
function switchTab(buttonEl, label) {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(t => {
    t.className = "nav-tab touch-target flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all text-on-surface-variant hover:text-on-surface active:scale-95 cursor-pointer";
  });
  buttonEl.className = "nav-tab touch-target flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all bg-primary-fixed text-on-primary-fixed shadow-[0_2px_10px_rgba(245,158,11,0.25)] active:scale-95 cursor-pointer";
  showToast(`${label} 탭으로 이동했어요 🐰`, 'navigation');
}

function initApp() {
  setScoreState('high');
}
