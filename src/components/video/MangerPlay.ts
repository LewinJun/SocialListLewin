class ManagerVideo {
  private onStop: () => void;
  private key: string;
  private playing: boolean = false;
  private playCall: {[key: string]: () => void} = {};
  clickStopIds: Array<string> = [];
  constructor() {
    this.onStop = () => {};
    this.key = '';
  }
  play({onStop, key}: {onStop: () => void; key: string}) {
    console.log('key:', this.key, key);
    if (this.key !== key) {
      this.onStop?.();
    }
    this.key = key;

    this.onStop = onStop;
  }
  setPlay(play: boolean) {
    this.playing = play;
  }

  refreshVisibleItem(keys: Array<string>) {
    if (this.playing && !keys.includes(this.key)) {
      this.onStop?.();
    }
  }
  setVideoPlay(id: string, call?: () => void) {
    if (call) {
      this.playCall[id] = call;
    } else {
      delete this.playCall[id];
    }
  }
  exeVideoPlay(id: string) {
    this.playCall[id]?.();
  }
}

const SingleManagerVideo = (function () {
  let instance: ManagerVideo;
  return function () {
    if (instance) {
      return instance;
    }
    instance = new ManagerVideo();
    return instance;
  };
})();

export default SingleManagerVideo;
