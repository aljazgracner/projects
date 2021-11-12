export const timeout = async function (seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
