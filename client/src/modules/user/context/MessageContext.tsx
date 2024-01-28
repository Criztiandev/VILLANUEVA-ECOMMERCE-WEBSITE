/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define types for your state and action
interface MessageState {
  isActive: boolean;
}

interface MessageContextProps {
  state: MessageState;
  toggleMessage: () => void; // Add the toggleMessage function to the context
}

interface MessageAction {
  type: string; // Define the type property in MessageAction
}

const initialMessageState: MessageState = {
  isActive: false,
};

const MessageActions = {
  TOGGLE_MESSAGE: "TOGGLE_MESSAGE",
  // Add other action types as needed
};

const messageReducer = (
  state: MessageState,
  action: MessageAction
): MessageState => {
  switch (action.type) {
    case MessageActions.TOGGLE_MESSAGE:
      return { isActive: !state.isActive };

    default:
      return state;
  }
};

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

interface MessageProviderProps {
  children: ReactNode;
}

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialMessageState);

  const toggleMessage = () => {
    dispatch({ type: MessageActions.TOGGLE_MESSAGE });
  };

  return (
    <MessageContext.Provider value={{ state, toggleMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

const useMessageContext = (): MessageContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};

export { MessageProvider, useMessageContext };
