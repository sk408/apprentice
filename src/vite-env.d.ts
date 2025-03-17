/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly BASE_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_VERSION: string;
    readonly VITE_BASE_URL: string;
    readonly [key: string]: string | undefined;
  };
} 