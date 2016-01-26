import React from 'react';
import CloseButton from './closeButton';

const EncryptionViewer = ({id, content, onClose}) => {
  const blob = new Blob([content], {type: 'text/plain'});
  const url = URL.createObjectURL(blob)
  return (
    <div className="modal-container">
      <article className="encryption-viewer">
        <header className="encryption-viewer__header">
          <h1 className="title">Encrypted Note</h1>
          <CloseButton light={true} onClose={() => onClose()} />
        </header>
        <a href={url} download={`${id}.txt`} className="encryption-viewer__export-button">Export Note</a>
        <pre className="encryption-viewer__content">{content}</pre>
      </article>
    </div>
  );
}

export default EncryptionViewer;