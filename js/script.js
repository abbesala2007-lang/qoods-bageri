document.addEventListener('DOMContentLoaded', function () {

  // Mobilmeny
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Footer-år
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Beställningsformulär
  var form = document.getElementById('order-form');
  var status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var message = form.message.value.trim();

      if (!name || !phone || !message) {
        status.textContent = 'Fyll i alla fält innan du skickar din beställning.';
        status.className = 'form-status error';
        return;
      }

      // OBS: Ersätt detta med en riktig backend/e-posttjänst (t.ex. Formspree)
      // för att faktiskt ta emot beställningar.
      status.textContent = 'Tack ' + name + '! Din beställning är mottagen. Vi kontaktar dig snart på ' + phone + '.';
      status.className = 'form-status success';
      form.reset();
    });
  }

});
