<template>
  <div></div>
</template>
<script>
export default {
  auth: false,
  mounted() {
    // Redirect all unexisting pages to 404 page
    this.$router.push("/404");
  },
};
</script>
