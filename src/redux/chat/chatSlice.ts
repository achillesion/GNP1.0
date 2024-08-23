import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ActiveUsers,
  ChatProfile,
  ChatState,
  Message,
  UserStatusPayload,
} from "../../d";

const initialState: ChatState = {
  isLoadingProfiles: false,
  isLoadingMessages: false,
  isLoadingProfile: false,
  selectedProfile: null,
  messages: [],
  chatProfiles: [],
  activeUsers: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    updateMessageStatus(
      state,
      action: PayloadAction<{ id: string; status: "SENT" | "FAILED" }>
    ) {
      const message = state.messages.find(
        (msg) => msg.id === action.payload.id
      );
      if (message) {
        message.status = action.payload.status;
      }
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addChatProfile: (state, action: PayloadAction<ChatProfile>) => {
      state.chatProfiles.push(action.payload);
    },
    setChatProfiles: (state, action: PayloadAction<ChatProfile[]>) => {
      state.chatProfiles = action.payload;
    },
    setSelectedProfile: (state, action: PayloadAction<ChatProfile | null>) => {
      state.selectedProfile = action.payload;
    },
    updateChatProfile: (state, action: PayloadAction<ChatProfile>) => {
      const index = state.chatProfiles.findIndex(
        (profile) => profile.id === action.payload.id
      );
      if (index !== -1) {
        state.chatProfiles[index] = action.payload;
        const [updatedProfile] = state.chatProfiles.splice(index, 1);
        state.chatProfiles.unshift(updatedProfile);
      } else {
        state.chatProfiles.unshift(action.payload);
      }
    },
    setLoadingProfiles: (state, action: PayloadAction<boolean>) => {
      state.isLoadingProfiles = action.payload;
    },
    setLoadingMessages: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMessages = action.payload;
    },
    setLoadingProfile: (state, action: PayloadAction<boolean>) => {
      state.isLoadingProfile = action.payload;
    },
    setActiveUsers: (state, action: PayloadAction<ActiveUsers>) => {
      state.activeUsers = action.payload;
    },
    updateActiveUser: (state, action: PayloadAction<UserStatusPayload>) => {
      const { id, status } = action.payload;
      if (status === "OFFLINE") {
        delete state.activeUsers[id];
      } else {
        state.activeUsers[id] = status;
      }
    },
  },
});

export const {
  addMessage,
  updateMessageStatus,
  setMessages,
  addChatProfile,
  setChatProfiles,
  setSelectedProfile,
  updateChatProfile,
  setLoadingProfiles,
  setLoadingMessages,
  setLoadingProfile,
  setActiveUsers,
  updateActiveUser,
} = chatSlice.actions;
export default chatSlice.reducer;
