'use client';
import { useEffect, useState } from 'react';
import Timer from '../../components/Timer';
import Image from 'next/image';
import {
  FaVolumeUp,
  FaVolumeMute,
  FaBackward,
  FaForward,
} from 'react-icons/fa';

interface Meditation {
  titulo: string;
  descricao: string;
  categoria: string;
  duracao: number; 
  imagem: string; 
  arquivoAudio: string;
}

export default function MeditationsPage() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [filteredMeditations, setFilteredMeditations] = useState<Meditation[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeditation, setSelectedMeditation] =
    useState<Meditation | null>(null);
  const [currentTime, setCurrentTime] = useState(0); // Tempo atual da meditação
  const [isPlaying, setIsPlaying] = useState(false); // Estado do player de áudio
  const [volume, setVolume] = useState(1); // Volume do áudio (0 a 1)
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const response = await fetch('http://localhost:3800/meditations');
        if (!response.ok) {
          throw new Error('Erro ao buscar meditações');
        }
        const data = await response.json();
        setMeditations(data);
        setFilteredMeditations(data); // Inicialmente, exibe todas as meditações
        setLoading(false);
      } catch (err) {
        
        setLoading(false);
      }
    };

    fetchMeditations();
  }, []);

  useEffect(() => {
    // Filtra as meditações com base no termo de busca
    const filtered = meditations.filter((meditation) =>
      meditation.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredMeditations(filtered);
  }, [searchTerm, meditations]);

  // Função para formatar o tempo (segundos) para "mm:ss"
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    setCurrentTime(audio.currentTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    audio.volume = newVolume;
  };

  const handleSeekBackward = () => {
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    audio.currentTime -= 5; // Retrocede 5 segundos
  };

  const handleSeekForward = () => {
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    audio.currentTime += 5; // Avança 5 segundos
  };

  // Função para salvar o progresso da meditação 
  const handleSaveProgress = () => {
    if (selectedMeditation) {
      localStorage.setItem(
        `meditationProgress-${selectedMeditation.titulo}`,
        currentTime.toString(),
      );
      alert('Progresso salvo!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Meditações Disponíveis
      </h1>

      {/* Barra de Busca */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar meditação..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
        />
      </div>

      {/* Seção de Carregamento/Erro */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Carregando meditações...
          </p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold text-red-600">Erro: {error}</p>
        </div>
      )}

      {/* Lista de Meditações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMeditations.map((meditation) => (
          <div
            key={meditation.titulo}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => setSelectedMeditation(meditation)}
          >
            <Image
              src={meditation.imagem}
              alt={meditation.titulo}
              width={400}
              height={200}
              className="rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {meditation.titulo}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
              {meditation.descricao}
            </p>
          </div>
        ))}
      </div>

      {/* Seção da Meditação Selecionada */}
      {selectedMeditation && (
        <div className="mt-12 bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {selectedMeditation.titulo}
          </h2>

          
          <Image
            src={selectedMeditation.imagem}
            alt={selectedMeditation.titulo}
            width={800}
            height={400}
            className="rounded-md mb-4 mx-auto"
          />

          {/* Player de Áudio */}
          <audio
            id="audioPlayer"
            src={selectedMeditation.arquivoAudio}
            onTimeUpdate={handleTimeUpdate}
            className="w-full"
          ></audio>

          {/* Controles do Player */}
          <div className="flex items-center justify-center my-4 space-x-6">
            {/* Botão Retroceder */}
            <button
              onClick={handleSeekBackward}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
              aria-label="Retroceder 5 segundos"
            >
              <FaBackward />
            </button>

          
            <button
              onClick={handlePlayPause}
              className="bg-primary text-white px-6 py-2 font-semibold rounded-full hover:bg-primary-dark transition-transform transform hover:scale-105"
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? 'Pausar' : 'Reproduzir'}
            </button>

            <button
              onClick={handleSeekForward}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
              aria-label="Avançar 5 segundos"
            >
              <FaForward />
            </button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="mx-4 w-64 bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: `${(currentTime / selectedMeditation.duracao) * 100}%`,
                }}
              ></div>
            </div>
          </div>

         
          <div className="flex items-center justify-center mb-4">
            <span className="text-gray-700 dark:text-gray-300">
              {formatTime(currentTime)} /{' '}
              {formatTime(selectedMeditation.duracao)}
            </span>
          </div>

         
          <div className="flex items-center justify-center">
            <span className="text-gray-700 dark:text-gray-300 mr-2">
              {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-48"
            />
          </div>

         
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={handleSaveProgress}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Salvar Progresso
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
