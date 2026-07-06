import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://dykkmrrhezjlbcwjznno.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5a2ttcnJoZXpqbGJjd2p6bm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzODE3ODYsImV4cCI6MjA5Njk1Nzc4Nn0.s5iuNlU_aOQyjVGyPdWeJxdgrhREwzRFdtXVmrcdxFM'

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    }
  )