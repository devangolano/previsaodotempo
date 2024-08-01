import React from 'react';

const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
};

// Função para verificar se a data é a atual
const isToday = (timestamp) => {
    const today = new Date();
    const date = new Date(timestamp * 1000);
    return today.toDateString() === date.toDateString();
};

function Previsao({ previsao }) {
    // Verifica se a lista de previsões está disponível
    if (!previsao || !previsao.list || previsao.list.length === 0) {
        return (
            <div className='bg-slate-900/60 p-8 rounded-lg shadow-xl shadow-slate-800 max-w-4xl mx-auto w-11/12 md:w-1/2 mt-6 text-gray-100'>
                <p className='text-lg text-gray-300'>Nenhuma previsão disponível.</p>
            </div>
        );
    }

    const seenDates = new Set();
    const uniquePrevisoes = [];

    for (const cadaData of previsao.list) {
        const date = formatDate(cadaData.dt);

        // Filtra previsões da data atual
        if (isToday(cadaData.dt)) {
            continue;
        }

        if (!seenDates.has(date)) {
            seenDates.add(date);
            uniquePrevisoes.push(cadaData);
        }
        if (uniquePrevisoes.length >= 4) break;
    }

    return (
        <div className='bg-slate-900/60 p-5 rounded-lg shadow-xl shadow-slate-800 max-w-4xl mx-auto w-11/12 md:w-10/12 mt-6 text-gray-100'>
            <p className='md:text-2xl text-xl text-center font-bold mb-4'>Previsão dos próximos 4 Dias</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2'>
                {uniquePrevisoes.map((cadaData) => (
                    <div key={cadaData.dt} className='p-4 bg-slate-800/70 rounded-md'>
                        <p className='text-lg text-center font-semibold'>{formatDate(cadaData.dt)}</p>
                        <p className='text-md text-center font-base'>{Math.round(cadaData.main.temp)}°C</p>
                        <p className='text-sm'>Descrição: {cadaData.weather[0].description}</p>
                        <p className='text-sm'>Pressão: {cadaData.main.pressure} hPa</p>
                        <p className='text-sm'>Umidade: {cadaData.main.humidity}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Previsao;
