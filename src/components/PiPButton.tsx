import React, { useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './PiPButton.module.css';

// Интерфейс для TypeScript
interface PiPWindow extends Window {
  documentPictureInPicture?: {
    requestWindow(options?: { width?: number; height?: number }): Promise<Window>;
  };
}

const PiPButton: React.FC = () => {
  const isBrowser = useIsBrowser();
  const [isPiPOpen, setIsPiPOpen] = useState(false);

  if (!isBrowser) {
    return null;
  }

  const typedWindow = window as PiPWindow;

  if (!typedWindow.documentPictureInPicture) {
    console.warn('PiP API not supported in this browser');
    return null;
  }

  const openPiPWindow = async () => {
    try {
      const pipWindow = await typedWindow.documentPictureInPicture!.requestWindow({
        width: 600,
        height: 800,
      });

      // 1. Копируем основные стили
      const copyStyles = () => {
        // Копируем все link[rel="stylesheet"] и style элементы
        document.querySelectorAll('link[rel="stylesheet"], style').forEach(element => {
          const cloned = element.cloneNode(true) as HTMLLinkElement | HTMLStyleElement;
          pipWindow.document.head.appendChild(cloned);
        });

        // Копируем инлайн-стили
        const inlineStyles = Array.from(document.styleSheets)
          .map(sheet => {
            try {
              return Array.from(sheet.cssRules)
                .map(rule => rule.cssText)
                .join('\n');
            } catch (e) {
              console.warn('Не удалось скопировать некоторые стили:', e);
              return '';
            }
          })
          .filter(Boolean)
          .join('\n');

        if (inlineStyles) {
          const styleElement = document.createElement('style');
          styleElement.textContent = inlineStyles;
          pipWindow.document.head.appendChild(styleElement);
        }
      };

      // 2. Копируем содержимое статьи
      const articleElement = document.querySelector('article');
      if (articleElement) {
        const articleClone = articleElement.cloneNode(true) as HTMLElement;

        // Очищаем ненужные элементы для PiP
        const elementsToRemove = articleClone.querySelectorAll(
          '.theme-doc-sidebar-container, nav, .pagination-nav, .theme-edit-this-page, footer, .toc'
        );
        elementsToRemove.forEach(el => el.remove());

        pipWindow.document.body.innerHTML = ''; // Очищаем тело PiP окна
        pipWindow.document.body.appendChild(articleClone);

        // 3. Добавляем специальные стили для PiP
        const pipStyles = document.createElement('style');
        pipStyles.textContent = `
        /* Базовые стили для PiP окна */
        body {
          padding: 20px !important;
          font-size: 14px !important;
          background: white !important;
          color: #333 !important;
          overflow-y: auto !important;
          max-width: 100% !important;
        }
        
        /* Убираем лишние отступы */
        article {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Увеличиваем читаемость текста */
        p, li, td, th {
          line-height: 1.6 !important;
          font-size: 14px !important;
        }
        
        /* Улучшаем заголовки */
        h1 { font-size: 1.8em !important; }
        h2 { font-size: 1.5em !important; }
        h3 { font-size: 1.3em !important; }
        
        img {
          max-width: 100% !important;
          height: auto !important;
        }
      `;
        pipWindow.document.head.appendChild(pipStyles);

        // Копируем стили после добавления контента
        setTimeout(copyStyles, 100);
      }

      setIsPiPOpen(true);

      pipWindow.addEventListener('pagehide', () => {
        setIsPiPOpen(false);
      });
    } catch (error) {
      console.error('Error while opening PiP window:', error);
    }
  };

  return (
    <button
      className={`button ${styles.pipButton}`}
      onClick={openPiPWindow}
      disabled={isPiPOpen}
      aria-label="Открыть статью в Picture-in-Picture"
    >
      {isPiPOpen ? 'PiP windows open' : 'Read in PiP window (Expiremental)'}
    </button>
  );
};

export default PiPButton;
