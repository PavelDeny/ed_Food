function toggleModal(modalSelector, isOpen) {
  const modal = document.querySelector(modalSelector);
  modal.classList.toggle("show", isOpen);
  modal.classList.toggle("hide", !isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";

  return modal;
}

function closeModal(modalSelector) {
  toggleModal(modalSelector, false);
}

function openModal(modalSelector, modalTimerId) {
  const modal = toggleModal(modalSelector, true);
  if (modalTimerId) clearInterval(modalTimerId);
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
