document.addEventListener('DOMContentLoaded', () => {
    let ticking = false;

    function updateHalos() {
        // 1. Calcul du pourcentage de scroll (de 0.0 en haut à 1.0 tout en bas)
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

        // --- HALO 1 : Teinte de Bleu (220) -> Cyan (180) -> Vert (140)
        const hue1 = 220 - (scrollPercent * 70); 
        // Mouvement : descend de 70vh (beaucoup plus) et se décale de 2vw (presque pas)
        const y1 = scrollPercent * 70; 
        const x1 = scrollPercent * 2; 

        // --- HALO 2 : Teinte de Cyan (185) -> Bleu profond (230)
        const hue2 = 185 + (scrollPercent * 90); 
        // Mouvement : monte de 80vh (beaucoup plus) et se décale de -2vw (reste collé à gauche)
        const y2 = -(scrollPercent * 80); 
        const x2 = -(scrollPercent * 2);
        // 2. Envoi des valeurs au CSS via des variables personnalisées
        const root = document.documentElement;
        
        root.style.setProperty('--h1-hue', hue1);
        root.style.setProperty('--h1-y', `${y1}vh`);
        root.style.setProperty('--h1-x', `${x1}vw`);

        root.style.setProperty('--h2-hue', hue2);
        root.style.setProperty('--h2-y', `${y2}vh`);
        root.style.setProperty('--h2-x', `${x2}vw`);

        ticking = false;
    }

    // Écouteur d'événement sur le scroll optimisé avec requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHalos);
            ticking = true;
        }
    });
    
    // Appel initial pour placer les halos au bon endroit au chargement
    updateHalos();
});