/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE_URL: string;
  VITE_PASSWORD_SECRET: string;
  VITE_BASE_IMAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
