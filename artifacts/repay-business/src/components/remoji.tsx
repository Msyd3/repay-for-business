import { useEffect, useRef, type CSSProperties } from 'react';
import blue from '../assets/remoji/blue.png';
import mint from '../assets/remoji/mint.png';
import charcoal from '../assets/remoji/charcoal.png';
import purple from '../assets/remoji/purple.png';

const characters = {
  blue: { image: blue, color: '#008CFF', ratio: '750 / 750', x: '67%', y: '38%', eyeWidth: '14%', eyeHeight: '27%', gap: '8%', angle: '-29deg' },
  mint: { image: mint, color: '#00CEB3', ratio: '790 / 818', x: '46%', y: '62%', eyeWidth: '10.5%', eyeHeight: '24%', gap: '4%', angle: '-2deg' },
  charcoal: { image: charcoal, color: '#2D323A', ratio: '597 / 717', x: '50%', y: '33%', eyeWidth: '12.5%', eyeHeight: '24%', gap: '9%', angle: '-2deg' },
  purple: { image: purple, color: '#7130FA', ratio: '850 / 887', x: '51%', y: '35%', eyeWidth: '5.5%', eyeHeight: '12%', gap: '4.5%', angle: '4deg' },
};

export function Remoji({ kind, placement }: { kind: keyof typeof characters; placement: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const character = characters[kind];
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const look = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        if (box.bottom < 0 || box.top > innerHeight) return;
        const x = Math.max(-1, Math.min(1, (event.clientX - box.left - box.width / 2) / 350));
        const y = Math.max(-1, Math.min(1, (event.clientY - box.top - box.height / 2) / 350));
        el.style.setProperty('--look-x', `${x * 7}px`);
        el.style.setProperty('--look-y', `${y * 5}px`);
        el.style.setProperty('--turn', `${x * 10}deg`);
      });
    };
    const reset = () => { el.style.setProperty('--look-x', '0px'); el.style.setProperty('--look-y', '0px'); el.style.setProperty('--turn', '0deg'); };
    window.addEventListener('pointermove', look, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', look); document.documentElement.removeEventListener('pointerleave', reset); };
  }, []);
  const style = { '--bot-color': character.color, '--eye-x': character.x, '--eye-y': character.y, '--eye-width': character.eyeWidth, '--eye-height': character.eyeHeight, '--eye-gap': character.gap, '--eye-angle': character.angle, aspectRatio: character.ratio } as CSSProperties;
  return <div ref={ref} className={`remoji remoji-${kind} remoji-${placement}`} style={style} aria-hidden="true">
    <div className="remoji-float"><div className="remoji-turn">
      <div className="remoji-body" style={{ maskImage: `url(${character.image})`, WebkitMaskImage: `url(${character.image})` }} />
      <div className="remoji-gaze"><div className="remoji-eyes"><i /><i /></div></div>
    </div></div>
    <div className="remoji-shadow" />
  </div>;
}
