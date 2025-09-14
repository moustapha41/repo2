document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn');
  const out = document.getElementById('output');
  const status = document.getElementById('status');

  status.textContent = 'Statut : prêt';

  btn.addEventListener('click', () => {
    const now = new Date().toLocaleString();
    out.innerHTML = `<p>Bonjour ! Vous avez cliqué le ${now}</p>`;
    // Simuler un "test" léger côté client
    console.log('[demo] bouton cliqué à', now);
  });
});
