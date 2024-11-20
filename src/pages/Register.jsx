import React from 'react';

function Register() {
  return (
    <div>
      <h2>Registro</h2>
      <form>
        <input type="text" placeholder="Usuário" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
