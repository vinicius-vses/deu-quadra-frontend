/* eslint-disable prettier/prettier */
import express = require('express');
import nodemailer = require('nodemailer');
const app = express();

const port = 3000;

const user = "deuquadra@gmail.com"
const pass = "3qu1pe6-Proj"

app.get('/', (req, res) => res.send('Hello World'));

app.post('/send', (req, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: { user, pass }
    })

    transporter.sendMail({
        from: user,
        to: user,
        replyTo: "deuquadra@gmail.com",
        subject: "Reserva realizada com sucesso!",
        text: "Funcionou!",
    }).then(info => {
        res.send('E-mail enviado com sucesso!');
    }).catch(error => {
        res.status(500).send('Erro ao enviar e-mail: ' + error.message);
    })
})

app.listen(port, () => console.log(`Running on port ${port}!`));
