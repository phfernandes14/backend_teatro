const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();

const Evento = require('../model/Evento');


//LISTAR TODOS
router.get("/", async(req, res) => {
    try{
        const eventos = await Evento.find().sort({nome:1})
        res.json(eventos)
    } catch (e){
        res.send({error: `Erro ao obter os dados dos eventos: ${e.message}`})
    }
});

//LISTAR ID
router.get("/:id", async(req, res) => {
    await Evento.findById(req.params.id)
    .then(evento => {
        res.send(evento)
    }).catch(err => {
        return res.status(400).send({
            message: `Erro ao obter o evento com o id ${req.params.id}`
        })
    })
})

//CRIAR
router.post('/', 
[
    check('nome', 'Informe o nome do evento, o campo deve ter de 5 a 10 carateres').not().isEmpty().isLength({min:5, max:10}),
    check('descricao','Informe a descrição do evento, o campo deve ter de 10 a 50 caracteres').not().isEmpty().isLength({min:10, max:50}),
    check('data', 'Informe a data do evento, no formato xxxx-xx-xx').not().isEmpty().isDate(),
    check('valor', 'Informe o valor do evento, o valor minímo é 0').not().isEmpty().isFloat().isLength({min:0}),
    check('vagas', 'Informe a quantidade de vagas evento, o valor minímo é 0').not().isEmpty().isNumeric().isLength({min:0}),
    
],
async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {nome,descricao,data,valor,vagas} = req.body;
    try{
        let evento = new Evento({nome,descricao,data,valor,vagas})
        await evento.save();
        return res.json({'mensagem':'Evento foi cadastrado com sucesso'});
    }catch(err){
        return res.json({'mensagem':'erro'})
    }
});

//DELETAR
router.delete("/:id", async(req, res) => {
    await Evento.findByIdAndRemove(req.params.id)
    .then(evento => {
        res.send({message: 'Evento foi removido com sucesso!'})
    }).catch( err => {
        return res.status(400).send({
        message: `Não foi possível remover o evento com o id ${req.params.id}`
    })
  })
});

//UPDATE
router.put('/', 
[
    check('nome', 'Informe o nome do evento, o campo deve ter de 5 a 10 carateres').not().isEmpty().isLength({min:5, max:10}),
    check('descricao','Informe a descrição do evento, o campo deve ter de 10 a 50 caracteres').not().isEmpty().isLength({min:10, max:50}),
    check('data', 'Informe a data do evento, no formato xxxx-xx-xx').not().isEmpty().isDate(),
    check('valor', 'Informe o valor do evento, o valor minímo é 0').not().isEmpty().isFloat().isLength({min:0}),
    check('vagas', 'Informe a quantidade de vagas evento, o valor minímo é 0').not().isEmpty().isNumeric().isLength({min:0}),
    
],
async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Evento.findByIdAndUpdate(req.body._id, {
        $set: dados
    },{new: true},
        function(err, result){
            if(err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
    })


module.exports = router