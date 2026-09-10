// src/context/PaymentContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const PaymentContext = createContext();

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayments must be used within a PaymentProvider");
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("payments");
    if (stored) {
      try {
        setPayments(JSON.parse(stored));
      } catch (e) {
        setPayments([]);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("payments", JSON.stringify(payments));
    }
  }, [payments, isLoading]);

  const addPayment = (payment) => {
    setPayments((prev) => {
      // Prevent duplicate entries
      if (prev.some((p) => p.id === payment.id)) return prev;
      return [payment, ...prev];
    });
  };

  const clearPayments = () => {
    setPayments([]);
  };

  return (
    <PaymentContext.Provider
      value={{ payments, addPayment, clearPayments, isLoading }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
