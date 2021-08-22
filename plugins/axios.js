export default function ({ $axios, redirect, app }) {
  $axios.onRequest((config) => {
    config.headers.common["Cache-Control"] = "private";
  });
}
