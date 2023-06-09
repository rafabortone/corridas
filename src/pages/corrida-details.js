import { useContext, useState, useEffect } from "react";
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CorridaDetails() {

  const navigate = useNavigate();

  const user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : ''

  const [nome, setNome] = useState("");
  const [inscrito, setInscrito] = useState(false)

  const inscricoes = localStorage.getItem('inscricao') ? JSON.parse(localStorage.getItem('inscricao')) : []

  const {
    corrida,
    setCorrida,
    setInscricao
  } = useContext(AppContext);

  useEffect(() => {

    function getCorrida() {
      if (corrida.id) {
        localStorage.setItem('corrida', JSON.stringify(corrida))
      }
      if (corrida.length === 0 && localStorage.getItem('corrida')) {
        setCorrida(JSON.parse(localStorage.getItem('corrida')))
      }

      if (inscricoes.length) {
        inscricoes.forEach(element => {
          if (element.corrida.id == corrida.id) {
            setInscrito(true)
          }
        });
      }
    }
    getCorrida();

  }, [setCorrida]);

  function setInscription() {

    let dados = {
      id: corrida.id,
      corrida_id: corrida.id,
      usuario_id: user.id,
      numero_inscricao: parseInt(Math.random() * 200),
      corrida: corrida,
    }
    setInscricao(current => [...current, dados]);

    Swal.fire(
      'Sucesso!',
      'inscrição realizada com sucesso',
      'success'
    ).then(function () {
      navigate('/area-atleta', { replace: true });
    });
  }

  return (

    <div className="detail" >
      <section className="detail__top">
        <div className="detail__container">
          <figure className="detail__banner">
            <img src={corrida.imagem} />
          </figure>
          <div className="detail__information">
            <article>
              <h4>{corrida.nome}</h4>
              <h3>{corrida.data}</h3>
              <h3>{corrida.horario}</h3>

            </article>
            <div className="content">
              <h2>Endereço</h2>
              <h5>Rua: {corrida.rua}</h5>
              <h5>Bairro: {corrida.bairro}, {corrida.cidade}-{corrida.estado}</h5>
              <h5>referencia: {corrida.referencia}</h5>
              <h5>Distância: {corrida.distancia}</h5>
              <h5>Categoria: {corrida.categoria}</h5>
              <h5>Modalidade: {corrida.modalidade}</h5>
            </div>
          </div>
        </div>
        {
          inscrito && user != '' ?
            <div>
              <h1>
                Você já está inscrito nessa corrida
              </h1>
            </div>

            :

            user != '' ?
              <div className="inscricao">
                <h2>Inscrição</h2>
                <form>
                  <input type="text" name='nome' placeholder="nome" value={user.nome ? user.nome : ''} readOnly />
                  <input type="text" name='ncpf' placeholder="cpf" value={user.cpf ? user.cpf : ''} readOnly />
                  <input type="text" name='email' placeholder="email" value={user.email ? user.email : ''} />
                  <input type="text" name='telefone' placeholder="telefone" value={user.telefone ? user.telefone : ''} />
                  <input type="text" name='data_nascimento' value={user.data_nascimento ? user.data_nascimento : ''} placeholder="data nascimento" readOnly />
                  <input type="text" name='apelido' placeholder="nome que irá na identificação" />
                  <div className="buttons">
                    <button type="button" className="btn-cancelar">cancelar</button>
                    <button type="button" className="btn-salvar" onClick={() => setInscription()}>salvar</button>
                  </div>
                </form>
              </div>
              :
              <div className="message">
                <h3>Você precisar estar logado no sistema para ter acesso ao formulário de inscrição.</h3>
                <Link to='/login'>
                  <button className="btn-login">clique aqui para fazer login</button>
                </Link>
              </div>
        }


      </section>
    </div>

  )
}