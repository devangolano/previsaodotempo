import { useState, useRef } from 'react';
import axios from 'axios';
import Informacao from './components/Informacao/Informacao';
import Previsao from './components/Previsao/Previsao';

function App() {
  const inputRef = useRef();
  const [tempo, setTempo] = useState({});
  const [previsao, setPrevisao] = useState({});
  const [erro, setErro] = useState("")

  async function searchcity() {
    setErro("")
    const city = inputRef.current.value;
    const key = "a28f0a345f59d81a2abb52ac60873979";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const response = await axios.get(url);
      const responsePrevisao = await axios.get(urlPrevisao);
      setTempo(response.data);
      setPrevisao(responsePrevisao.data);
    } catch (error) {
      setErro("Erro! Dados inválidos.");
    }
  }

  return (
    <div className='flex flex-col items-center mx-auto mt-8 p-2 md:p-6 overflow-hidden '>
      <h1 className='py-4 font-extrabold text-2xl md:text-4xl text-white'>
        Previsão do Tempo
      </h1>

      <div className='flex mb-4 max-w-md mx-auto'>
        <input
          type="text"
          placeholder='Digite a sua cidade:'
          ref={inputRef}
          className='text-xl flex-grow rounded-l-md p-1 md:p-2 shadow-lg shadow-slate-200 focus:outline-none'
        />
        <button
          onClick={searchcity}
          className='text-xl w-auto text-white bg-red-400 md:p-2 rounded-r-md shadow-lg shadow-slate-200 flex-shrink-0'
        >
          Buscar
        </button>
      </div>


      <p className='text-base text-red-400 font-semibold'>
        {erro}
      </p>
      <Informacao tempo={tempo} />
      <Previsao previsao={previsao} />
    </div>
  );
}

export default App;
