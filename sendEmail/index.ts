/* eslint-disable prettier/prettier */
import emailjs from 'emailjs-com';

emailjs.init('c592TLP8lDQaVxlXJ');

// Função para obter o email do usuário logado 
async function getUserEmail(): Promise<string> {
  try {
      const response = await fetch('/api/user', { //fetch no Banco de Dados
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      });
      if (!response.ok) {
          throw new Error('Erro ao obter os dados do usuário.');
      }
      const data = await response.json();
      return data.email;
  } catch (error) {
      console.error('Erro ao obter o email do usuário:', error);
      throw new Error('Erro ao obter o email do usuário.');
  }
  
}

document.getElementById('send-email-btn')?.addEventListener('click', async function () {
  try {
    const userEmail = await getUserEmail();
    const templateParams = {
      to_email: userEmail,
    };

    const response = await emailjs.send(
      'service_1endzqj',
      'template_k3c0foc',
      templateParams
    );
    console.log('Email enviado com sucesso!', response.status, response.text);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
});
