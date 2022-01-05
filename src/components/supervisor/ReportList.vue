<template>
  <div>
    <v-col style="text-align: center; padding-top: 60px">
      <v-container>
        <h1>Report Page</h1>
        <v-col
          ><h2>
            Date :
            {{ date }}
            -
            {{ tomorrow }}
          </h2></v-col
        ></v-container
      >
    </v-col>
    <v-data-table
      :headers="headers"
      :items="datas"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>-->
          <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark class="mb-2" :to="'/supervisor'">
              New Item
            </v-btn>
          </template>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.employeename"
                        label="employeename"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.projectname"
                        label="projectname"
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="refdatein"
                        v-model="modeldatein"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.datein"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.datein"
                            label="Date In"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>

                        <v-date-picker
                          v-model="editedItem.datein"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modeldatein = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.refdatein.save(editedItem.datein)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-dialog
                        ref="refclockin"
                        v-model="modelclockin"
                        :return-value.sync="editedItem.clockin"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.clockin"
                            label="Clock Out Time"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modelclockin"
                          v-model="editedItem.clockin"
                          full-width
                          format="24hr"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modelclockin = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.refclockin.save(editedItem.clockin)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="refdateout"
                        v-model="modeldateout"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.dateout"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.dateout"
                            label="Date Out"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>

                        <v-date-picker
                          v-model="editedItem.dateout"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modeldateout = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.refdateout.save(editedItem.dateout)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-dialog
                        ref="refclockout"
                        v-model="modelclockout"
                        :return-value.sync="editedItem.clockout"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.clockout"
                            label="Clock Out Time"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modelclockout"
                          v-model="editedItem.clockout"
                          full-width
                          format="24hr"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modelclockout = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.refclockout.save(editedItem.clockout)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    tomorrow: new Date(
      Date.now() + 86400000 - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    datas: [],
    edited: null,
    modelclockout: false,
    modelclockin: false,
    modeldatein: false,
    modeldateout: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "employeename",
        align: "start",
        sortable: false,
        value: "employeename",
      },
      { text: "projectname", value: "projectname" },
      { text: "datein", value: "datein" },
      { text: "clockin", value: "clockin" },
      { text: "dateout", value: "dateout" },
      { text: "clockout", value: "clockout" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    defaultItem: {
      employeename: "",
      projectname: "",
      datein: "",
      clockin: 0,
      dateout: "",
      clockout: 0,
    },
    editedItem: {
      employeename: "",
      projectname: "",
      datein: "",
      clockin: 0,
      dateout: "",
      clockout: 0,
    },
    // desserts: [],
    editedIndex: -1,
  }),
  methods: {
    getUserData: function () {
      let self = this;
      var date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
      var tomorrow = new Date(
        Date.now() + 86400000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      //console.log(tomorrow);
      let data = {
        date: date,
        tomorrow: tomorrow,
      };
      axios
        .post("/api/supervisorreportlist", data)
        .then((response) => {
          self.datas = response.data;
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
        });
    },
    editItem(item) {
      this.editedIndex = this.datas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.datas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var value = this.datas[this.editedIndex];
      //console.log(value);
      let data = {
        workertimeid: value.workertimeid,
      };
      axios
        .post("/api/deleteworkertime", data)
        .then((response) => {
          if ((response.status = 200)) {
            this.datas.splice(this.editedIndex, 1);
            this.closeDelete();
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
      //
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      var value = this.datas[this.editedIndex];
      console.log(value)
      if (this.editedIndex > -1) {
        let data = {
          workertimeid: value.workertimeid,
          clockin:value.clockin,
          clockout:value.clockout,
          datein:value.datein,
          dateout:value.dateout,
        };
        axios
          .post("/api/updateworkertime", data)
          .then((response) => {
            if ((response.status = 200)) {
              Object.assign(this.datas[this.editedIndex], this.editedItem);
              console.log(response);
            }
          })
          .catch((errors) => {
            console.log(errors);
          });
      } else {
        this.datas.push(this.editedItem);
      }
      this.close();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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