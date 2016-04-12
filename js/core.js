$(function(){

    function load() {
        $.getJSON("http://developers.agenciaideias.com.br/cotacoes/json", function(data){
            var valor = data.dolar.cotacao;
            valor = parseFloat(valor).toFixed(2);
            valor = valor.replace(".", ",");

            $(".dolar").text("R$ " + valor);
        });
    }

    load();
    setInterval(function(){ load(); }, 1000);

});
