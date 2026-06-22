import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="notfound-panel">
      <h1>Pagina nao encontrada</h1>
      <p>O endpoint solicitado nao existe na Carmelita Festas.</p>
      <Link to="/">Voltar para inicio</Link>
    </section>
  );
};

export default NotFoundPage;
