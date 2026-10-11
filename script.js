/**
 * 연우 (YeonWoo) — 귀염뽀짝 프론트엔드 인터랙션 스크립트
 */

document.addEventListener('DOMContentLoaded', () => {
  // 초기 세팅
  setPreviewScore(78);
});

// 점수 및 코멘트 시뮬레이션
function setPreviewScore(score) {
  const gaugeFill = document.getElementById('cuteGaugeFill');
  const scoreText = document.getElementById('scoreText');
  const adviceComment = document.getElementById('adviceComment');

  if (gaugeFill) {
    gaugeFill.style.width = score + '%';
  }

  if (scoreText) {
    scoreText.innerHTML = `${score}<span class="text-xs font-medium text-[#8C827A]"> / 100점</span>`;
  }

  if (adviceComment) {
    if (score >= 70) {
      adviceComment.innerHTML = `"이 니트, 지금 가진 <strong class="text-[#2C2724] font-semibold">베이지 와이드 슬랙스</strong>랑 찰떡궁합이야! 이번 달 쇼핑 예산도 넉넉하니 사도 후회 없을 것 같아 🐰"`;
    } else if (score >= 40) {
      adviceComment.innerHTML = `"디자인은 너무 예쁜데, 옷장에 비슷한 디자인이 이미 한 벌 있어! <strong class="text-[#D97706] font-semibold">24시간만 장바구니에 두고</strong> 내일 다시 생각해보는 건 어때? ☕"`;
    } else {
      adviceComment.innerHTML = `"지금 사면 한 달에 한두 번 입고 옷장에 머물 확률이 높아 보여요. 예산도 아낄 겸 <strong class="text-[#DC2626] font-semibold">이번엔 과감하게 패스</strong>하자! 🍃"`;
    }
  }
}

// 물어보기 버튼 이벤트
function askYeonwoo() {
  const input = document.getElementById('targetUrlInput');
  const val = input ? input.value.trim() : '';

  if (!val) {
    alert('쇼핑몰 링크를 넣어주면 연우가 바로 봐줄게! 🎀');
    return;
  }

  // 귀여운 애니메이션 효과와 함께 점수 갱신
  setPreviewScore(85);
  const title = document.getElementById('reportTitle');
  if (title) title.textContent = '수집된 아이템 심사 완료!';
  alert('연우가 꼼꼼하게 살펴봤어! 아래 리포트를 확인해줘 ✨');
}

// 예시 링크 프리셋
function samplePreset() {
  const input = document.getElementById('targetUrlInput');
  if (input) {
    input.value = 'https://musinsa.com/products/warm-knit-sample';
    askYeonwoo();
  }
}

// 찜하기 버튼
function saveToWishlist() {
  alert('연우의 찜 목록에 쏙 담았어! 🛍️💕');
}
