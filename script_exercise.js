document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o EmailJS
    (function(){
        emailjs.init("SEU_USER_ID"); // Substitua com seu User ID do EmailJS
    })();

    // Simula o tipo de usuário
    const userType = sessionStorage.getItem("userType") || "externo";

    // Obtém os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const capacitationName = urlParams.get('capacitation') || 'Introdução à Ciência de Dados';
    const exerciseId = urlParams.get('exerciseId') || '1';

    // Atualiza o título e link de volta
    document.getElementById('exerciseTitle').innerText = `Exercício - 1+1=?`;
    document.getElementById('exerciseName').innerText = `1+1 = ?`;
    document.getElementById('backLink').href = `capacitations.html`;

    // Manipula o envio do formulário
    document.getElementById('exerciseForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o recarregamento da página

        const userAnswer = Number(document.getElementById('userAnswer').value);
        const feedbackContent = document.getElementById('feedbackContent');

        if (userAnswer === 2) {
            // Resposta correta
            feedbackContent.innerText = "Parabéns! Você acertou a resposta.";
            feedbackContent.style.color = "green";

            // Marca o exercício como concluído no localStorage
            const key = capacitationName + '_exercise_' + exerciseId;
            localStorage.setItem(key, 'completed');
        } else {
            // Resposta incorreta
            feedbackContent.innerText = "Resposta incorreta. Tente novamente.";
            feedbackContent.style.color = "red";

            // Remove a marcação de concluído caso exista
            const key = capacitationName + '_exercise_' + exerciseId;
            localStorage.removeItem(key);
        }
    });

    // Funções do Chat Pop-up
    const openChatBtn = document.getElementById('openChatBtn');
    const chatForm = document.getElementById('chatForm');
    const closeChatBtn = document.getElementById('closeChatBtn');

    openChatBtn.addEventListener('click', function() {
        chatForm.style.display = 'block';
        openChatBtn.style.display = 'none';
    });

    closeChatBtn.addEventListener('click', function() {
        chatForm.style.display = 'none';
        openChatBtn.style.display = 'block';
    });

    // Manipula o envio do formulário do chat
    document.getElementById('chatMessageForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;
        const message = document.getElementById('message').value;

        // Envia o email usando o EmailJS
        emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', {
            from_name: userName,
            from_email: userEmail,
            message: message
        })
        .then(function(response) {
            alert('Mensagem enviada com sucesso!');
            // Limpa o formulário
            document.getElementById('chatMessageForm').reset();
            chatForm.style.display = 'none';
            openChatBtn.style.display = 'block';
        }, function(error) {
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
        });
    });
});
