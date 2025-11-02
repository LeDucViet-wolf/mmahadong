(function () {
    "use strict";

    let forms = document.querySelectorAll('.php-email-form');

    forms.forEach(function (e) {
        e.addEventListener('submit', function (event) {
            event.preventDefault();

            let thisForm = this;
            let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

            thisForm.querySelector('.loading').classList.add('d-block');
            thisForm.querySelector('.error-message').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.remove('d-block');

            let formData = new FormData(thisForm);

            if (recaptcha) {
                // if (typeof grecaptcha !== "undefined") {
                //     grecaptcha.ready(function () {
                //         try {
                //             grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
                //                 .then(token => {
                //                     formData.set('recaptcha-response', token);
                //                     php_email_form_submit(thisForm, action, formData);
                //                 })
                //         } catch (error) {
                //             displayError(thisForm, error);
                //         }
                //     });
                // } else {
                //     displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
                // }
            } else {
                email_form_submit(thisForm, formData);
            }
        });
    });

    function email_form_submit(thisForm, formData) {
        const scriptURL = "https://script.google.com/macros/s/AKfycbycYSFNbCB0otp8teV5S7zPGoYKFTavLCqCwxcvsIpMhTNpwrZPsFYnBMDFFBxCivbOGA/exec";
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim(),
            message: formData.get('message').trim()
        };

        fetch(scriptURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`${response.status} ${response.statusText} ${response.url}`);
                }
            })
            .then(data => {
                thisForm.querySelector('.loading').classList.remove('d-block');
                if (data.trim() == 'OK') {
                    thisForm.querySelector('.sent-message').classList.add('d-block');
                    thisForm.reset();
                } else {
                    throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
                }
            })
            .catch((error) => {
                displayError(thisForm, error);
            });
    }

    function displayError(thisForm, error) {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.error-message').innerHTML = error;
        thisForm.querySelector('.error-message').classList.add('d-block');
    }

})();
