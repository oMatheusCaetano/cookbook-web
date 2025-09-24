import type { LoginResponse } from "@/data/auth";

export const Storage = {
  AUTH_DATA_TOKEN: '@cookbook:auth_data',

  setRaw: (key: string, value: any) => localStorage.setItem(key, value),
  getRaw: (key: string) => localStorage.getItem(key),
  remove: (key: string) => localStorage.removeItem(key),

  set: (key: string, value: any) => {
    if (typeof value === 'object') value = JSON.stringify(value);
    Storage.setRaw(key, value);
  },

  get: (key: string): string | object | null => {
    let value = Storage.getRaw(key);

    if (value) {
      try {
          value = JSON.parse(value);
          // eslint-disable-next-line no-empty
      } catch (err) {}
    }

    return value;
  },

  getApiToken: () => 'TOKEN',

  setAuthData: (data: LoginResponse) => {
    
  }
}
