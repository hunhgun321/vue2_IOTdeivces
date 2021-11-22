!!!!!!! don't start git first. avoiding errors and troubles

1. create a vue2 project
> (in the desired folder) vue create [project name]

2. choose self-define option (press "space" to select)
- add vuex
- add router
- select vue 2.X
- others keep default

3. cd your working directory and add vuetify
> vue add vuetify
- choose default
3+. add persistent vuex store  
> npm install --save vuex-persistedstate
> npm i vuex-multi-tab-state
> npm i js-cookie
details: https://stackoverflow.com/questions/43027499/vuex-state-on-page-refresh
details: https://vuejsexamples.com/share-and-synchronize-status-between-multiple-tabs-with-this-plugin-for-vuex/


4. modified App.vue, store/index.js and router/index.js as the github
5. add component" LoginForm, OutlineBar "and view " Login, Area, Device "
