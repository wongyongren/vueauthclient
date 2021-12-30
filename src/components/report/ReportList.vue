<template>
  <v-card>
    <table v-for="site in sites" :key="site" id="customers">
      <tr>
        <th style="background-color: black" colspan="3">{{ site.projectname }}</th>
      </tr>
      <tr>
        <th>Worker Name</th>
        <th>Worker In Time</th>
        <th>Worker Out Time</th>
      </tr>
      <tr v-for="site in sites" :key="site">
        <td>
          {{site.employeename}}
        </td>
        <td >
          {{site.datein + " " +site.clockin}}
        </td>
        <td >
          {{site.dateout + " " +site.clockout}}
        </td>
      </tr>
      <br />
    </table>
    {{ sites }}
    <v-btn class="button">Print the entire page</v-btn>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sites: [],
    };
  },
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("/api/reportlist")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.sites.push(response.data[i]);

          }
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
        });
    },
  },
  mounted() {
    this.getUserData(); // router at here
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