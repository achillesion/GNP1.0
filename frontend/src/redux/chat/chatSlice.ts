import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Message } from "../../d";

const initialState: ChatState = {
  selectedProfile: null,
  messages: [],
  chatProfiles: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addChatProfile: (state, action: PayloadAction<any>) => {
      state.chatProfiles.push(action.payload);
    },
    setChatProfiles: (state, action: PayloadAction<any[]>) => {
      state.chatProfiles = action.payload;
    },
    setSelectedProfile: (state, action: PayloadAction<any>) => {
      state.selectedProfile = action.payload;
    },
  },
});

export const {
  addMessage,
  setMessages,
  addChatProfile,
  setChatProfiles,
  setSelectedProfile,
} = chatSlice.actions;
export default chatSlice.reducer;
