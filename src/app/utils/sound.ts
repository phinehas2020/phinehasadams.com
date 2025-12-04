// Simple synthesized sound effects using Web Audio API
// No external assets required. Pure code.

class SoundSystem {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            // Initialize on first user interaction usually, but we'll try to init lazily
        }
    }

    private init() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            this.ctx = new AudioContextClass();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.5; // Increased from 0.3
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {
                // Ignore errors if resume fails due to lack of user interaction
            });
        }
    }

    public resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().then(() => {
                console.log('AudioContext resumed');
            });
        }
    }

    public playTypingSound() {
        this.init();
        if (!this.ctx || !this.masterGain) return;

        // Check if context is running
        if (this.ctx.state === 'suspended') return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Mechanical click sound - sharper and higher pitch
        osc.type = 'square';
        osc.frequency.setValueAtTime(300 + Math.random() * 100, this.ctx.currentTime); // Higher pitch

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime); // Increased from 0.1
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03); // Sharper decay

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
    }

    public playBootSequence() {
        this.init();
        if (!this.ctx || !this.masterGain) return;

        // Check if context is running
        if (this.ctx.state === 'suspended') return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Futuristic power-up sweep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.1); // Increased from 0.2
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 1.5);
    }

    public playCursorDrop() {
        this.init();
        if (!this.ctx || !this.masterGain) return;

        // Check if context is running
        if (this.ctx.state === 'suspended') return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Low thud for "enter" key
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime); // Increased from 0.2
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }
}

export const soundSystem = new SoundSystem();
