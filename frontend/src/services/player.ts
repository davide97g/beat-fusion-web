const FADE_IN_DURATION = 0.5;
const FADE_OUT_DURATION = 0.25;
const OVERLAPPING_SONGS = 3;

let controller = new AbortController();

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fadeIn(
  audioEl: HTMLAudioElement,
  duration: number = FADE_IN_DURATION,
) {
  audioEl.volume = 0;
  audioEl.play();
  for (let i = 0; i < 100; i++) {
    audioEl.volume = i / 100;
    await wait((duration * 1000) / 100);
  }
}

export async function fadeOut(
  audioEl: HTMLAudioElement,
  duration: number = FADE_OUT_DURATION,
) {
  for (let i = 100; i > 0; i--) {
    audioEl.volume = i / 100;
    await wait((duration * 1000) / 100);
  }
  audioEl.pause();
}

export async function runInOrder(asyncFunctions: Array<() => Promise<any>>) {
  controller = new AbortController();
  return new Promise<void>(async (resolve, reject) => {
    controller.signal.addEventListener("abort", () => {
      console.log("Aborted");
      reject(new Error("Operation aborted"));
    });
    for (const func of asyncFunctions) {
      console.log("Running function");
      if (controller.signal.aborted)
        return reject(new Error("Operation aborted"));
      await func();
    }
    resolve();
  });
}

export async function playSong({
  songId,
  start,
}: {
  songId: string;
  start: number;
}) {
  console.log(`Playing song ${songId}`);
  const audioEl = document.getElementById(songId) as HTMLAudioElement | null;
  if (audioEl) {
    audioEl.currentTime = Math.max(0, start);
    await fadeIn(audioEl);
  }
}

export function stopCurrentSong() {
  controller.abort();
  // find current song and stop it
  const audioEls = document.getElementsByTagName("audio");
  for (let i = 0; i < audioEls.length; i++) {
    const audioEl = audioEls[i];
    if (!audioEl.paused) {
      fadeOut(audioEl);
    }
  }
}

export async function stopSong(songId: string) {
  console.log(`Stopping song ${songId}`);
  const audioEl = document.getElementById(songId) as HTMLAudioElement | null;
  if (audioEl) {
    await fadeOut(audioEl);
  }
}

export const playInterval = async ({
  songId,
  start,
  end,
}: Readonly<{
  songId: string;
  start: number;
  end: number;
}>) => {
  const audioEl = document.getElementById(songId) as HTMLAudioElement | null;
  if (!audioEl) {
    console.error(`Song ${songId} not found`);
    return;
  }
  await playSong({ songId, start: start - FADE_IN_DURATION });
  await wait((end - start - FADE_OUT_DURATION - OVERLAPPING_SONGS) * 1000);
  stopSong(songId);
};
