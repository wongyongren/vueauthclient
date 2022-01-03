<template>
  <div>
    <v-col style="text-align: center">
      <v-container>
        <h1>Report Page</h1>
        <v-col
          ><h2>
            Date :
            {{
              date.getUTCDate() +
              "-" +
              (date.getUTCMonth() + 1) +
              "-" +
              date.getUTCFullYear()
            }}
          </h2></v-col
        ></v-container
      >
      <v-container>
        <v-card>
          <div v-for="[key, value] of Object.entries(datas)" :key="key">
            <table
              v-for="[key, values] of Object.entries(value)"
              :key="key"
              id="customers"
            >
              <div v-for="[key, worker] of Object.entries(values)" :key="key">
                <tr>
                  <th style="background-color: black" colspan="3">
                    {{ key }}
                  </th>
                </tr>
                <tr>
                  <th>Worker Name</th>
                  <th>Worker In Time</th>
                  <th>Worker Out Time</th>
                </tr>

                <tr v-for="[key, data] of Object.entries(worker)" :key="key">
                  <td>
                    {{ data }}
                  </td>
                  <td>
                    {{ data }}
                  </td>
                  <td>
                    {{ data }}
                  </td>
                </tr>
              </div>
            </table>
          </div>
          <v-btn class="button">Print the entire page</v-btn>
        </v-card>
      </v-container>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    date: new Date(),
    sites: [],
    datas: [],
  }),
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("/api/reportlist")
        .then((response) => {
          console.log(response.data);
          self.datas.push(response.data);
          for (const [key, value] of Object.entries(response.data)) {
            console.log(`${key}: ${value}`);
          }
          //  for (let i = 0; i < response.data.length; i++) {
          //    console.log(response.data[i].currentsite);
          //    self.datas.push(response.data[i]);
          //  }
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