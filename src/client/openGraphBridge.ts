if (typeof window !== 'undefined') {
  const globalWindow = window as unknown as { openGraph?: () => void } & Window;
  if (typeof globalWindow.openGraph !== 'function') {
    globalWindow.openGraph = () => {
      try {
        const target = '/graph';
        if (location.pathname !== target) {
          location.assign(target);
        }
      } catch {
        // no-op
      }
    };
  }
}


