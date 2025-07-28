document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = form.elements['name'].value.trim();
        const email = form.elements['email'].value.trim();
        const message = form.elements['message'].value.trim();
        
        if (!name || !email || !message) {
            showStatus('Please fill in all required fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showStatus('Please enter a valid email address', 'error');
            return;
        }
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                form.reset();
                showStatus('Message sent successfully! I will get back to you soon.', 'success');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showStatus('Oops! There was a problem sending your message. Please try again later.', 'error');
            console.error('Error:', error);
        }
    });
    
    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});