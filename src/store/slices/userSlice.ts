import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  documentNumber: string;
  gender: 'male' | 'female';
  avatarUrl: string;
  addresses: any[];
  purchases: any[];
  favorites: any[];
}

const initialState: UserProfile = {
  id: '',
  name: '',
  email: '',
  documentNumber: '',
  gender: 'male',
  avatarUrl: '',
  addresses: [],
  purchases: [],
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      return { ...state, ...action.payload };
    },
    clearProfile: () => initialState,
  },
});

export const { updateProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;
