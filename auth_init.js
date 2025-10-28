// Sistema de Inicialização Automática
function initializeSystem() {
    console.log('🔧 Inicializando sistema...');
    
    // Verificar e criar usuário gerente se não existir
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const gerenteExists = users.some(user => user.username === 'gerente');
    
    if (!gerenteExists) {
        console.log('👑 Criando usuário gerente padrão...');
        
        const defaultManager = {
            username: 'gerente',
            password: 'gerente123',
            email: 'gerente@ligads.com',
            birthdate: '1990-01-01',
            role: 'gerente',
            isActive: true,
            created: new Date().toISOString()
        };
        
        users.push(defaultManager);
        localStorage.setItem('users', JSON.stringify(users));
        
        console.log('✅ Usuário gerente criado com sucesso!');
        console.log('📋 Credenciais:', {
            usuário: 'gerente',
            senha: 'gerente123',
            email: 'gerente@ligads.com'
        });
    } else {
        console.log('✅ Usuário gerente já existe no sistema');
    }
    
    return users;
}

// Função para verificar usuários (debug)
function debugUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('=== 📊 USUÁRIOS DO SISTEMA ===');
    if (users.length === 0) {
        console.log('❌ Nenhum usuário encontrado');
    } else {
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.username} (${user.role}) - ${user.email}`);
        });
    }
    console.log('==============================');
}

// Executar inicialização quando o script carregar
initializeSystem();