export const getUuid = (length?: number) => {
  let result = '';
  const charactersLength = length || 32;

  for (let i = 0; i < charactersLength; i++) {
    const randomValue = Math.floor(
      (Date.now() * Math.random()) % charactersLength,
    );
    result += String.fromCharCode(randomValue + 65);
  }
  return result;
};
