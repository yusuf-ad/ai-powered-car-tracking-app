import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Android emulator için özel fetch wrapper
const customFetch = (url: RequestInfo | URL, options?: RequestInit) => {
  return fetch(url, {
    ...options,
    headers: {
      ...((options?.headers as Record<string, string>) || {}),
      "Content-Type": "application/json",
    },
  });
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: "pkce",
  },
  global: {
    fetch: customFetch,
    headers: {
      "X-Client-Info": "supabase-js-react-native",
    },
  },
});
