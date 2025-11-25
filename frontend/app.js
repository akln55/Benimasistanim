// Sayfa geçişi
const pages = document.querySelectorAll('.page');
document.querySelectorAll('.menu button').forEach(btn => {
  btn.addEventListener('click', () => {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(btn.dataset.page).classList.add('active');
  });
});

// ChatGPT
document.getElementById('ask').addEventListener('click', () => {
  const question = document.getElementById('query').value;
  askGPT(question);
});
document.getElementById('clear').addEventListener('click', () => {
  document.getElementById('answer').innerText = '';
  document.getElementById('query').value = '';
});

async function askGPT(question) {
  const ansEl = document.getElementById('answer');
  ansEl.innerText = 'Yanıt alınıyor...';
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    ansEl.innerText = data.answer || 'Yanıt alınamadı';
  } catch (e) {
    ansEl.innerText = 'Hata: ' + e.message;
  }
}

// Hesap
let balance = 0;
const txlist = document.getElementById('txlist');
document.getElementById('addTx').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  if (!amount) return;
  if(type==='income') balance+=amount;
  else balance-=amount;
  document.getElementById('balance').innerText = balance + ' TL';
  const li = document.createElement('div');
  li.innerText = `${type === 'income' ? 'Gelir' : 'Gider'}: ${amount} TL`;
  txlist.appendChild(li);
  document.getElementById('amount').value='';
});

// BMI & Egzersiz
document.getElementById('calcBmi').addEventListener('click', () => {
  const h = parseFloat(document.getElementById('height').value)/100;
  const w = parseFloat(document.getElementById('weight').value);
  if(!h||!w) return;
  const bmi = (w/(h*h)).toFixed(1);
  document.getElementById('bmi').innerText = bmi;

  let advice = '';
  if(bmi<18.5) advice='Biraz kilo almalısın, besleyici yemekler ye.';
  else if(bmi<25) advice='İdeal kilodasın, spor ve dengeli beslenmeye devam.';
  else advice='Kilo vermen iyi olur, kardiyo ve diyet uygula.';
  document.getElementById('exercise').innerText=advice;
});

// Alarm
document.getElementById('setAlarm').addEventListener('click', () => {
  const time = document.getElementById('wakeTime').value;
  if(!time) return alert('Saat seç!');
  alert('Alarm ' + time + ' için ayarlandı (tarayıcı bildirimleri aktif değil)');
});
