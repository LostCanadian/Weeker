const STORAGE_NAMESPACE = (() => {
  const explicit = import.meta.env.VITE_STORAGE_NAMESPACE?.trim();
  if (explicit) {
    return explicit;
  }

  const mode = import.meta.env.MODE;
  switch (mode) {
    case 'development':
      return 'dev';
    case 'test':
      return 'test';
    case 'production':
    default:
      return 'prod';
  }
})();

export { STORAGE_NAMESPACE };
