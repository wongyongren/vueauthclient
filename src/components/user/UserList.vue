<template>
  <div>
    <v-col style="text-align: center; padding-top: 60px">
      <v-container>
        <h1>User List Page</h1>
      </v-container>
    </v-col>
    <v-data-table
      :headers="headers"
      :items="datas"
      sort-by="datein"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <template>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              :to="{ path: '/user/useredit/' + userid }"
            >
              Edit Item
            </v-btn>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <v-btn color="primary" dark class="mb-2" :to="'/register'">
              New Item
            </v-btn>
          </template>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    datas: [],
    userid:1,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "User Name", value: "username" },
      { text: "Role", value: "role" },
    ],
    editedIndex: -1,
  }),
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("/api/username")
        .then((response) => {
          self.datas = response.data;
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