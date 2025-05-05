import http from 'http';
import url, {URLSearchParams} from 'url';

const host = 'localhost';
const porta = 4000;

function responderRequisicao(requisicao, resposta){

    if (requisicao.method === "GET"){
        const dados = new URLSearchParams(url.parse(requisicao.url).query);
        const idade = dados.get('idade');
        const sexo = dados.get('sexo');
        const sal_base = dados.get('sal_base');
        const ano = dados.get('ano');
        const matricula = dados.get('matricula');

        const ano_atual = new Date().getFullYear();
        const tempo_servico = ano_atual - parseInt(ano);
        const idade_num = parseInt(idade);
        const salario = parseFloat(sal_base);
        let reajuste = 0;
        let ajustefinal = 0;
        let sal_reajustado = 0;

        resposta.setHeader('Content-Type', 'text/html');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8">');
        resposta.write('<title>Reajuste de salário</title>');
        resposta.write('<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">');
        resposta.write('<style>body { font-family: "Montserrat", sans-serif; }</style>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<h1>Cálculo de reajuste de salário</h1>');
        resposta.write('<p>Olá, funcionário! Seja bem-vindo à calculadora de reajuste de salários.</p>');
        resposta.write('<p>Por favor, informe na URL seus dados da seguinte maneira:</p>');
        resposta.write('<p>http://localhost:3000/?<strong>idade</strong>=18&<strong>sexo</strong>=F&<strong>sal_base</strong>=1700&<strong>ano</strong>=2014&<strong>matricula</strong>=12345...</p>');

        //verificando os dados
        if(
        Number(idade) > 16 &&
        !isNaN(parseFloat(sal_base)) &&
        Number.isInteger(Number(ano)) && Number(ano) > 1960 &&
        Number.isInteger(Number(matricula)) && Number(matricula) > 0
        ) {
        //calculando o reajuste
                if(idade_num >= 18 && idade_num <= 39)
                {
                    if(sexo === 'M')
                    {
                        reajuste = salario*0.10;
                        ajustefinal = tempo_servico > 10 ? 17 : -10;

                    } else if(sexo === 'F')
                    {
                        reajuste = salario*0.08;
                        ajustefinal = tempo_servico > 10 ? 16 : -11;
                    }

                } 
                
                else if(idade_num >= 40 && idade_num <= 69)
                {
                    if(sexo === 'M')
                        {
                            reajuste = salario*0.08;
                            ajustefinal = tempo_servico > 10 ? 15 : -5;
    
                        } else if(sexo === 'F')
                        {
                            reajuste = salario*0.10;
                            ajustefinal = tempo_servico > 10 ? 14 : -17;
                        }

                } 
                
                else if(idade_num >= 70 && idade_num <= 99)
                {
                    if(sexo === 'M')
                        {
                            reajuste = salario*0.15;
                            ajustefinal = tempo_servico > 10 ? 13 : -15;
        
                        } else if(sexo === 'F')
                        {
                            reajuste = salario*0.17;
                            ajustefinal = tempo_servico > 10 ? 12 : -17;
                        }
                }

            sal_reajustado = salario + reajuste + ajustefinal;

            resposta.write("Funcionário da matrícula <strong>" + matricula + "</strong><br>");
            resposta.write("<strong>Idade:</strong> " + idade + "<br>");
            resposta.write("<strong>Sexo:</strong> " + sexo + "<br>");
            resposta.write("<strong>Ano de contratação:</strong> " + ano + "<br>");
            resposta.write("<strong>Salário base:</strong> R$" + sal_base + "<br>");
            resposta.write("<strong>Salário reajustado: R$" + sal_reajustado + "</strong><br>");

        } else {
        //caso os dados forem inválidos
            resposta.write("<p>Dados inválidos. Verifique as informações e tente novamente.</p>");
        };

        resposta.write('</body>');
        resposta.write('</html>');
        resposta.end();
    }
};

const servidor = http.createServer(responderRequisicao);

servidor.listen(porta, host, () => {
    console.log('Servidor escutando em http://' + host + ":" + porta);
});

