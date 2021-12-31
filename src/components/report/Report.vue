<template>
  <div data-app>
    <v-col style="text-align: center">
      <v-container>
        <h1>Report Page</h1>
        <v-col
          ><h2>
            Date :
            {{
              date.getUTCDate() +
              "-" +
              date.getUTCMonth() +
              "-" +
              date.getUTCFullYear()
            }}
          </h2></v-col
        ></v-container
      >
      <v-container>
        <ReportList />
      </v-container>
    </v-col>
  </div>
</template>

<script>
import ReportList from "@/components/report/ReportList.vue";

export default {
  name: "Report",
  components: {
    ReportList,
  },
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>

<style>
</style>