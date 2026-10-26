document.getElementById('btnBuka').addEventListener('click', () => {
  cover.classList.add('hide');
  document.body.style.overflow = 'auto';
  mulaiMusik(); 
});


const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

const target = new Date('2030-09-11T08:00:00+07:00').getTime();
const pad = n => String(n).padStart(2, '0');
function hitung() {
  const t = Math.max(0, target - Date.now());
  document.getElementById('d').textContent = pad(Math.floor(t / 864e5));
  document.getElementById('h').textContent = pad(Math.floor(t % 864e5 / 36e5));
  document.getElementById('m').textContent = pad(Math.floor(t % 36e5 / 6e4));
  document.getElementById('s').textContent = pad(Math.floor(t % 6e4 / 1e3));
}
hitung();
setInterval(hitung, 1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const modalFoto = new bootstrap.Modal(document.getElementById('modalFoto'));
document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('fotoBesar').textContent = item.dataset.foto;
    modalFoto.show();
  });
});

const form = document.getElementById('formRsvp');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

  const box = document.createElement('div');
  box.className = 'wish';
  const nama = document.createElement('b');
  nama.textContent = `${document.getElementById('nama').value} — ${document.getElementById('hadir').value} (${document.getElementById('jml').value} orang)`;
  const isi = document.createElement('p');
  isi.className = 'mb-0 mt-1';
  isi.textContent = document.getElementById('ucap').value;
  box.append(nama, isi);

  document.getElementById('kosong')?.remove();
  document.getElementById('daftarUcapan').prepend(box);
  form.reset();
  form.classList.remove('was-validated');
});

document.querySelectorAll('.btn-salin').forEach(btn => {
  btn.addEventListener('click', () => {
    const teks = document.getElementById(btn.dataset.target).textContent;
    if (navigator.clipboard) navigator.clipboard.writeText(teks).catch(() => { });
    btn.textContent = 'Tersalin ✓';
    setTimeout(() => btn.textContent = 'Salin', 1500);
  });
});

const musik = document.getElementById('musik');
const btnMusik = document.getElementById('btnMusik');
function mulaiMusik() {
  musik.play().then(() => btnMusik.classList.add('play')).catch(() => {});
}
btnMusik.addEventListener('click', () => {
  if (musik.paused) { musik.play(); btnMusik.classList.add('play'); btnMusik.textContent = '♫'; }
  else { musik.pause(); btnMusik.classList.remove('play'); btnMusik.textContent = '▶'; }
});