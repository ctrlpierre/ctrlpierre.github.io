// 1. Détection automatique du canvas (anti-erreur)
const canvas = document.getElementById('ascii-canvas') || document.getElementById('webgl-canvas');

if (!canvas) {
    console.error("ERREUR : Le canvas est introuvable dans ton fichier HTML !");
}

const ctx = canvas.getContext('2d');
let width, height, cols, rows;

// 2. Palette d'intensité avec tes symboles mathématiques (Gamma, Bêta, etc.)
// Organisés du plus "léger" au plus "dense" visuellement
const chars = " ·×÷=∫∑∆πγβ"; 
const fontSize = 16; 

// Ajustement de la grille à la taille de l'écran
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cols = Math.floor(width / fontSize);
    rows = Math.floor(height / fontSize);
}
window.addEventListener('resize', resize);
resize();

let time = 0;

function animate() {
    // Fond noir pur
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Couleur cyan façon Terminal
    ctx.font = fontSize + "px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    time += 0.03;

    // Dessin de la grille mathématique
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = (i - cols / 2) * 0.1;
            let y = (j - rows / 2) * 0.1;
            let distance = Math.sqrt(x * x + y * y);

            let z = Math.sin(distance * 2 - time * 2) * 0.5 
                  + Math.cos(x * 1.5 + time) * 0.25 
                  + Math.sin(y * 1.2 - time * 0.5) * 0.25;

            let normalizedZ = (z + 1) / 2;
            let charIndex = Math.floor(normalizedZ * chars.length);
            charIndex = Math.max(0, Math.min(chars.length - 1, charIndex));

            if (charIndex > 0) {
                // 1. Luminosité plus douce : de 25% (sombre) à 55% max (cyan pur, sans devenir blanc)
                let lightness = 60 + (normalizedZ * 30); 
                
                // 2. Application de la couleur HSL
                ctx.fillStyle = `hsl(0, 0%, ${lightness}%)`;

                // 3. Opacité harmonisée : de 15% à 70% max (évite le côté trop "solide" des crêtes)
                ctx.globalAlpha = normalizedZ * 0.55 + 0.15; 
                
                ctx.fillText(chars[charIndex], i * fontSize + fontSize / 2, j * fontSize + fontSize / 2);
            }
        }
    }
    
    ctx.globalAlpha = 1.0;
    requestAnimationFrame(animate);
}

// Lancement de l'animation
if (canvas) {
    animate();
}