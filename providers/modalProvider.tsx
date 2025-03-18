"use client";
import { useState, useEffect } from "react";
import RenameModal from "@/modals/RenameModal";

export const ModalProvider = () => {
  //this part ensure that the component run only in the client side to prevent hydration error if the the modal runs in the server side
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <RenameModal />
    </>
  );
};
