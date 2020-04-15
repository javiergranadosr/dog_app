let url = "core/Crud.php";
// Componente menu
Vue.component('header-nav',{
  template: //html 
  `
  <nav class="navbar navbar-dark bg-primary">    
    <div class="container">
      <a class="navbar-brand" href="#">
        <i class="fas fa-dog fa-3x"></i>
          Dog App
        </a>
    </div>
  </nav>
  `
})

// Componente Formulario de registro de mascotas y lista de mascotas
Vue.component('content-main',{
  template: //html 
  `
  <div class="row">

    <div class="col-md-6">
    <h1 class="mt-5 mb-3">{{titleForm}}</h1>
        <form id="formData" class="card p-2">
          <input type="text" class="form-control mb-2" id="name" placeholder = "Nombre">
          <input type="text" class="form-control mb-2"  id="breed" placeholder="Raza">
          <input type="text" class="form-control mb-2"   id="gender"  placeholder ="Género">
          <input type="text" class="form-control mb-2"  id="color" placeholder ="Color">
          <input type="number" class="form-control mb-2"  id ="age" placeholder = "Edad">
          <button type="button" @click ="btnRegister()" class ="mt-3 btn btn-success btn-sm"><i class="fas fa-plus"></i></button>

      </form>
    </div>

    <div class="col-md-6 ">
      <h1 class="mt-5 mb-3">{{titleList}}</h1>
      <div class="scroll">
      <div class="list-card" v-for="dog of dogs">
      <span >{{dog.name}}</span>
      <div class="actions">
        <button class="btn btn-primary btn-sm"  @click="btnUpdate(dog.id, dog.name, dog.breed, dog.gender, dog.color, dog.age)"><i class="fas fa-eye"></i></button>
        <button class ="btn btn-danger btn-sm" @click="btnDelete(dog.id)"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>  
      </div>
    </div>

  </div>
  `,
  data() {
    return {
      titleForm: "Agregar una mascota",
      titleList: "Sus mascotas",
      dogs:[],
      name:"",
      breed:"",
      gender: "",
      color: "",
      age: 0
    }
  },
  methods: {
    btnRegister:async function(){                    
   
      this.name = document.getElementById('name').value;
      this.breed = document.getElementById('breed').value;
      this.gender = document.getElementById('gender').value;  
      this.color = document.getElementById('color').value;
      this.age = document.getElementById('age').value;                     
                 
      if(this.name == "" || this.breed == "" || this.gender == "" || this.color =="" || this.age == 0){
        Swal.fire({
            icon: 'error',
            confirmButtonText: "Reintentar",
            confirmButtonColor: "#3085d6",
            title: 'Oops...',
            text: 'No puede dejar campos vacíos !',
                                              
        }) 
      }else{  
              
        this.registerDog(); 

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Su mascota ha sido agregada con éxito ',
            showConfirmButton: false,
            timer: 3000
          })
                    
      }
    }, 

  btnUpdate:function(id,name,breed,gender,color,age){        
    Swal.fire({
      title: 'Editar mascota',  
      html:
      `
      <div class="row">
      
          <input type="text" id="nameU" value = "${name}" class="form-control mb-2">
          <input type="text" id="breedU" value= "${breed}" class="form-control mb-2">
          <input type="text" id="genderU" value= "${gender}" class="form-control mb-2">
          <input type="text" id="colorU" value="${color}" class="form-control mb-2">
          <input type="number" id = "ageU" value="${age}" class="form-control mb-2">
        
      </div>

    `,       
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#D33',
      confirmButtonText: 'Actualizar'
    }).then((result) => {
      if (result.value) {   

        name = document.getElementById('nameU').value;
        breed = document.getElementById('breedU').value;
        gender = document.getElementById('genderU').value;  
        color = document.getElementById('colorU').value;
        age = document.getElementById('ageU').value; 
        
        this.updateDog(id,name,breed,gender,color,age);       
        
        Swal.fire(
          '¡Mascota actualizada!',
          'Su mascota ha sido actualizada con éxito...',
          'success'
        )
      }

    })                
  },
    
    btnDelete:function(id){        
      Swal.fire({
        title: '¿Está seguro de borrar su mascota?',         
        showCancelButton: true,
        confirmButtonColor:'#d33',
        cancelButtonColor:'#3085d6',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.value) {            
          this.deleteDog(id);             
          Swal.fire(
            '¡Eliminado!',
            'Su mascota ha sido eliminada con éxito...',
            'success'
          )
        }
      })                
    },    
    
    // CRUD     
    listDogs:function(){
      axios.post(url,{option:4}).then(response =>{
        this.dogs = response.data;       
      });
    },  
    
    registerDog:function(){
        
        axios.post(url, {option:1, name:this.name, breed:this.breed,gender:this.gender, color:this.color,age:this.age}).then(response =>{
            this.listDogs();
        });  
        document.getElementById("formData").reset();       
    },

    updateDog:function(id,name,breed,gender,color,age){       
      axios.post(url, {option:2, id:id, name:name, breed:breed, gender:gender,color:color,age:age }).then(response =>{           
          this.listDogs();           
       });                              
    },

    deleteDog:function(id){
      axios.post(url, {option:3, id:id}).then(response =>{           
        this.listDogs();
      });
    }  

  },
  created() {
    this.listDogs();
  },
})