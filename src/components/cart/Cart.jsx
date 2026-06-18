import { useRef } from "react";
import CartButton from "./CartButton";
import CartDialog from "./CartDialog";

export default function Cart() {
  const modal = useRef();

  function handleOpenModal() {
    modal.current.showModal();
  }

  return (
    <>
      <CartButton handleOpenCart={handleOpenModal} />
      <CartDialog cartDialog={modal} />
    </>
  );
}
