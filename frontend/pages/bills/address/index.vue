<template> </template>

<script>
export default {
  name: "bills_address",
  layout: "admin",
  middleware: ["authRequired", "adminRequired", "contracts"],
  asyncData({redirect}) {
    redirect('/bills/')
  },
};
</script>

<style></style>
