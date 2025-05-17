const total = 24;
const numbersContainer = document.getElementById('numbers');

function createNumbers() {
  for (let i = 1; i <= total; i++) {
    const div = document.createElement('div');
    div.className = 'col-2 col-sm-1 number-card';
    div.textContent = i;
    div.dataset.number = i;
    numbersContainer.appendChild(div);
  }
}

function pickNumbers() {
  const count = parseInt(document.getElementById('count').value);
  const noDuplicate = document.getElementById('noDuplicate').checked;
  const numberDivs = Array.from(document.querySelectorAll('.number-card'));

  if (count < 1 || count > total) {
    Swal.fire("⚠️ 인원 수 오류", "1~24 사이로 입력하세요.", "warning");
    return;
  }

  let available = numberDivs;
  if (noDuplicate) {
    available = numberDivs.filter(div => !div.classList.contains('selected'));
    if (count > available.length) {
      Swal.fire("❌ 선택 불가", "중복 없이 선택할 수 있는 인원이 부족합니다.", "error");
      return;
    }
  }

  numberDivs.forEach(div => div.classList.remove('selected'));

  const selected = [];
  while (selected.length < count && available.length > 0) {
    const randIndex = Math.floor(Math.random() * available.length);
    const chosen = available.splice(randIndex, 1)[0];
    selected.push(chosen);
  }

  selected.forEach(div => div.classList.add('selected'));

  const selectedNumbers = selected.map(div => div.dataset.number).join(", ");
  Swal.fire({
    title: "🎉 딱 걸렸다!",
    text: `당번 번호: ${selectedNumbers}`,
    icon: "success",
    confirmButtonText: "확인"
  });
}

function resetNumbers() {
  const numberDivs = document.querySelectorAll('.number-card');
  numberDivs.forEach(div => div.classList.remove('selected'));
}

createNumbers();
