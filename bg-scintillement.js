const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const fontSize = 13; // Légèrement plus petit pour pouvoir en mettre beaucoup

// Extraits de code réels de Pyo et PyTorch / Torchaudio pour le traitement du signal (DSP)
const codeSnippets = [
    "import pyo",
    "import torch",
    "import torchaudio",
    "s = pyo.Server(duplex=0).boot()",
    "s.start()",
    "src = pyo.Sine(freq=440, mul=0.2).out()",
    "stft = torch.stft(waveform, n_fft=2048, hop_length=512)",
    "spec = torch.abs(stft)",
    "mel_transform = torchaudio.transforms.MelSpectrogram(sample_rate=44100)",
    "loss = torch.nn.functional.mse_loss(y_pred, y_true)",
    "optimizer.zero_grad()",
    "loss.backward()",
    "optimizer.step()",
    "class AudioDSPNet(torch.nn.Module):",
    "    def __init__(self):",
    "        super().__init__()",
    "        self.conv = torch.nn.Conv1d(1, 16, 3)",
    "    def forward(self, x): return self.conv(x)",
    "env = pyo.Adsr(attack=0.01, decay=0.1, sustain=0.6, release=0.2)",
    "bquad = pyo.Biquad(src, freq=1000, q=1, type=0)",
    "chorus = pyo.Chorus(src, depth=2, feedback=0.4).out()",
    "waveform, sr = torchaudio.load('signal.wav')",
    "resampler = torchaudio.transforms.Resample(sr, 16000)",
    "inv_spec = torch.istft(stft, n_fft=2048)",
    "params = model(spec)",
    "delay = pyo.Delay(src, delay=0.25, feedback=0.5).out()",
    "hann_window = torch.hann_window(window_length=2048)",
    "phase = torch.angle(stft)",
    "signal = torch.tensor(audio_data, dtype=torch.float32)",
    "grain = pyo.Granulator(snd=table, env=env, pitch=1).out()",
    "lfo = pyo.LFO(freq=0.5, type=3).val()"
];

let activeLines = [];
const maxLines = 1500; // NOMBRE MAX DE LIGNES : Augmente cette valeur pour que ça "pullule" encore plus !

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Classe représentant une ligne de code autonome
class CodeLine {
    constructor() {
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        // Position X aléatoire (on garde de la marge à droite pour pas que ça coupe)
        this.x = Math.random() * (width - 350); 
        // Position Y aléatoire calée sur la grille du fontSize
        this.y = Math.random() * (height - fontSize) + fontSize;
        this.opacity = 0.01;
        this.visibleChars = 0;
        this.state = 'typing'; // Trois états : typing -> holding -> fading
        
        // Paramètres de vitesse personnalisés par ligne pour un effet asynchrone naturel
        this.typeSpeed = Math.random() * 1.5 + 0.5; // Vitesse d'écriture (caractères par frame)
        this.fadeSpeed = 0.003 + Math.random() * 0.004; // Vitesse de disparition lente
        this.holdTime = Math.floor(Math.random() * 60) + 30; // Temps d'attente une fois écrit (en frames)
    }

    update() {
        if (this.state === 'typing') {
            // Monte doucement en opacité pendant l'écriture
            if (this.opacity < 0.35) this.opacity += 0.04; 
            
            this.visibleChars += this.typeSpeed;
            if (this.visibleChars >= this.text.length) {
                this.visibleChars = this.text.length;
                this.state = 'holding';
            }
        } else if (this.state === 'holding') {
            this.holdTime--;
            if (this.holdTime <= 0) {
                this.state = 'fading';
            }
        } else if (this.state === 'fading') {
            // Estompement progressif des caractères
            this.opacity -= this.fadeSpeed;
        }
    }

    draw() {
        ctx.font = fontSize + 'px Consolas, monospace';
        ctx.textAlign = 'left';
        // Utilisation d'un gris clair (rgb 165, 165, 165) modulé par l'opacité de la ligne
        ctx.fillStyle = `rgba(180, 180, 180, ${this.opacity})`;
        
        // On tronque la chaîne pour n'afficher que les caractères "déjà écrits"
        const printedText = this.text.substring(0, Math.floor(this.visibleChars));
        ctx.fillText(printedText, this.x, this.y);
    }
}

function animateMatrix() {
    // Efface le canvas à chaque frame pour gérer la transparence globale
    ctx.clearRect(0, 0, width, height);

    // Si on a moins de lignes que le maximum, on tente d'en faire spawner une nouvelle
    if (activeLines.length < maxLines && Math.random() < 0.3) {
        activeLines.push(new CodeLine());
    }

    // Boucle à l'envers pour pouvoir supprimer les lignes mortes sans sauter d'index
    for (let i = activeLines.length - 1; i >= 0; i--) {
        const line = activeLines[i];
        line.update();
        line.draw();

        // Si la ligne a fini de s'estomper, on la retire du tableau
        if (line.state === 'fading' && line.opacity <= 0) {
            activeLines.splice(i, 1);
        }
    }

    // Boucle de rendu native (60fps fluide)
    requestAnimationFrame(animateMatrix); /* <-- MODIFIÉ ICI */
}

// Lancement de l'animation
animateMatrix();