import React from 'react';

const ModalWrapper = ({ title, onClose, children, footer, showFooter = true }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        <div style={{padding: '20px 0'}}>
          {children}
        </div>
        {showFooter && footer}
      </div>
    </div>
  );
};

export default ModalWrapper;

