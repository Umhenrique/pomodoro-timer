let horas_gasto = document.getElementById('horas_gasto');
let minutos_gasto = document.getElementById('minutos_gasto');
let segundos_gasto = document.getElementById('segundos_gasto');
let minutos_ganho = document.getElementById('minutos_ganho');
let segundos_ganho = document.getElementById('segundos_ganho');
var ativador = document.getElementById('ativador');
var audio = new Audio("assets/sound_effect/beep.wav");
/*
Declaracao de variaveis para o controle de tempo
*/
let minutos_gasto_value = 00;
let minutos_ganho_value = 00;
let segundos_gasto_value = 00;
let segundos_ganho_value = 00;
let horas_gasto_value = 00;
let horas_ganho_value = 00;
var segundos_gasto_interval;
var segundos_ganho_interval;
var controlador = 0;


/*  Funcao para ativar o cronometro e desativar o cronometro */
function ativar() {
    if (controlador == false) {
        clearInterval(segundos_ganho_interval);
        onclick = momentoDeAcao();
        ativador.textContent = "PARAR";
        document.body.style.backgroundImage = "linear-gradient(160deg, #8849c5 , #8bf95b)";
        controlador = true;
    }
    else {
        onclick = MomentoDePausa();
        document.body.style.backgroundImage = "linear-gradient(160deg, #e32120 , #ffd966)";
        controlador = false;
    }
}

/* Funcao para iniciar as atividades do sistema */
function momentoDeAcao() {

    segundos_gasto_interval = setInterval(segundos_gastoTimer, 1000)

    segundos_gasto_value = 0
    minutos_gasto_value = 0
    horas_gasto_value = 0
    /* Funcao para controlar o tempo gasto */
    function segundos_gastoTimer() {
        segundos_gasto_value++;
        segundos_ganho_value += !(segundos_gasto_value % 5);
        minutos_ganho_value += (segundos_ganho_value == 60);
        minutos_gasto_value += (segundos_gasto_value == 60);
        horas_ganho_value += (minutos_ganho_value == 60);
        horas_gasto_value += (minutos_gasto_value == 60);
        document.getElementById('segundos_gasto').innerHTML = segundos_gasto_value.toString().padStart(2, '0');
        document.getElementById('segundos_ganho').innerHTML = segundos_ganho_value.toString().padStart(2, '0');
        document.getElementById('minutos_ganho').innerHTML = minutos_ganho_value.toString().padStart(2, '0');
        document.getElementById('minutos_gasto').innerHTML = minutos_gasto_value.toString().padStart(2, '0');
        document.getElementById('horas_gasto').innerHTML = horas_gasto_value.toString().padStart(2, '0');
        document.getElementById('horas_ganho').innerHTML = horas_ganho_value.toString().padStart(2, '0');

        if (segundos_ganho_value == 60) {
            segundos_ganho_value = 0;
            if (minutos_ganho_value == 60) {
                minutos_ganho_value = 0;
            }
        }
        if (segundos_gasto_value == 60) {
            segundos_gasto_value = 0;
            if (minutos_gasto_value == 60) {
                minutos_gasto_value = 0;
            }
        }
    }
}

/* Funcao para pausar o cronometro */
function MomentoDePausa() {
    clearInterval(segundos_gasto_interval);

    ativador.textContent = "ATIVAR";

    segundos_ganho_interval = setInterval(segundos_ganhoTimer, 1000)

    function segundos_ganhoTimer() {
    
        document.getElementById('horas_ganho').innerHTML = horas_ganho_value.toString().padStart(2, '0');
        document.getElementById('minutos_ganho').innerHTML = minutos_ganho_value.toString().padStart(2, '0');
        document.getElementById('segundos_ganho').innerHTML = segundos_ganho_value.toString().padStart(2, '0');
        if (segundos_ganho_value > 0) {
            segundos_ganho_value--;
        }
        if (segundos_ganho_value <= 0) {
            if (minutos_ganho_value > 0) {
                minutos_ganho_value--;
                segundos_ganho_value = 59;
            }
            if (minutos_ganho_value <= 0) {
                if (horas_ganho_value > 0) {
                    horas_ganho_value--;
                    minutos_ganho_value = 59;
                }
                if (horas_ganho_value <= 0) {
                    if(segundos_ganho_value == 0){
                    clearInterval(segundos_ganho_interval)
                    segundos_ganho_value = 0;
                    audio.play();
                    document.getElementById('horas_ganho').innerHTML = horas_ganho_value.toString().padStart(2, '0');
                    document.getElementById('minutos_ganho').innerHTML = minutos_ganho_value.toString().padStart(2, '0');
                    document.getElementById('segundos_ganho').innerHTML = segundos_ganho_value.toString().padStart(2, '0');
                }
                }
            }
        }
    }

}

