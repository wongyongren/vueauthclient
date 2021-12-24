<template>
  <v-row align="center">
    <v-col cols="12" sm="6">
      <v-card-title v-text="'Select Date & Time'"></v-card-title>
    </v-col>

    <v-col cols="12" sm="3" md="3">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>

        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" sm="3" md="3">
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Picker in dialog"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-if="modal" v-model="time" full-width format="24hr">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(time)">
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card-title v-text="'Display Selected Date & Time'"></v-card-title>
    </v-col>
    <v-col cols="12" sm="6"> {{ date }} - {{ time }} </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    time: null,
  }),
};
</script>

<style>
.date-color {
  color: #00b300;
  font-weight: 900;
}

.v-btn--active .date-color {
  color: #fff;
}
</style>