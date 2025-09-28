import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, selectActiveModal, selectIsModalOpen } from '@/stores/slices/modalSlice';
import { MODAL_TYPES } from '@/stores/slices/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const isOpen = useSelector(selectIsModalOpen);

  const open = (modalType, data = null) => {
    dispatch(openModal({ modalType, data }));
  };

  const close = () => {
    dispatch(closeModal());
  };

  const isModalOpen = (modalType) => {
    return activeModal === modalType && isOpen;
  };

  // Convenience methods for common modals
  const openConfirmation = (config) => {
    open(MODAL_TYPES.CONFIRMATION, {
      title: config.title || 'Confirm Action',
      message: config.message || 'Are you sure you want to proceed?',
      type: config.type || 'warning',
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
      onConfirm: config.onConfirm,
      isLoading: config.isLoading || false,
    });
  };

  const openForwardTo = (config) => {
    open(MODAL_TYPES.FORWARD_TO, {
      title: config.title || 'Forward Item',
      onSubmit: config.onSubmit,
      isLoading: config.isLoading || false,
      options: config.options || {},
    });
  };

  const openGeneric = (modalType, config) => {
    open(modalType, {
      title: config.title || 'Modal',
      content: config.content,
      size: config.size || 'default',
      className: config.className || '',
    });
  };

  return {
    open,
    close,
    isModalOpen,
    activeModal,
    isOpen,
    // Convenience methods
    openConfirmation,
    openForwardTo,
    openGeneric,
    // Modal types for reference
    MODAL_TYPES,
  };
};
