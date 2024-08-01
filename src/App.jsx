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
    <div className='flex flex-col items-center mt-8 p-2 md:p-6 max-h-vh'>
      <h1 className='py-4 font-extrabold text-2xl md:text-4xl text-white text-center'>
        Previsão do Tempo
      </h1>
      <div className='flex mb-4'>

        <input type="text"
          placeholder='Digite a sua cidade:'
          ref={inputRef}
          className='text-xl items-center justify-center rounded-l-md p-2 shadow-lg shadow-slate-200 focus:outline-none'
        />


        <button
          onClick={searchcity}
          className='text-xl text-white bg-red-400 p-2 rounded-r-md shadow-lg shadow-slate-200'
        >Buscar</button>
      </div>

      <p className='mt-4 text-base text-red-400 font-semibold'>
        {erro}
      </p>
      <Informacao tempo={tempo} />
      <Previsao previsao={previsao} />
    </div>
  );
}

export default App;
