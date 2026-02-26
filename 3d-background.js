// ================================================
// 1. INITIALISATION DE LA SCÈNE THREE.JS
// ================================================
const scene = new THREE.Scene();
// On recule un peu la caméra pour avoir une vue d'ensemble en "portrait"
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30; 

const renderer = new THREE.WebGLRenderer({ alpha: true });

// ================================================
// 2. L'EFFET ASCII (Ton style Cyan Tech)
// ================================================
// Caractères du plus sombre au plus clair
const effect = new THREE.AsciiEffect(renderer, ' ¨.+*&=%@#', { invert: false, resolution: 0.2 });
effect.setSize(window.innerWidth, window.innerHeight);
effect.domElement.id = 'ascii-container';
effect.domElement.style.color = '#c2c2c2ff'; 
effect.domElement.style.backgroundColor = '#050505'; 
document.body.appendChild(effect.domElement); 

// ================================================
// 3. L'ÉCLAIRAGE (Crucial pour les volumes de la TD3)
// ================================================
// Lumière principale venant d'en haut à droite pour sculpter les boutons
const mainLight = new THREE.PointLight(0xffffff, 1.5);
mainLight.position.set(50, 50, 50);
scene.add(mainLight);

// Lumière de débouchage venant du bas pour éviter les zones trop noires
const fillLight = new THREE.PointLight(0xffffff, 0.5);
fillLight.position.set(-50, -30, 20);
scene.add(fillLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

// ================================================
// 4. CHARGEMENT ET CONFIGURATION DU MODÈLE TD3
// ================================================
let myModel;
// Variables pour ajuster la position initiale (à modifier si besoin !)
const initialX = 30;  // Commence un peu plus a droite
const initialY = 50;  // Commence un peu plus haut dans la page
const initialScale = 14; // Taille globale

const loader = new THREE.GLTFLoader();
loader.load(
    './td3.glb', // Assure-toi que le fichier est bien là !
    function (gltf) {
        myModel = gltf.scene;
        
        // --- AJUSTEMENTS CRUCIAUX POUR LE MODE PORTRAIT ---

        // A. TAILLE : On agrandit le modèle pour qu'il soit imposant
        myModel.scale.set(initialScale, initialScale, initialScale); 

        // B. ORIENTATION "PORTRAIT" : On le redresse !
        // Math.PI / 2 le mettrait parfaitement vertical (plat face caméra).
        // Math.PI / 2.2 l'incline très légèrement vers le haut pour un meilleur angle de vue sur les potards.
        myModel.rotation.x = Math.PI / 1.8;
        myModel.rotation.y = Math.PI / 2;
        
        // C. POSITION INITIALE : On le place en haut de l'écran au début
        myModel.position.set(initialX, initialY, 0);

        // D. MATÉRIAU : On applique le matériau blanc pour que l'ASCII fonctionne
        myModel.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhongMaterial({ 
                    color: 0xffffff,
                    shininess: 100 // Rend les boutons un peu plus brillants en ASCII
                });
            }
        });
        scene.add(myModel);
    }
);

// ================================================
// 5. GESTION DU SCROLL FLUIDE (Smooth Scrolling)
// ================================================
let scrollY = window.scrollY;
let currentScroll = window.scrollY; 

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// ================================================
// 6. BOUCLE D'ANIMATION PRINCIPALE
// ================================================
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0005;

    // Lissage mathématique du scroll (Lerp) pour éviter les saccades
    currentScroll += (scrollY - currentScroll) * 0.4; 

    if (myModel) {
        // --- C'EST ICI QUE SE JOUE LE DÉFILEMENT ---
        
        // La position Y actuelle = Position de départ - (Scroll * vitesse)
        // Plus le multiplicateur (0.06) est élevé, plus ça descend vite.
        myModel.position.y = -initialY + (currentScroll * 0.033);

        // OPTIONNEL : Une très légère rotation lente permanente pour que 
        // l'ASCII "chatouille" et ne paraisse pas figé.
        myModel.rotation.z = -0.3 + Math.sin(time * 0.5) * 0.1;
    }

    const lightScrollOffset = currentScroll * 0.0007; 

    // On garde exactement tes mathématiques et tes distances pour conserver le rendu que tu aimes, 
    // mais on ajoute "lightScrollOffset" pour faire tourner les ombres quand tu descends.
    // (On garde le "time" pour que la lumière "respire" un peu même quand on ne scrolle pas).
    mainLight.position.x = -70 + Math.sin(time * 0.8 + lightScrollOffset) * 50;
    mainLight.position.z = 30 + Math.cos(time * 0.5 + lightScrollOffset) * 35;
    mainLight.position.y = 50 - (currentScroll * 0.015);

    effect.render(scene, camera);
}

// ================================================
// 7. RESPONSIVE (Redimensionnement de la fenêtre)
// ================================================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
});

animate();