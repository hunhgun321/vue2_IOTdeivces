<template>
<div id="login_wrapper">
    <div id="login">
        <h2>Log in to your account</h2>
        <LoginForm />
    </div>
</div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

  export default {
    name: 'Login',

    components: {
      LoginForm
    },
  }
</script>

<style scoped>
#login{
    max-width: 50%;
    border-radius: 25px;
    border: 2px solid lightblue;
    padding: 1rem;
    text-align: center;
    margin: auto;
    
    
}
#login_wrapper{
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
}
</style>