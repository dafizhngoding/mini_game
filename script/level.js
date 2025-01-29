function selectLevel(level) {
    document.querySelectorAll('.level').forEach(el => el.classList.remove('active'));
    document.querySelector('.level-' + level).classList.add('active');
  }