let DateTime = luxon.DateTime;
let Interval = luxon.Interval;

let usrName;
let usrDir;
let usrTel;
let usrProCita;
let petName;
let petAge;
let petRace;
let infolink = document.getElementById("linkInfo");
let infolink2 = document.getElementById("linkInfo2");
let btndog1 = document.getElementById("btn-dog-1");
let btndog2 = document.getElementById("btn-dog-2");
   

infolink.onclick = () =>{handleInfo()};
infolink2.onclick = () =>{handleInfo()};

btndog1.onclick = () =>{setNextAppointment()}
btndog2.onclick = () =>{setNextAppointment2()}

fetch('./json/mascotas.json')
    .then((response) => response.json())
    .then((json) => {setCustomerAndPetInitialInfo(json)});
   

async function setCustomerAndPetInitialInfo(obj){
    let customer;
    let proxcita;
    
    if(localStorage.getItem('client') === undefined){
        localStorage.setItem('client', obj)
        customer = localStorage.getItem('client')
    }
    else{
        customer = localStorage.getItem('client')
    }

    usrName = document.getElementById("nom-usuario");
    usrDir = document.getElementById("dir");
    usrTel = document.getElementById("tel");
    usrProCita = document.getElementById("prox-cita");

    usrName.innerText = usrName.innerText + " " + obj.nombre
    usrDir.innerText = obj.dir
    usrTel.innerText = obj.tel
    

    for(i=1; i <=2; i++){
        petName = document.getElementById("nombre"+i);
        petAge = document.getElementById("edad"+i);
        petRace = document.getElementById("raza"+i);

        petName.innerText = petName.innerText + " " + obj.mascotas[i].nombre;
        petAge.innerText = petAge.innerText + " " + obj.mascotas[i].edad + " años";
        let race = await getDogBrand(obj.mascotas[i].raza);
        petRace.innerText = petRace.innerText + " " + race.name;

        if(typeof obj.mascotas[i+1] === "undefined" && proxcita === null){
            proxcita = obj.mascotas[i].proximaCita
        }
        else{
            let currenDate = DateTime.now();
            let d1 = DateTime.local(obj.mascotas[i].proximaCita.substring(4),obj.mascotas[i].proximaCita.substring(2,4),obj.mascotas[i].proximaCita.substring(0,2));
            let i1 = Interval.fromDateTimes(currenDate, d1);

            let d2 = DateTime.local(obj.mascotas[2].proximaCita.substring(4),obj.mascotas[2].proximaCita.substring(2,4),obj.mascotas[2].proximaCita.substring(0,2));
            let i2 = Interval.fromDateTimes(currenDate, d2);

            if(i1===i2){
                proxcita = obj.mascotas[i].proximaCita
            }
            else if(i1<i2){
                proxcita = obj.mascotas[i].proximaCita
            }
            else{
                proxcita = obj.mascotas[2].proximaCita
            }

        }
        
    }
    
    if (proxcita !== null){
        usrProCita.innerText = usrProCita.innerText + " " + DateTime.local(parseInt(proxcita.substring(4)), parseInt(proxcita.substring(2,4)), parseInt(proxcita.substring(0,2))).toString();
    }
    
}


async function getDogBrand(id){
   try{
    const response = await fetch('https://api.thedogapi.com/v1/breeds/'+id);
    const data = await response.json();
    return data
   }catch{
    console.log("Error")
   }

}


async function handleInfo(){
    let race = await getDogBrand(193);
    let resultText = `Peso normal: ${race.weight.metric} Kg \nAltura normal: ${race.height.metric} cm \nTemperamento: ${race.temperament} \nGrupo de raza: ${race.breed_group} \nEsperanza de vida: ${race.life_span}`;

    Swal.fire({
        title: 'Información',
        text: resultText,
        icon: 'info',
        confirmButtonText: 'Cool'
      });
}


function setNextAppointment(){
    Swal.fire({
        title: 'Entrarla fecha en el formato DDMMYYYY',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: (date) => {
          try{
            let customer = localStorage.getItem('client');
            customer.mascotas[1].proximaCita = date;
            localStorage.setItem('client', customer);
            console.log(customer)
          } 
        catch{
              Swal.showValidationMessage(
                `Fallo al agendar`
              )
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Agendado`
          })
        }
      })
}

function setNextAppointment2(){
    Swal.fire({
        title: 'Entrarla fecha en el formato DDMMYYYY',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: (date) => {
          try{
            let customer = localStorage.getItem('client');
            customer.mascotas[2].proximaCita = date;
            localStorage.setItem('client', customer);
            console.log(customer)
          } 
        catch{
              Swal.showValidationMessage(
                `Fallo al agendar`
              )
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Agendado`
          })
        }
      })
}
