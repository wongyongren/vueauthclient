<template>
  <v-container>
    <input v-validate="'required|email'" name="email" type="text" />
    <span>{{ errors.first("email") }}</span>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>
