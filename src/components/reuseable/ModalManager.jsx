import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, selectActiveModal, selectModalData } from '@/stores/slices/modalSlice';
import { MODAL_TYPES } from '@/stores/slices/modalSlice';
import GenericModal from './GenericModal';
import ConfirmationModal from './ConfirmationModal';
import ForwardToModal from './ForwardToModal';

const ModalManager = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const modalData = useSelector(selectModalData);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const renderModal = () => {
    switch (activeModal) {
      case MODAL_TYPES.CONFIRMATION:
        return (
          <ConfirmationModal
            isOpen={true}
            onClose={handleClose}
            onConfirm={modalData?.onConfirm}
            title={modalData?.title}
            message={modalData?.message}
            type={modalData?.type}
            confirmText={modalData?.confirmText}
            cancelText={modalData?.cancelText}
            isLoading={modalData?.isLoading}
          />
        );

      case MODAL_TYPES.FORWARD_TO:
        return (
          <ForwardToModal
            isOpen={true}
            onClose={handleClose}
            title={modalData?.title}
            onSubmit={modalData?.onSubmit}
            isLoading={modalData?.isLoading}
            options={modalData?.options}
          />
        );

      case MODAL_TYPES.CREATE_ITEM:
      case MODAL_TYPES.EDIT_ITEM:
      case MODAL_TYPES.DELETE_ITEM:
      case MODAL_TYPES.ACTION_MODAL:
        return (
          <GenericModal
            isOpen={true}
            onClose={handleClose}
            title={modalData?.title || 'Modal'}
            size={modalData?.size}
            className={modalData?.className}
          >
            {modalData?.content}
          </GenericModal>
        );

      default:
        return null;
    }
  };

  return renderModal();
};

export default ModalManager;
