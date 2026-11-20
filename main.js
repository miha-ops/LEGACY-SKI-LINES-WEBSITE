(function () {
  'use strict';

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Sticky bar state
  var bar = document.getElementById('topbar');
  function onScroll() {
    if (window.scrollY > 80) bar.classList.add('solid');
    else bar.classList.remove('solid');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Enquiry form -> private mail draft
  var form = document.getElementById('enquiryForm');
  var note = document.getElementById('formnote');

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };

    if (!get('name') || !get('email')) {
      note.hidden = false;
      note.textContent = 'Please add a name and an email address so a reply can reach you.';
      return;
    }

    var lines = [
      'Legacy Ski Lines — private enquiry',
      '',
      'Name: ' + get('name'),
      'Email: ' + get('email'),
      'Introduced by: ' + (get('referral') || '—'),
      'Preferred destination: ' + (get('destination') || '—'),
      'Approximate dates: ' + (get('dates') || '—'),
      'Guests: ' + (get('guests') || '—'),
      '',
      'Notes:',
      get('message') || '—',
      '',
      '— Sent in confidence via legacyskilines.com'
    ];

    var href = 'mailto:miha@hscjapan.ski'
      + '?subject=' + encodeURIComponent('Legacy Ski Lines — private enquiry (' + get('name') + ')')
      + '&body=' + encodeURIComponent(lines.join('\n'));

    window.location.href = href;

    note.hidden = false;
    note.textContent = 'Your private enquiry has been prepared in your mail application. Send it and it will be answered personally.';
  });
})();
