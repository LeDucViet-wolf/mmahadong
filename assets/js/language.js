(function() {
  "use strict";

    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    const selectedLang = document.getElementById('selected-language');

    let currentLang = 'vi';
    selectedLang.textContent = 'Tiếng Việt';

    const options = dropdownMenu.querySelectorAll('a[data-lang]');
    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();

            const langCode = opt.getAttribute('data-lang');
            const langName = opt.textContent;

            selectedLang.textContent = langName;
            currentLang = langCode;

            dropdownMenu.style.display = 'none';

            console.log(`Ngôn ngữ hiện tại: ${langName} (${langCode})`);

            localStorage.setItem('selectedLang', langCode);
        });
    });

    window.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('selectedLang');
        if (savedLang) {
            const langItem = dropdownMenu.querySelector(`[data-lang="${savedLang}"]`);
            if (langItem) {
                selectedLang.textContent = langItem.textContent;
                currentLang = savedLang;
            }
        }
    });

})();