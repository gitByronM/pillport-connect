import { createListenerMiddleware } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabase';
import { setSession } from '../slices/authSlice';
import { updateProfile } from '../slices/userSlice';

export const authListener = createListenerMiddleware();

authListener.startListening({
  actionCreator: setSession,
  effect: async (action, listenerApi) => {
    if (action.payload?.user) {
      try {
        const { data: userData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', action.payload.user.id)
          .single();

        if (error) throw error;
        if (userData) {
          listenerApi.dispatch(updateProfile(userData));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  },
});
