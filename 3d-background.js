// 1. INITIALISATION CLASSIQUE THREE.JS
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 2. LA MAGIE : L'EFFET ASCII
// On passe le renderer, les caractères (du plus sombre au plus clair) et les options
const effect = new THREE.AsciiEffect(renderer, ' ·×÷=∫∑∆πγβ', { invert: true, resolution: 0.2 });
effect.setSize(window.innerWidth, window.innerHeight);

// On applique nos styles au container généré
effect.domElement.id = 'ascii-container';
effect.domElement.style.color = '#ffffffff'; // Ton cyan
effect.domElement.style.backgroundColor = '#050505'; // Fond noir
document.body.appendChild(effect.domElement); // On l'ajoute au HTML

// 3. LA LUMIÈRE (Crucial pour créer les contrastes clairs/foncés)
const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(100, 100, 100);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
pointLight2.position.set(-100, -100, -100);
scene.add(pointLight2);

// 4. L'OBJET 3D (Pour tester immédiatement)
// On crée un nœud mathématique complexe
const geometry = new THREE.TorusKnotGeometry(15, 4, 100, 16);
// Le matériau doit réagir à la lumière (Phong ou Standard)
const material = new THREE.MeshPhongMaterial({ color: 0xffffff }); 
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

/* // =========================================================
// POUR CHARGER TON PROPRE MODÈLE (.gltf ou .glb) PLUS TARD :
// Décommente ce bloc et commente le TorusKnot au-dessus !
// =========================================================

let myModel;
const loader = new THREE.GLTFLoader();
loader.load(
    'chemin/vers/ton/modele.gltf', // Remplace par ton fichier
    function (gltf) {
        myModel = gltf.scene;
        // Optionnel : ajuster la taille et la position
        myModel.scale.set(10, 10, 10); 
        myModel.position.set(0, 0, 0);
        
        // Appliquer un matériau qui réagit bien à la lumière sur toutes les parties du modèle
        myModel.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhongMaterial({ color: 0xffffff });
            }
        });
        scene.add(myModel);
    }
);
*/

// 5. ANIMATION
function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0005;

    // On fait tourner la forme de test
    if (torusKnot) {
        torusKnot.rotation.x = time;
        torusKnot.rotation.y = time * 0.5;
    }

    // On fait tourner la lumière pour rendre l'ASCII dynamique
    pointLight1.position.x = Math.sin(time * 0.7) * 100;
    pointLight1.position.z = Math.cos(time * 0.3) * 100;

    // Rendu via l'AsciiEffect (et non le renderer classique)
    effect.render(scene, camera);
}

// 6. RESPONSIVE
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
});

animate();