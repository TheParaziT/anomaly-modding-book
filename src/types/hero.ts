/**
 * Тип для видео данных в Hero секции
 * 
 * @property id - Уникальный идентификатор видео
 * @property title - Заголовок видео
 * @property url - URL видео файла
 * @property startTime - Время начала воспроизведения (в секундах)
 * 
 * @category Types
 */
export interface VideoData {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly startTime: number;
}

/**
 * Тип для навигационных карточек
 * 
 * @property title - Заголовок карточки
 * @property description - Описание карточки
 * @property icon - Иконка карточки (Iconify)
 * @property href - Ссылка карточки
 * @property color - Цвет карточки
 * 
 * @category Types
 */
export interface NavigationCard {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly href: string;
  readonly color: 'primary' | 'secondary';
}