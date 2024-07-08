document.addEventListener('DOMContentLoaded', function() {
    const mensagemInput = document.getElementById('mensagem');
    const resultado = document.getElementById('resultado');
    const botaoCriptografar = document.getElementById('criptografar');
    const botaoDescriptografar = document.getElementById('descriptografar');
    const botaoCopiar = document.getElementById('copiar');
    const imagemDecoracao = document.getElementById('imagem_decoracao');
    const mensagemNenhuma = document.getElementById('mensagem_nenhuma');
    const botaoReset = document.getElementById('reset');

    const chaveCriptografia = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    function criptografarMensagem() {
        let mensagemOriginal = mensagemInput.value.toLowerCase().trim();
        let mensagemCriptografada = '';

        for (let letra of mensagemOriginal) {
            if (chaveCriptografia[letra]) {
                mensagemCriptografada += chaveCriptografia[letra];
            } else {
                mensagemCriptografada += letra;
            }
        }

        if (mensagemCriptografada !== mensagemOriginal) {
            resultado.value = mensagemCriptografada;
            exibirResultado();
        } else {
            ocultarResultado();
        }
    }

    function descriptografarMensagem() {
        let mensagemCriptografada = mensagemInput.value.toLowerCase().trim();
        let mensagemDescriptografada = mensagemCriptografada;

        for (let chave in chaveCriptografia) {
            if (chaveCriptografia.hasOwnProperty(chave)) {
                let expressaoRegular = new RegExp(chaveCriptografia[chave], 'g');
                mensagemDescriptografada = mensagemDescriptografada.replace(expressaoRegular, chave);
            }
        }

        if (mensagemDescriptografada !== mensagemCriptografada) {
            resultado.value = mensagemDescriptografada;
            exibirResultado();
        } else {
            ocultarResultado();
        }
    }

    function copiarTexto() {
        if (resultado.value) {
            resultado.select();
            document.execCommand('copy');
            exibirMensagemCopiado();
        }
    }

    function exibirResultado() {
        resultado.style.display = 'block';
        botaoCopiar.style.display = 'block';
        imagemDecoracao.style.display = 'none';
        mensagemNenhuma.style.display = 'none';
    }

    function ocultarResultado() {
        resultado.style.display = 'none';
        botaoCopiar.style.display = 'none';
        imagemDecoracao.style.display = 'block';
        mensagemNenhuma.style.display = 'block';
    }

    function resetPagina() {
        mensagemInput.value = '';
        resultado.value = '';
        ocultarResultado();
    }

    function exibirMensagemCopiado() {
        const mensagem = document.createElement('div');
        mensagem.textContent = 'Texto copiado para a área de transferência!';
        mensagem.style.position = 'fixed';
        mensagem.style.bottom = '20px';
        mensagem.style.right = '20px';
        mensagem.style.backgroundColor = 'var(--cor-terciaria)';
        mensagem.style.color = 'white';
        mensagem.style.padding = '10px 20px';
        mensagem.style.borderRadius = '5px';
        mensagem.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        mensagem.style.zIndex = '1000';
        mensagem.style.opacity = '1';
        mensagem.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(mensagem);

        setTimeout(() => {
            mensagem.style.opacity = '0';
            setTimeout(() => {
                mensagem.remove();
            }, 300);
        }, 3000);
    }

    botaoCriptografar.addEventListener('click', criptografarMensagem);
    botaoDescriptografar.addEventListener('click', descriptografarMensagem);
    botaoCopiar.addEventListener('click', copiarTexto);
    botaoReset.addEventListener('click', resetPagina);
});
