<template>
  <v-container>
    <input v-validate="'required|email'" name="email" type="text" />
    <span>{{ errors.first("email") }}</span>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    validateBeforeSubmit() {
      this.$validator
        .validateAll()
        .then(function (response) {
          // Validation success if response === true
        })
        .catch(function (e) {
          // Catch errors
        });
    },
  },
};
</script>
