import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Message } from "../../d";

const initialState: ChatState = {
  isLoadingProfiles: false,
  isLoadingMessages: false,
  isLoadingProfile: false,
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
    setLoadingProfiles: (state, action: PayloadAction<boolean>) => {
      console.log("Payload:", action.payload);
      state.isLoadingProfiles = action.payload;
    },
    setLoadingMessages: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMessages = action.payload;
    },
    setLoadingProfile: (state, action: PayloadAction<boolean>) => {
      state.isLoadingProfile = action.payload;
    },
  },
});

export const {
  addMessage,
  setMessages,
  addChatProfile,
  setChatProfiles,
  setSelectedProfile,
  setLoadingProfiles,
  setLoadingMessages,
  setLoadingProfile,
} = chatSlice.actions;
export default chatSlice.reducer;
