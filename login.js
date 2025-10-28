let isLogin = true;

// Alterna entre Login e Cadastro
function toggleForm() {
    isLogin = !isLogin;
    document.getElementById("formTitle").innerText = isLogin ? "Login" : "Cadastro";
    document.getElementById("authButton").innerText = isLogin ? "Entrar" : "Cadastrar";
    document.getElementById("toggleText").innerHTML = isLogin
        ? 'Não tem uma conta? <a href="#" onclick="toggleForm()">Cadastre-se aqui</a>'
        : 'Já tem uma conta? <a href="#" onclick="toggleForm()">Faça login</a>';

    // Exibir ou ocultar campos extras de cadastro
    const registerFields = document.querySelectorAll(".register-only");
    registerFields.forEach(field => {
        field.style.display = isLogin ? "none" : "block";
    });
}

// Função de Autenticação
function handleAuth() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const accessMessage = document.getElementById("accessMessage");

    // Verificação simples de preenchimento
    if (username === "" || password === "" || (!isLogin && (email === "" || birthdate === "" || confirmPassword === ""))) {
        accessMessage.innerText = "Por favor, preencha todos os campos.";
        return;
    }

    // Verificação de senha no cadastro
    if (!isLogin && password !== confirmPassword) {
        accessMessage.innerText = "As senhas não coincidem. Por favor, verifique.";
        return;
    }

    if (isLogin) {
        // Processo de login
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password && u.isActive);
        
        if (user) {
            // Armazena informações do usuário logado
            sessionStorage.setItem("currentUser", JSON.stringify({
                username: user.username,
                role: user.role
            }));
            
            // Redireciona para o dashboard
            window.location.href = "dashboard.html";
        } else {
            accessMessage.innerText = "Usuário ou senha incorretos.";
        }
    } else {
        // Processo de cadastro
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verifica se o usuário já existe
        if (users.find(u => u.username === username)) {
            accessMessage.innerText = "Este nome de usuário já está em uso.";
            return;
        }
        
        // Por padrão, novos usuários são externos
        const newUser = {
            username,
            password,
            email,
            birthdate,
            role: 'externo',
            isActive: true,
            created: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        accessMessage.innerText = "Cadastro realizado com sucesso! Faça login para continuar.";
        toggleForm();
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    toggleForm(); // Inicializa no modo login
});