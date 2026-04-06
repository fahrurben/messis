const showModal = (modalId: string) => {
  // @ts-ignore
  document.getElementById(modalId).showModal()
}

const closeModal = (modalId: string) => {
  // @ts-ignore
  document.getElementById(modalId).close()
}

export {showModal, closeModal}