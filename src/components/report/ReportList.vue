<template>
  <v-card style="position: unset">
    <v-card-title>
      Report List Time In
      <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
      <v-text-field
        v-model="searchIn"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headersIn"
      :items="listIn"
      :search="searchIn"
    ></v-data-table>
    <v-spacer></v-spacer>
    <v-card-title>
      Report List Time Out
      <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
      <v-text-field
        v-model="searchOut"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headersOut"
      :items="listOut"
      :search="searchOut"
    ></v-data-table>
    <v-btn class="button">Print the entire page</v-btn>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      searchIn: "",
      searchOut: "",
      headersIn: [
        {
          text: "Time In",
          align: "start",
          value: "time",
        },
        { text: "Project Site", value: "site" },
        { text: "Worker Name", value: "worker" },
      ],
      headersOut: [
        {
          text: "Time Out",
          align: "start",
          value: "time",
        },
        { text: "Project Site", value: "site" },
        { text: "Worker Name", value: "worker" },
      ],
      listIn: [
        {
          time: "10:05",
          site: "Suzhou",
          worker: "Wong",
        },
        {
          time: "10:06",
          site: "HQ",
          worker: "Phone",
        },
        {
          time: "10:07",
          site: "8 Tier",
          worker: "Zion",
        },
        {
          time: "10:08",
          site: "Seletar",
          worker: "A",
        },
        {
          time: "11:05",
          site: "Suzhou",
          worker: "B",
        },
        {
          time: "12:05",
          site: "Seletar",
          worker: "C",
        },
        {
          time: "09:00",
          site: "8 Tier",
          worker: "D",
        },
        {
          time: "10:30",
          site: "HQ",
          worker: "E",
        },
      ],
      listOut: [
        {
          time: "13:30",
          site: "Suzhou",
          worker: "Wong",
        },
        {
          time: "14:30",
          site: "HQ",
          worker: "Phone",
        },
        {
          time: "10:07",
          site: "8 Tier",
          worker: "Zion",
        },
        {
          time: "10:08",
          site: "Seletar",
          worker: "A",
        },
        {
          time: "11:05",
          site: "Suzhou",
          worker: "B",
        },
        {
          time: "12:05",
          site: "Seletar",
          worker: "C",
        },
        {
          time: "09:05",
          site: "8 Tier",
          worker: "D",
        },
        {
          time: "10:30",
          site: "HQ",
          worker: "E",
        },
      ],
    };
  },
  methods: {
      getUserData: function () {
      let self = this;
      axios
        .get("/api/supervisor")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.selectOption.push(response.data[i]);
          }
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
            alert(
              "You are not authorized to view this resource because you are not an admin."
            );
          }
        });
    },
}
};
</script>