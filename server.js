const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para servir arquivos estáticos
app.use(express.static('.'));

// Middleware para parsing de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para o formulário de contato (simulação)
app.post('/contact', (req, res) => {
    const { name, email, project, message } = req.body;
    
    console.log('📧 Nova mensagem de contato recebida:');
    console.log(`Nome: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Projeto: ${project}`);
    console.log(`Mensagem: ${message}`);
    
    // Aqui você pode integrar com um serviço de email real
    // Por enquanto, apenas retornamos uma resposta de sucesso
    
    res.json({ 
        success: true, 
        message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.' 
    });
});

// Rota para download do CV
app.get('/download-cv', (req, res) => {
    const filePath = path.join(__dirname, 'assets', 'cv.pdf');
    res.download(filePath, 'Fernando_Brigida_CV.pdf', (err) => {
        if (err) {
            console.error('Erro ao fazer download do CV:', err);
            res.status(404).send('CV não encontrado');
        }
    });
});

// Middleware de erro 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📂 Servindo arquivos do diretório: ${__dirname}`);
    console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
});

module.exports = app;
