const form = document.getElementById('cnpjForm');
const resultDiv = document.querySelector('.resultado');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio do formulário

    const cnpj = document.getElementById('cnpj').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cnpj.length !== 14) {
        resultDiv.innerHTML = '<p style="color: red;">CNPJ deve ter 14 dígitos.</p>';
        return;
    }

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        
        if (!response.ok) {
            throw new Error('CNPJ não encontrado');
        }
        
        const data = await response.json();
        resultDiv.innerHTML = `
            <h2>Resultados:</h2>
            <p><strong>Nome Empresarial:</strong> ${data.razao_social}</p>
            <p><strong>Nome Fantasia:</strong> ${data.nome_fantasia}</p>
            <p><strong>Data de Abertura:</strong> ${data.data_inicio_atividade}</p>
            <p><strong>Situação Cadastral:</strong> ${data.descricao_situacao_cadastral}</p>
            <p><strong>Endereço:</strong> ${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.cidade} - ${data.uf}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});
