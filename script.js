// Function to handle smooth scrolling
const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu after clicking
                const navbar = document.getElementById('navbar');
                if (navbar.classList.contains('active')) {
                     navbar.classList.remove('active');
                }
            }
        });
    });
};

// Function to handle mobile menu toggle
const setupMobileMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
};

// Function to handle contact form submission (simulated)
const handleFormSubmission = () => {
    const form = document.getElementById('contact-form');
    const statusMessage = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic simulation of form processing
            statusMessage.style.color = 'var(--color-accent-green)';
            statusMessage.textContent = 'Enviando mensagem...';
            
            setTimeout(() => {
                form.reset();
                statusMessage.style.color = 'var(--color-success)';
                statusMessage.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso. Responderemos em breve.';
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 5000);
                
            }, 2000);
        });
    }
};

// --- CTF Logic ---

const setupCTF = () => {
    const ctfOverlay = document.getElementById('ctf-overlay');
    const closeCtfButton = document.getElementById('close-ctf');
    const submitFlagButton = document.getElementById('submit-flag');
    const flagInput = document.getElementById('flag-input');
    const ctfResult = document.getElementById('ctf-result');

    // Decode the Base64 snippet in the HTML (c2VjdXJpdHkgaXMgZnVu -> security is fun)
    const CORRECT_FLAG_DECODED_PHRASE = 'security is fun';
    const CORRECT_FLAG = `GM{${CORRECT_FLAG_DECODED_PHRASE}}`.toLowerCase().replace(/\s/g, '_'); // Using underscores in the flag for typical CTF format: GM{security_is_fun}

    const showCTF = () => {
        ctfOverlay.classList.add('visible');
    }

    const hideCTF = () => {
        ctfOverlay.classList.remove('visible');
    }
    
    // 1. Initial Clue in Console
    const hintElement = document.querySelector('.ctf-hint');
    // 47-4f-54-4f-43-54-46 = GOTOCTF
    const hexClue = hintElement ? hintElement.getAttribute('data-clue') : '48-69-64-64-65-6E'; 
    
    console.log(
        `%c\n==========================================
|                SYSTEM LOG                |
|  Initial Check: OK.                      |
|  Status: Professional.                   |
|  Hidden Module detected. Access Path Required.
|  Clue 1 (HEX): ${hexClue}
|  Hint: Execute the decoded path (e.g., PATH()) in the console.
==========================================\n`, 
        "color: #00FFC2; font-size: 14px; font-family: 'Share Tech Mono', monospace;"
    );

    // 2. CTF Access Command (Triggered by user typing GOTOCTF() in console)
    window.GOTOCTF = () => {
        showCTF();
        console.log("%c[CTF MODE ACTIVATED] Good Luck.", "color: #FFC200;");
    };

    
    // 3. Flag Submission Logic
    submitFlagButton.addEventListener('click', () => {
        // Normalize flag input: lowercase, replace spaces with underscores
        const submittedFlag = flagInput.value.trim().toLowerCase().replace(/\s/g, '_');
        ctfResult.classList.remove('success', 'error');

        if (submittedFlag === CORRECT_FLAG) {
            ctfResult.textContent = `FLAG CAPTURADA! Parabéns, ${submittedFlag}. Sua habilidade foi validada. Entre em contato para oportunidades.`;
            ctfResult.classList.add('success');
            submitFlagButton.disabled = true;
            flagInput.disabled = true;
        } else if (submittedFlag.startsWith('gm{') && submittedFlag.endsWith('}')) {
             ctfResult.textContent = 'Flag incorreta. Revise o enigma. Certifique-se de que a decodificação está correta e formatada com underscores, se necessário.';
             ctfResult.classList.add('error');
        } else {
            ctfResult.textContent = 'Formato incorreto ou bandeira vazia. Use o formato GM{...}';
            ctfResult.classList.add('error');
        }
    });

    closeCtfButton.addEventListener('click', hideCTF);
};


// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
    setupMobileMenu();
    handleFormSubmission();
    setupCTF();
});

