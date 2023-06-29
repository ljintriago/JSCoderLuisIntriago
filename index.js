const impuesto = 0.12;

btnCalcular.onclick = () =>{handleClick()};

function handleClick(){
    let monto = parseFloat(document.getElementById("monto").value);
    let plazo = parseInt(document.getElementById("plazo").value);
    let btnCalcular = document.getElementById("btnCalcular");

    alert(calcular(monto, plazo, impuesto));
}

function calcular(m, p, i){
    let resultado = 0;
    let imp = 0;
    let impTotal = 0;
    let cuota = 0;
    if (m===0 || p===0){
        return "No se upede calcular la cuota si esta vacio uno de los parametros";
    }
    else{
        cuota = m / p;

        for(x = 1; x <= p; x++){
            
            if (x > 1 && x < p) {
                m = m - cuota;
            }
           
            imp = m * i; 

            impTotal = impTotal + imp;
        }
        
        resultado = m + impTotal;
        return `La cuota a pagar es ${cuota} con impuesto a anual de ${i*100}% y el total es ${resultado}`;
    }
}