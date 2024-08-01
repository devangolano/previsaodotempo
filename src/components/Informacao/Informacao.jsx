import React from 'react';

function Informacao({ tempo}) {
    // Verifica se a informação está disponível
    if (!tempo || Object.keys(tempo).length === 0) {
        return (
            <div>
                <p className='text-base text-red-400 font-semibold'>
                    Busque o clima de uma cidade.
                </p>
            </div>
        );
    }

    // Obtém o código do ícone
    const iconCode = tempo.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Obtém outras informações
    const temperature = tempo.main.temp; // Temperatura
    const pressure = tempo.main.pressure; // Pressão
    const humidity = tempo.main.humidity; // Umidade
    const description = tempo.weather[0].description; // Descrição do clima



    return (
        <div className='bg-slate-900/55 p-2 md:p-8 lg:p-10 rounded-lg shadow-md shadow-slate-200/80 w-9/12 lg:w-6/12  min-h-auto mx-auto mt-6'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 mb-4 text-center'>
                {tempo.name}
            </h2>
            <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4'>
                <img
                    src={iconUrl}
                    alt={description}
                    className='w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32'
                />
                <div className='space-y-4 md:space-y-6'>
                    <p className='text-xl md:text-2xl lg:text-3xl font-semibold text-center text-gray-200'>
                        Temperatura: {Math.round(temperature)}°C
                    </p>
                    <div className='flex flex-col md:flex-row text-sm md:text-base gap-2 md:gap-4'>
                        <p className='text-gray-100'>Pressão: {pressure} hPa</p>
                        <p className='text-gray-100'>Umidade: {humidity}%</p>
                        <p className='text-gray-200'>📍 {description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Informacao;
