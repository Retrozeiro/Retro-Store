import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const initialState = { name: '', email: '', password: '' };

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, login, register, logout } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const action = mode === 'login' ? login : register;
    const response = action(form);
    setMessage(response.message);

    if (response.ok) {
      setForm(initialState);
      navigate('/produtos');
    }
  };

  return (
    <section className="auth-panel">
      <div className="auth-header">
        <h1>Login e cadastro</h1>
        <p>Pagina dedicada para autenticacao simulada com sessao local.</p>
      </div>

      <div className="auth-switch">
        <button
          type="button"
          className={mode === 'login' ? 'active' : ''}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={mode === 'register' ? 'active' : ''}
          onClick={() => setMode('register')}
        >
          Cadastro
        </button>
      </div>

      <form className="auth-form" onSubmit={submit}>
        <label>
          Nome
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Ex: Ana Carmelita"
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="conta@carmelitafestas.com"
          />
        </label>

        {mode === 'register' && (
          <label>
            Senha (simulada)
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Digite qualquer senha"
            />
          </label>
        )}

        <button type="submit">{mode === 'login' ? 'Entrar na Carmelita Festas' : 'Criar conta ficticia'}</button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      {user && (
        <div className="auth-session">
          <p>
            Sessao ativa para <strong>{user.name}</strong> ({user.email})
          </p>
          <button type="button" onClick={logout}>
            Encerrar sessao
          </button>
        </div>
      )}
    </section>
  );
};

export default AuthPage;
