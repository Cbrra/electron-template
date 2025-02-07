/// <reference types="vite-electron-plugin/electron-env" />

declare namespace NodeJS {
    interface ProcessEnv {
        APP_ROOT: string;
        VITE_PUBLIC: string;
    }
}
