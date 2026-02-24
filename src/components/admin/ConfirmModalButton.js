'use client';

import { useAdminModal } from '@/contexts/AdminModalProvider';

function ConfirmModalButton({
  text = 'Confirm',
  disabled = false,
  buttonClass = 'btn btn-danger',
  style = { transition: 'background-color 0.2s ease-in-out' },
  data
}) {
  const { onOpen } = useAdminModal();

  const onButton = () => {
    onOpen(data);
  };

  return (
    <button
      onClick={onButton}
      disabled={disabled}
      className={buttonClass}
      style={style}
    >
      {text}
    </button>
  );
}

export default ConfirmModalButton;
