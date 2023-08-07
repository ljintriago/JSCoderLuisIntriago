/* const impuesto = 0.12;

btnCalcular.onclick = () =>{handleClick()};

let cliente = {
    nommbre: '',
    apellido: '',
    edad: 0,
    mail: '',
    nombrePerfil: ''
}

function handleClick(){
    let monto = parseFloat(document.getElementById("monto").value);
    let plazo = parseInt(document.getElementById("plazo").value);
    let btnCalcular = document.getElementById("btnCalcular");

    alert(calcular(monto, plazo, impuesto));
}

function calcular(monto, plazo, impuesto){
    let resultado = 0;
    let imp = 0;
    let impTotal = 0;
    let cuota = 0;
    if (monto===0 || p===0){
        return "No se upede calcular la cuota si esta vacio uno de los parametros";
    }
    else{
        cuota = monto / plazo;

        for(x = 1; x <= plazo; x++){
            
            if (x > 1 && x < plazo) {
                monto = monto - cuota;
            }
           
            imp = monto * impuesto; 

            impTotal = impTotal + imp;
        }
        
        resultado = monto + impTotal;
        return `La cuota a pagar es ${cuota} con impuesto a anual de ${impuesto*100}% y el total es ${resultado}`;
    }
} */
let usrName;
let usrDir;
let usrTel;
let usrProCita;
let petName;
let petAge;
let petRace;

fetch('./json/mascotas.json')
    .then((response) => response.json())
    .then((json) => {setCustomerAndPetInitialInfo(json)});
   

function setCustomerAndPetInitialInfo(obj){
    usrName = document.getElementById("nom-usuario");
    usrDir = document.getElementById("dir");
    usrTel = document.getElementById("tel");
    usrProCita = document.getElementById("pro-cita");

    usrName.innerText = usrName.innerText + " " + obj.nombre
    usrDir.innerText = obj.dir
    usrTel.innerText = obj.tel

    for(i=1; i <=2; i++){
        petName = document.getElementById("nombre"+i);
        petAge = document.getElementById("edad"+i);
        petRace = document.getElementById("raza"+i);

        petName.innerText = petName.innerText + " " + obj.mascotas[i].nombre;
        petAge.innerText = petAge.innerText + " " + obj.mascotas[i].edad + " años";
        petRace.innerText = petRace.innerText + " " + getDogBrand(obj.mascotas[i].raza);
    }
    
    
}


async function getDogBrand(id){
    await fetch('https://api.thedogapi.com/v1/breeds/'+id)
    .then((response) => response.json())
    .then((json) => {
        return json.name
    })
}


/* function setInitialInfo(obj, nombre, apellido, edad, mail){
    obj.nombre = nombre;
    obj.apellido = apellido;
    obj.edad = edad;
    obj.mail = mail;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function setProfileName(obj){
    let profName = [];
    profName.push(obj.nombre[0].substring(0,2));
    profName.push(obj.apellido[0].substring(0,2));
    profName.push(getRandomInt(1000, 10000));

    return profName.toString();
}


setInitialInfo(cliente, "Luis", "Intriago", "27", "any@abcd.com");

cliente.nombrePerfil = setProfileName(cliente); */