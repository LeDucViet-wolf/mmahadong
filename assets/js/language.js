(function() {
  "use strict";

    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    const selectedLang = document.getElementById('selected-language');
    const langTexts = {
        en: {
            en: 'English',
            vi: 'Vietnamese',
            it: 'Italian',
            zh: 'Chinese'
        },
        vi: {
            en: 'Tiếng Anh',
            vi: 'Tiếng Việt',
            it: 'Tiếng Ý',
            zh: 'Tiếng Trung'
        },
        it: {
            en: 'Inglese',
            vi: 'Vietnamita',
            it: 'Italiano',
            zh: 'Cinese'
        },
        zh: {
            en: '英语',
            vi: '越南语',
            it: '意大利语',
            zh: '中文'
        }
    };

    let currentLang = 'vi';
    selectedLang.textContent = langTexts[currentLang][currentLang];

    const options = dropdownMenu.querySelectorAll('a[data-lang]');
    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();

            const langCode = opt.getAttribute('data-lang');
            updateDropdownTexts(langCode);
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

        updateDropdownTexts(currentLang);
    });

    function updateDropdownTexts(lang) {
        selectedLang.textContent = langTexts[lang][lang];
        dropdownMenu.querySelectorAll('li a').forEach(item => {
            const code = item.getAttribute('data-lang');
            item.textContent = langTexts[lang][code];
        });
    }

})();