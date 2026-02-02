import React, { type ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Content from '@theme/CodeBlock/Content';
import type { Props } from '@theme/CodeBlock/Layout';
import Buttons from '@theme/CodeBlock/Buttons';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

// Словарь иконок для языков (расширяемый)
const languageIcons: Record<string, string> = {
  javascript: 'vscode-icons:file-type-js-official',
  typescript: 'vscode-icons:file-type-typescript-official',
  jsx: 'vscode-icons:file-type-reactjs',
  tsx: 'vscode-icons:file-type-reactts',
  python: 'vscode-icons:file-type-python',
  java: 'vscode-icons:file-type-java',
  cpp: 'vscode-icons:file-type-cpp',
  csharp: 'vscode-icons:file-type-csharp',
  go: 'vscode-icons:file-type-go',
  rust: 'vscode-icons:file-type-rust',
  php: 'vscode-icons:file-type-php',
  ruby: 'vscode-icons:file-type-ruby',
  html: 'vscode-icons:file-type-html',
  css: 'vscode-icons:file-type-css',
  json: 'vscode-icons:file-type-json',
  markdown: 'vscode-icons:file-type-markdown',
  bash: 'vscode-icons:file-type-shell',
  sql: 'vscode-icons:file-type-sql',
  lua: 'vscode-icons:file-type-lua',
  text: 'mdi:text',
};

// Парсинг метастроки для извлечения filename и пути
function parseMetastring(metastring: string | undefined) {
  if (!metastring) return { filename: undefined, path: undefined };

  // Ищем filename="..."
  const filenameMatch = metastring.match(/filename="([^"]*)"/);
  const filename = filenameMatch?.[1];

  if (filename) {
    // Разбиваем путь на директории и имя файла
    const parts = filename.split('/');
    const name = parts.pop() || '';
    const path = parts.join('/');
    return { filename: name, path: path || undefined };
  }

  return { filename: undefined, path: undefined };
}

export default function CodeBlockLayout({ className }: Props): ReactNode {
  const { metadata } = useCodeBlockContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Получаем язык и иконку
  const language = metadata.language || 'text';
  const icon = languageIcons[language] || languageIcons.text;

  // Парсим метастроку
  const { filename, path } = parseMetastring(metadata.metastring);
  const displayTitle = metadata.title;

  // Текст для кнопки сворачивания
  const collapseLabel = isCollapsed ? 'Развернуть код' : 'Свернуть код';

  return (
    <Container as="div" className={clsx(className, metadata.className)}>
      {/* Заголовок блока с иконкой, бейджем и путем */}
      <div className={styles.codeBlockHeader}>
        <div className={styles.headerLeft}>
          {/* Иконка языка */}
          <Icon icon={icon} className={styles.languageIcon} />

          {/* Бейдж языка */}
          <span className={styles.languageBadge}>{language}</span>

          {/* Путь к файлу (если есть в метастроке) */}
          {path && (
            <div className={styles.filePath}>
              <Icon icon="mdi:folder-outline" className={styles.folderIcon} />
              <span className={styles.pathText}>{path}/</span>
            </div>
          )}

          {/* Имя файла (из метастроки или title) */}
          {(filename || displayTitle) && (
            <div className={styles.fileName}>
              <Icon icon="mdi:file-outline" className={styles.fileIcon} />
              <span className={styles.nameText}>{filename || displayTitle}</span>
            </div>
          )}
        </div>

        <div className={styles.headerRight}>
          {/* Кнопка сворачивания */}
          <button
            className={styles.collapseButton}
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={collapseLabel}
            title={collapseLabel}
          >
            <Icon
              icon={isCollapsed ? 'mdi:chevron-down' : 'mdi:chevron-up'}
              className={styles.collapseIcon}
            />
          </button>
        </div>
      </div>

      {/* Содержимое блока (скрывается при сворачивании) */}
      {!isCollapsed && (
        <div className={styles.codeBlockContent}>
          <Content />
          <Buttons />
        </div>
      )}
    </Container>
  );
}
