/**
 * Steps a scene through `--step` 0…N on a loop. `data-timeline` lists how long (ms) each step
 * lasts before advancing; the final step holds for `data-hold` ms, then the scene resets.
 * Elements with `data-step-text="a|b|c"` get the text for the current step.
 */
export type SceneTimeline = {
  play(fromStart?: boolean): void;
  pause(): void;
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const RESET_FADE_MS = 450;

export function createSceneTimeline(scene: HTMLElement): SceneTimeline {
  const durations = (scene.dataset.timeline ?? '')
    .split(/\s+/)
    .map(Number)
    .filter((value) => value > 0);
  const lastStep = durations.length;
  const hold = Number(scene.dataset.hold) || 2600;
  const texts = [...scene.querySelectorAll<HTMLElement>('[data-step-text]')].map((element) => ({
    element,
    values: (element.dataset.stepText ?? '').split('|'),
  }));

  let step = 0;
  let timer = 0;
  let playing = false;

  const render = () => {
    scene.style.setProperty('--step', String(step));
    for (const { element, values } of texts) {
      element.textContent = values[Math.min(step, values.length - 1)] ?? '';
    }
  };

  const advance = () => {
    if (step < lastStep) {
      step += 1;
      render();
      schedule();
      return;
    }
    scene.classList.add('is-resetting');
    timer = window.setTimeout(() => {
      step = 0;
      render();
      scene.classList.remove('is-resetting');
      schedule();
    }, RESET_FADE_MS);
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (!playing) return;
    timer = window.setTimeout(advance, step < lastStep ? durations[step] : hold);
  };

  if (reducedMotion.matches) {
    step = lastStep;
    render();
    return { play() {}, pause() {} };
  }

  render();

  return {
    play(fromStart = false) {
      if (fromStart) {
        step = 0;
        scene.classList.remove('is-resetting');
        render();
      }
      if (playing && !fromStart) return;
      playing = true;
      schedule();
    },
    pause() {
      playing = false;
      window.clearTimeout(timer);
    },
  };
}
