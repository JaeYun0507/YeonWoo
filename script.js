document.addEventListener('DOMContentLoaded', () => { setPreviewScore(78); });

function setPreviewScore(score) {
  document.getElementById('cuteGaugeFill').style.width = score + '%';
  const advice = document.getElementById('adviceComment');
  if (score >= 70) advice.innerHTML = `"이 니트, 베이지 와이드 슬랙스랑 찰떡궁합이야! 사도 후회 없을 것 같아 🐰"`;
  else advice.innerHTML = `"조금 더 고민해보는 건 어때? ☕"`;
}

function askYeonwoo() {
  const val = document.getElementById('targetUrlInput').value.trim();
  if (!val) { alert('링크를 넣어줘! 🎀'); return; }
  setPreviewScore(85);
  alert('심사 완료! ✨');
}
