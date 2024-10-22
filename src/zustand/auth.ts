import { create } from 'zustand'

interface IAuthStore{
  accessToken: string | null
  userId: string | null
  refreshToken:  string | null
  setAuthData: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  accessToken: null,
  userId: null,
  refreshToken: null,
  setAuthData: () =>{    
    const authDataRaw = localStorage.getItem("authData");
    if(authDataRaw){
      const authData = JSON.parse(authDataRaw);
      set({
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        userId: authData.user.id
      })
    }
  }
}))