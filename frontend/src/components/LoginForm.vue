<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <h5 v-if="wrong_user" :style="{'color':'red'}">Incorrect username or password</h5>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="pw"
      :counter="50"
      :rules="pwRules"
      label="Password"
      required
    >
    </v-text-field>

    <!--
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[(v) => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select>
    -->

    <!-- rules defined the validation rule. it is a list that the form will check one by one and -->
    <v-checkbox
      v-model="remember"
      :rules="[]"
      label="Remember me"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
      Login
    </v-btn>

    <!--
    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    -->
    <v-btn color="warning" > Forget Password </v-btn>
    
  </v-form>
</template>

<script>
import Cookies from 'js-cookie'


export default {
  name: "HelloWorld",

  data: () => ({
    wrong_user: false,
    valid: true,
    pw: "",
    pwRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 50) || "Password must be less than 50 characters",
      (v) => {
        if (/[^a-zA-Z0-9 _]/g.test(v)) {
          return "No special characters are allowed";
        } else {
          return true;
        }
      },
    ],
    name: "",
    nameRules: [
      // 'v' define the input value of the input field
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      (v) => {
        if (/[^a-zA-Z0-9 _]/g.test(v)) {
          return "No special characters are allowed";
        } else {
          return true;
        }
      },
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      (v) => {
        // a demo of how to use 'rule' and return error msg
        if (v.includes("Hello")) {
          return "No hello in email";
        } else {
          return true; // indicate that the validation is fine
        }
      },
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    remember: false,
  }),

  methods: {
    testing_used(body){
        if(body.name == 'admin' && body.password == 'admin'){
            console.warn('it is admin')
        }else if(body.name == 'superadmin' && body.password == 'superadmin'){
            console.warn('it is superadmin')
        }else if(body.name == 'operator' && body.password == 'operator'){
            console.warn('it is operator')
            this.$store.dispatch("assign_user",{...body,role: 'operator'})
            Cookies.set()
            this.$router.push({ path: '/operator/area'}).catch(err=>console.warn(err))
        }else{
            this.wrong_user = true
        }
    },
    submit(){
        let body = {}
        body.name = this.name
        body.password = this.pw
        body.remember = this.remember
        console.log(`%c body is \n${JSON.stringify(body)}`,'color: lightblue')
        this.testing_used(body)
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
