import React from 'react';
import { Button } from '../ui/button';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-75 z-50"
            onClick={handleOverlayClick}
        >
            <div className="rounded-lg shadow-lg p-6 w-96 bg-background/70 border backdrop-blur-md">
                <h2 className="mb-2">Confirm Action</h2>
                <p className="text-lg font-semibold mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-600/80 text-white">
                        Confirm
                    </Button>
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;