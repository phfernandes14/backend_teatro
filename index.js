require('dotenv').config();

const express =  require('express');
const bodyParser = require('body-parser');

const inicializaMongoServer = require('./config/db');
const evento = require('./routes/Eventos');

//Inicializa o MongoDB
inicializaMongoServer();
const app = express();

//Porta
const PORT = process.env.PORT || 4000

//Middleware
app.use((req, res, next)=>{

    res.setHeader('Access-Control-Allow-Origin','*');
    //cabeçalhos
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    //métodos
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();

})

//Parser de JSON
app.use(bodyParser.json());


app.get('/',(req, res)=>{
    res.json({
        mensagem: 'API RODANDO!',
        versao: '1.0.0'
    })
});

//Rotas 
app.use('/evento', evento);

app.listen(PORT, (req, res) => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})