// WaveSurferPlayer.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Icon from './Icon';

interface WaveSurferPlayerProps {
  audioUrl: string;
  showSpectrogramByDefault?: boolean;
  showVolumeControl?: boolean;
  showSpeedControl?: boolean;
  height?: number;
  waveColor?: string;
  progressColor?: string;
}

/**
 * Продвинутый аудио-плеер с визуализацией волновой формы на основе WaveSurfer.js
 * 
 * @component
 * @example
 * ```tsx
 * <WaveSurferPlayer
 *   audioUrl="/audio/sample.mp3"
 *   height={100}
 *   showVolumeControl={true}
 *   showSpeedControl={true}
 * />
 * ```
 * 
 * @param {WaveSurferPlayerProps} props - Свойства компонента
 * @param {string} props.audioUrl - URL аудио файла для воспроизведения
 * @param {boolean} [props.showSpectrogramByDefault=false] - Показывать спектрограмму по умолчанию
 * @param {boolean} [props.showVolumeControl=true] - Показывать контроль громкости
 * @param {boolean} [props.showSpeedControl=true] - Показывать контроль скорости воспроизведения
 * @param {number} [props.height=128] - Высота волновой формы
 * @param {string} [props.waveColor="rgba(123, 210, 26, 0.3)"] - Цвет волновой формы
 * @param {string} [props.progressColor="var(--ifm-color-primary)"] - Цвет прогресса воспроизведения
 * 
 * @returns {JSX.Element} Аудио плеер с визуализацией
 */
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handlePlayPause = useCallback(() => {
    waveSurferRef.current?.playPause();
  }, []);

  const handleStop = useCallback(() => {
    waveSurferRef.current?.stop();
    setCurrentTime('00:00');
  }, []);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!waveSurferRef.current || !isReady || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const progress = x / rect.width;

      waveSurferRef.current.seekTo(progress);
    },
    [isReady]
  );

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    waveSurferRef.current?.setVolume(newVolume);
  }, []);

  const handleSpeedChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    waveSurferRef.current?.setPlaybackRate(newRate);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    setIsLoading(true);

    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor,
      progressColor,
      cursorColor: 'var(--ifm-color-primary-dark)',
      barWidth: 2,
      barRadius: 2,
      height,
      normalize: true,
      interact: true,
      dragToSeek: true,
    });

    waveSurferRef.current.load(audioUrl);

    const readyHandler = () => {
      const dur = waveSurferRef.current?.getDuration() || 0;
      setDuration(formatTime(dur));
      setIsReady(true);
      setIsLoading(false);

      waveSurferRef.current?.setVolume(volume);
      waveSurferRef.current?.setPlaybackRate(playbackRate);
    };

    const audioProcessHandler = () => {
      const time = waveSurferRef.current?.getCurrentTime() || 0;
      setCurrentTime(formatTime(time));
    };

    waveSurferRef.current.on('ready', readyHandler);
    waveSurferRef.current.on('audioprocess', audioProcessHandler);
    waveSurferRef.current.on('play', () => setIsPlaying(true));
    waveSurferRef.current.on('pause', () => setIsPlaying(false));
    waveSurferRef.current.on('finish', () => setIsPlaying(false));
    waveSurferRef.current.on('error', () => setIsLoading(false));

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, [audioUrl, waveColor, progressColor, height]);

  return (
    <div className="wave-surfer-player">
      <div ref={containerRef} onClick={handleSeek} className="waveform-container" />

      {isLoading && (
        <div className="loading-indicator">
          <Icon icon="mdi:loading" size={24} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading audio...</span>
        </div>
      )}

      {isReady && (
        <div className="time-display">
          {currentTime} / {duration}
        </div>
      )}

      <div className="controls-main">
        <div className="playback-controls">
          <button
            onClick={handlePlayPause}
            disabled={!isReady || isLoading}
            className="control-button primary"
          >
            <Icon icon={isPlaying ? 'mdi:pause' : 'mdi:play'} size={16} />
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            onClick={handleStop}
            disabled={!isReady || isLoading}
            className="control-button secondary"
          >
            <Icon icon="mdi:stop" size={16} />
            Stop
          </button>
        </div>
      </div>

      <div className="controls-additional">
        {showVolumeControl && (
          <div className="volume-control">
            <Icon icon={volume === 0 ? 'mdi:volume-off' : 'mdi:volume-high'} size={16} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>
        )}

        {showSpeedControl && (
          <div className="speed-control">
            <Icon icon="mdi:speedometer" size={16} />
            <select value={playbackRate} onChange={handleSpeedChange}>
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                <option key={speed} value={speed}>
                  {speed}x
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaveSurferPlayer;