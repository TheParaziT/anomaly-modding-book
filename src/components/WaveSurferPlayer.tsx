import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
// @ts-ignore
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';

interface WaveSurferPlayerProps {
  audioUrl: string;
  showSpectrogramByDefault?: boolean;
  showVolumeControl?: boolean;
  showSpeedControl?: boolean;
  height?: number;
  waveColor?: string;
  progressColor?: string;
}

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = ({
  audioUrl,
  showSpectrogramByDefault = false,
  showVolumeControl = true,
  showSpeedControl = true,
  height = 128,
  waveColor = 'rgba(123, 210, 26, 0.3)',
  progressColor = 'var(--ifm-color-primary)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const spectrogramRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isReady, setIsReady] = useState(false);
  const [showSpectrogram, setShowSpectrogram] = useState(showSpectrogramByDefault);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setIsLoading(true);
      
      waveSurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: waveColor,
        progressColor: progressColor,
        cursorColor: 'var(--ifm-color-primary-dark)',
        barWidth: 2,
        barRadius: 2,
        height: height,
        normalize: true,
        interact: true,
        dragToSeek: true,
      });

      waveSurferRef.current.load(audioUrl);

      waveSurferRef.current.on('ready', () => {
        const dur = waveSurferRef.current?.getDuration() || 0;
        setDuration(formatTime(dur));
        setIsReady(true);
        setIsLoading(false);
        
        // Устанавливаем начальные значения
        waveSurferRef.current?.setVolume(volume);
        waveSurferRef.current?.setPlaybackRate(playbackRate);
        
        // Создаем спектрограмму по умолчанию если нужно
        if (showSpectrogramByDefault) {
          createSpectrogram();
        }
      });

      waveSurferRef.current.on('audioprocess', () => {
        const time = waveSurferRef.current?.getCurrentTime() || 0;
        setCurrentTime(formatTime(time));
      });

      waveSurferRef.current.on('play', () => setIsPlaying(true));
      waveSurferRef.current.on('pause', () => setIsPlaying(false));
      waveSurferRef.current.on('finish', () => {
        setIsPlaying(false);
      });

      waveSurferRef.current.on('loading', (percent) => {
        // Можно использовать для отображения прогресса загрузки
      });

      waveSurferRef.current.on('error', (error) => {
        console.error('WaveSurfer error:', error);
        setIsLoading(false);
      });

      return () => {
        if (spectrogramRef.current) {
          spectrogramRef.current.destroy();
        }
        waveSurferRef.current?.destroy();
      };
    }
  }, [audioUrl, showSpectrogramByDefault, waveColor, progressColor, height]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    waveSurferRef.current?.playPause();
  };

  const handleStop = () => {
    waveSurferRef.current?.stop();
    setCurrentTime('00:00');
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveSurferRef.current || !isReady) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const progress = x / width;
    
    waveSurferRef.current.seekTo(progress);
  };

  // Функция для генерации colormap
  const generateColorMap = () => {
    const colorMap = [];
    for (let i = 0; i < 256; i++) {
      const intensity = i / 255;
      const r = Math.floor(123 * intensity);
      const g = Math.floor(210 * intensity);
      const b = Math.floor(26 * intensity);
      const a = Math.floor(255 * intensity);
      colorMap.push([r, g, b, a]);
    }
    return colorMap;
  };

  const createSpectrogram = () => {
    if (!waveSurferRef.current || !isReady) return;
    
    if (spectrogramRef.current) {
      spectrogramRef.current.destroy();
    }
    
    spectrogramRef.current = waveSurferRef.current.registerPlugin(
      SpectrogramPlugin.create({
        container: containerRef.current?.parentElement || undefined,
        labels: true,
        height: 200,
        colorMap: generateColorMap(),
      })
    );
  };

  const toggleSpectrogram = () => {
    if (!waveSurferRef.current || !isReady) return;

    const newValue = !showSpectrogram;
    setShowSpectrogram(newValue);

    if (newValue) {
      createSpectrogram();
    } else {
      if (spectrogramRef.current) {
        spectrogramRef.current.destroy();
        spectrogramRef.current = null;
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    waveSurferRef.current?.setVolume(newVolume);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    waveSurferRef.current?.setPlaybackRate(newRate);
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--ifm-background-color, #fff)',
      borderRadius: '8px',
      padding: '1rem',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: 'var(--ifm-global-shadow-md)'
    }}>
      {/* Waveform */}
      <div 
        ref={containerRef} 
        onClick={handleSeek}
        style={{ 
          width: '100%', 
          marginBottom: '12px',
          cursor: isReady ? 'pointer' : 'default',
          minHeight: `${height}px`
        }} 
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div style={{ 
          textAlign: 'center', 
          color: 'var(--ifm-color-primary)',
          marginBottom: '12px'
        }}>
          <span className="iconify" data-icon="mdi:loading" data-spin="true" data-width="24" data-height="24"></span>
          <span style={{ marginLeft: '8px' }}>Загрузка аудио...</span>
        </div>
      )}
      
      {/* Time display */}
      {isReady && (
        <div style={{ 
          color: 'var(--ifm-font-color-base)',
          fontSize: '0.9rem',
          fontFamily: 'var(--ifm-font-family-base)',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          {currentTime} / {duration}
        </div>
      )}
      
      {/* Main Controls */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handlePlayPause}
            disabled={!isReady || isLoading}
            style={{
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              cursor: (isReady && !isLoading) ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              fontWeight: 'var(--ifm-font-weight-bold)',
              transition: 'var(--ifm-transition-fast)',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--ifm-color-primary-dark)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--ifm-color-primary)'}
          >
            {isPlaying ? (
              <>
                <span className="iconify" data-icon="mdi:pause" data-width="16" data-height="16"></span>
                Пауза
              </>
            ) : (
              <>
                <span className="iconify" data-icon="mdi:play" data-width="16" data-height="16"></span>
                Воспроизвести
              </>
            )}
          </button>

          <button
            onClick={handleStop}
            disabled={!isReady || isLoading}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              color: 'var(--ifm-font-color-base)',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              cursor: (isReady && !isLoading) ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              transition: 'var(--ifm-transition-fast)',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
          >
            <span className="iconify" data-icon="mdi:stop" data-width="16" data-height="16"></span>
            Стоп
          </button>

          <button
            onClick={toggleSpectrogram}
            disabled={!isReady || isLoading}
            style={{
              backgroundColor: showSpectrogram ? 'var(--ifm-color-primary)' : 'rgba(0, 0, 0, 0.1)',
              color: showSpectrogram ? 'white' : 'var(--ifm-font-color-base)',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              cursor: (isReady && !isLoading) ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              fontWeight: 'var(--ifm-font-weight-bold)',
              transition: 'var(--ifm-transition-fast)',
            }}
            onMouseOver={(e) => {
              if (showSpectrogram) {
                e.currentTarget.style.backgroundColor = 'var(--ifm-color-primary-dark)';
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseOut={(e) => {
              if (showSpectrogram) {
                e.currentTarget.style.backgroundColor = 'var(--ifm-color-primary)';
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <span className="iconify" data-icon="mdi:chart-bell-curve-cumulative" data-width="16" data-height="16"></span>
            {showSpectrogram ? 'Скрыть спектрограмму' : 'Показать спектрограмму'}
          </button>
        </div>
      </div>

      {/* Additional Controls */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {showVolumeControl && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="iconify" data-icon={volume === 0 ? "mdi:volume-off" : "mdi:volume-high"} data-width="16" data-height="16"></span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: '80px',
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '0.8rem', minWidth: '30px' }}>
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}

        {showSpeedControl && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="iconify" data-icon="mdi:speedometer" data-width="16" data-height="16"></span>
            <select
              value={playbackRate}
              onChange={handleSpeedChange}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'var(--ifm-background-color)',
                color: 'var(--ifm-font-color-base)',
                cursor: 'pointer'
              }}
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaveSurferPlayer;
