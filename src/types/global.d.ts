import type { AuthorData } from './index';

declare module '*.yml' {
  const content: Record<string, AuthorData>;
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
