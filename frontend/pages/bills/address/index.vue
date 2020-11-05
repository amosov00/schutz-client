<template> </template>

<script>
export default {
  name: "bills_address",
  layout: "profile",
  middleware: ["authRequired", "adminRequired", "contracts"],
  asyncData({redirect}) {
    redirect('/bills/')
  },
};
</script>

<style></style>
