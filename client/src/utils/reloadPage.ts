const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function reloadPage(time: number) {
  await delay(time);
  window.location.reload();
}
