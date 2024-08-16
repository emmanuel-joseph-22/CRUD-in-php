const { createApp } = Vue
          
createApp({
  data() {
    return {
        showAlertSuccess: false,
        showAlertError: false,
        userList: [],
        addNewUser: { name: "",
                      email: "",
                      phone: "" },
        selectedUser: { name: "",
                        email: "",
                        phone: "" },
        errorMesssage: "",
        successMessage: "",
    }
  },
  mounted(){
    this.readUsers();
  },
  watch: {
    successMessage(newVal){
      if(newVal){
        this.readUsers();
      }
    }
  },
  methods: {
    convertToFormData(data){
      let fd = new FormData();
      for(value in data){
        fd.append(value, data[value]);
      }
      return fd;
    },
    chooseUser(userData){
      this.selectedUser = Object.assign({}, userData); 
    },
    createNewUser(){
      this.errorMesssage = "";
      this.successMessage = "";
      let formData = this.convertToFormData(this.addNewUser);

      axios.post("http://localhost/simple_crud/users.php?action=create", formData)
      .then((response) => {
        if(response.data.error){
          this.errorMesssage = response.data.message;
        } else {
          this.successMessage = response.data.message;
        }
        this.addNewUser = { name: "",
                            email: "",
                            phone: "" };
      })
    },
    readUsers(){
      axios.get("http://localhost/simple_crud/users.php?action=read")
      .then((response) => {
        this.userList = response.data.users;
      })
      .catch(error => {
        console.error("There was an error fetching the user data:", error);
      });
    },
    updateUser(){
      this.errorMesssage = "";
      this.successMessage = "";

      let formData = this.convertToFormData(this.selectedUser);

      axios.post("http://localhost/simple_crud/users.php?action=update", formData)
      .then((response) => {
        if(response.data.error){
          this.errorMesssage = response.data.message;
        } 
        else {
          this.successMessage = response.data.message;                    
        }
        this.selectedUser = { name: "",
                              email: "",
                              phone: "" };
      });
    },
    deleteUser(){
      this.errorMesssage = "";
      this.successMessage = "";
      let formData = this.convertToFormData(this.selectedUser);

      axios.post("http://localhost/simple_crud/users.php?action=delete", formData)
      .then((response) => {
        if(response.data.error){
          this.errorMesssage = response.data.message;
        } 
        else {
          this.successMessage = response.data.message;

        }
        this.selectedUser = { name: "",
          email: "",
          phone: "" };
      })
    }
  }
}).mount('#app')