export default ({ $axios, env }) => {
  $axios.onRequest((config) => {
    config.headers.common["Cache-Control"] = "private";
  });
};
