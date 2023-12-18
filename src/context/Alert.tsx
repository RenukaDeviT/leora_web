import Alert from "components/templates/Alert";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the alert
interface IAlert {
  isVisible: boolean;
  message: string;
  show: (message: string, type?: "success" | "error") => void;
  hide: () => void;
  type: "success" | "error";
}

// Create the context
const AlertContext = createContext<IAlert | undefined>(undefined);

// Create a provider component
export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<IAlert["type"]>("success");

  // Function to show the alert
  const show = (newMessage: string, type: IAlert["type"] | undefined) => {
    setMessage(newMessage);
    setIsVisible(true);
    setType(type || "error");
  };

  // Function to hide the alert
  const hide = () => {
    setIsVisible(false);
    setMessage("");
  };

  // Provide the context values
  const contextValue: IAlert = {
    isVisible,
    message,
    show,
    hide,
    type,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <Alert />
    </AlertContext.Provider>
  );
};

// Custom hook to access the context
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
