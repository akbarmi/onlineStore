import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../../api/Agent";
import { loginUser, registerUser, User } from "../../../models/types";

interface AccountState {
  user: User | null;
  isManagerURL: boolean;
}

const initialState: AccountState = {
  user: null,
  isManagerURL: false,
};

export const singInUser = createAsyncThunk<User, loginUser>(
  "account/signInUser",
  async (userLogin, thunkAPI) => {
    try {
      const userinfo: any = await agent.Account.login(userLogin);
      localStorage.setItem("token", userinfo.success.token);
      const role = await agent.Account.getUserRole({
        headers: { Authorization: `Bearer ${userinfo.success.token}` },
      });
      return {
        name: userinfo.success.user.name,
        email: userinfo.success.user.email,
        token: userinfo.success.token,
        role: role.role,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    // thunkAPI.dispatch(setToken(localStorage.getItem("token")!));
    try {
      const user = await agent.Account.currentUser();
      localStorage.setItem(user, JSON.stringify(user));
      const roleArray = JSON.parse(user.user.roles);
      return {
        name: user.user.name,
        email: "null",
        token: localStorage.getItem("token")!,
        role: roleArray[0],
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("token")) return false;
    },
  }
);
export const singUpUser = createAsyncThunk<User, registerUser>(
  "account/signUpUser",
  async (userRegister, thunkAPI) => {
    try {
      const userinfo: any = await agent.Account.register(userRegister);
      localStorage.setItem("token", userinfo.success.token);
      // const role = await agent.Account.getUserRole({
      //   headers: { Authorization: `Bearer ${userinfo.success.token}` },
      // });
      return {
        name: userinfo.success.user.name,
        email: userinfo.success.user.email,
        token: userinfo.success.token,
        role: "null",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const logoutUser = createAsyncThunk<void, void>(
  "account/logoutUser",
  async (_, thunkAPI) => {
    try {
      await agent.Account.logout();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setToken: (state, action) => {
      // state.user?.token != action.payload;
    },
    setManagerURL: (state, action) => {
      state.isManagerURL = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.rejected, (state) => {});
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("token");
    });
    builder.addMatcher(
      isAnyOf(
        singInUser.fulfilled,
        fetchCurrentUser.fulfilled,
        singUpUser.fulfilled
      ),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        singInUser.rejected,
        fetchCurrentUser.rejected,
        singUpUser.rejected
      ),
      (state, action) => {}
    );
  },
});

export const { setToken, setManagerURL } = accountSlice.actions;
