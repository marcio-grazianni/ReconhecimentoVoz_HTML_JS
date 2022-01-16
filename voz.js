'use strict';

(function () {
    let btnBuscar = document.querySelector('#btnBuscar');
    let divResultado = document.querySelector('#divResultado');

    if (window.SpeechRecognition || window.webkitSpeechRecognition)
    {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let reconhecimento = new SpeechRecognition();
        reconhecimento.lang = 'pt-BR';

        btnBuscar.addEventListener('click', function ()
        {
            try
            {
                reconhecimento.start();
                divResultado.innerHTML = 'Estou ouvindo...';
            }
            catch (erro)
            {
                alert('Erro: ' + erro.message);
            }
        }, false);

        reconhecimento.addEventListener('result', function (evt)
        {
            let resultado = evt.results[0][0].transcript;
            resultado = resultado.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            resultado = resultado.toUpperCase();
            divResultado.innerHTML = resultado;
        }, false);

        reconhecimento.addEventListener('error', function (evt)
        {
            console.log('10');
            divResultado.innerHTML = 'Comando não reconhecido.';
        }, false);
    }
    else
    {
        console.log('11');
        divResultado.innerHTML = 'Seu navegador não suporta tanta tecnologia!';
    }
})();
