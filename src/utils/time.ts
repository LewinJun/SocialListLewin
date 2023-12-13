export const formatMint = (second: number) => {
  if (second < 59) {
    return `00:${second < 9 ? '0' + second : second}`;
  }
  const min = Math.floor(second / 60);
  const sec = second % 60;
  return `${min < 9 ? '0' + min : min}:${sec < 9 ? '0' + sec : sec}`;
};
