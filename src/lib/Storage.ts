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

  removeAuthData: () => {
    Storage.remove(Storage.AUTH_DATA_TOKEN);
  },

  getAuthData: () => {
    return Storage.get(Storage.AUTH_DATA_TOKEN) as { token: string; user: { id: number } } | null;
  },

  setAuthData: (data: LoginResponse) => {
    Storage.set(Storage.AUTH_DATA_TOKEN, {
      token: data.token,
      user: { id: data.user.id },
    });
  },

  getApiToken: () => Storage.getAuthData()?.token || null,

  getUserId: () => Storage.getAuthData()?.user.id || null,
}
