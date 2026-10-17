import { COLOR_SCHEME_STORAGE_KEY } from "./color-scheme";

/** Runs before paint — keep in sync with `color-scheme.ts` resolution logic. */
export const COLOR_SCHEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(COLOR_SCHEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var t=s==="light"||s==="dark"?s:d;document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
