class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector(".formulario")
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const fieldsValid = this.allfieldsvalid();
    const senhasValidas = this.senhasSaoValidas();

    if (fieldsValid && senhasValidas) {
      alert('Formulário enviado');
      this.formulario.submit();
    }
  }

  senhasSaoValidas(e) {
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if (senha.value !== repetirSenha.value) {
      valid = false
      this.createErro(senha, 'Campos senha e repetir senha precisa ser iguais.');
      this.createErro(repetirSenha, 'Campos senha e repetir senha precisa ser iguais.')
    }
    
    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false
      this.createErro(senha, 'Senha precisa estar entre 6 e 12 caracteres');
    }

    return valid;
  }

  allfieldsvalid() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let field of this.formulario.querySelectorAll('.validar')) {
      const label = field.previousElementSibling.innerText;

      if (field.value === '') {
        this.createErro(field, `Campo "${label}" não pode estar em branco`);
        valid = false
      }

      if (field.classList.contains('cpf')) {
        if (!this.validaCPF(field)) valid = false;
      }

      if (field.classList.contains('usuario')) {
        if (!this.validaUsuario(field)) valid = false;
      }

    }

    return valid
  }

  validaUsuario(field) {
    const usuario = field.value;
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.createErro(field, 'Usuario precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.createErro(field, 'Usuario precisa conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  validaCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if (!cpf.valida()) {
      this.createErro(field, 'CPF inválido.');
      return false;
    }
    return true;
  }

  createErro(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div)
  }
}


const valida = new ValidaFormulario()