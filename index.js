let monto = 0;
let plazo = 0;
const impuesto = 0.12;

monto = 

function handleClick(){
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
        cuota = m / (p * 12);

        for(x = 1; x <= p; x++){
            
            if (x > 1 && x < p) {
                m = m - (cuota * 12);
            }
           
            imp = m * i; 

            impTotal = impTotal + imp;
        }
        
        resultado = m + imp;
        return `La cuota a pagar es ${cuota} con impuesto a anual de ${i*100}% y el total es ${resultado}`;
    }
}