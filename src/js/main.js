/**
 * Botanica - Scripts principaux
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCartActions();
    initContactForm();
    highlightActiveNavLink();
});

/**
 * Gestion du basculement Dark Mode / Contraste
 */
function initThemeToggle() {
    const themeButtons = document.querySelectorAll('button:has(.material-symbols-outlined:contains("contrast")), button span[data-icon="contrast"], button .material-symbols-outlined');
    
    // Rechercher spécifiquement les boutons de thème
    document.querySelectorAll('button').forEach(button => {
        const icon = button.querySelector('.material-symbols-outlined');
        if (icon && (icon.textContent.trim() === 'contrast' || icon.getAttribute('data-icon') === 'contrast')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const html = document.documentElement;
                if (html.classList.contains('dark')) {
                    html.classList.remove('dark');
                    html.classList.add('light');
                    localStorage.setItem('botanica-theme', 'light');
                } else {
                    html.classList.remove('light');
                    html.classList.add('dark');
                    localStorage.setItem('botanica-theme', 'dark');
                }
            });
        }
    });

    // Restaurer le thème sauvegardé
    const savedTheme = localStorage.getItem('botanica-theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }
}

/**
 * Gestion des boutons "Ajouter au panier" avec notification Toast
 */
function initCartActions() {
    // Créer le conteneur de toast s'il n'existe pas
    let toast = document.getElementById('botanica-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'botanica-toast';
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <span class="material-symbols-outlined text-secondary-fixed">check_circle</span>
            <span id="toast-message">Article ajouté au panier</span>
        `;
        document.body.appendChild(toast);
    }

    // Attacher l'événement à tous les boutons d'ajout
    const addButtons = document.querySelectorAll('button:has(span.material-symbols-outlined), button');
    addButtons.forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('ajouter') || text.includes('panier')) {
            btn.addEventListener('click', (e) => {
                // Ne pas bloquer la navigation si c'est un lien
                if (btn.tagName === 'BUTTON') {
                    e.preventDefault();
                    
                    // Trouver le nom du produit le plus proche
                    let productName = 'Spécimen';
                    const card = btn.closest('div.group, article, .grid');
                    if (card) {
                        const titleEl = card.querySelector('h1, h2, h3');
                        if (titleEl) {
                            productName = titleEl.textContent.trim();
                        }
                    }

                    showToast(`"${productName}" a été ajouté à votre panier.`);
                }
            });
        }
    });
}

function showToast(message) {
    const toast = document.getElementById('botanica-toast');
    const msgEl = document.getElementById('toast-message');
    if (toast && msgEl) {
        msgEl.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/**
 * Mise en évidence du lien actif dans la barre de navigation
 */
function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav a, nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        const linkPath = href.split('/').pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.remove('text-on-surface-variant', 'font-medium');
            link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
        }
    });
}

/**
 * Gestion du formulaire de contact
 */
function initContactForm() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nomInput = document.getElementById('nom');
            const nom = nomInput ? nomInput.value : 'Merci';
            showToast(`Merci ${nom}, votre message a bien été transmis à nos archivistes.`);
            contactForm.reset();
        });
    }
}
