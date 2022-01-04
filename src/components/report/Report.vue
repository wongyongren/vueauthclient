<template>
  <div>
    <v-col style="text-align: center">
      <v-container>
        <h1>Report Page</h1>
        <v-col
          ><h2>
            Date :
            {{ date }}
          </h2></v-col
        ></v-container
      >
      <v-container v-for="[key1, value] of Object.entries(datas)" :key="key1">
        <v-card
          v-for="[key2, values] of Object.entries(value)"
          :key="key2"
          class="elevation-0"
        >
          <h1>{{ key2 }}</h1>
          <table
            v-for="[key3, worker] of Object.entries(values)"
            :key="key3"
            id="customers"
          >
            <tr>
              <th style="background-color: black" colspan="3">
                {{ key2 }} - {{ key3 }}
              </th>
            </tr>
            <tr>
              <th>Worker Name</th>
              <th>Worker In Time</th>
              <th>Worker Out Time</th>
            </tr>

            <tr v-for="[key, data] of Object.entries(worker)" :key="key">
              <td>
                {{ data.employeename }}
              </td>
              <td>{{ data.datein }} - {{ data.clockin }}</td>
              <td>{{ data.dateout }} - {{ data.clockout }}</td>
            </tr>

            <br />
          </table>
          <v-divider></v-divider>
          <br />
        </v-card>
        <v-btn class="button">Print the entire page</v-btn>
      </v-container>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    sites: [],
    datas: [],
  }),
  methods: {
    getUserData: function () {
      let self = this;
      var date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);

      let data = {
        date: date,
      };
      axios
        .post("/api/reportlist", data)
        .then((response) => {
          console.log(response.data);
          self.datas.push(response.data);
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>

<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-bottom: 20px;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: green;
  color: white;
}
.printButton {
  border-radius: 4px;
}
</style>