import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  User: boolean;
  UserName:string
}

const initialState: UserState = {
  User: false,
  UserName:"NoUser"
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<boolean>) => {
      state.User = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
        state.UserName = action.payload;
      },
  },
});

export const { setUser,setUserName } = authSlice.actions;

export default authSlice.reducer;
