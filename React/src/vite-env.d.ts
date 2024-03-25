/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_DOMAIN: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}