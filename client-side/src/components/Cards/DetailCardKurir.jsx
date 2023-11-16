import React from 'react';
import Modal from 'react-modal';

const DetailCardKurir = ({ show, handleClose, data }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      contentLabel="Detail Card"
    >
      <h2>Detail Informasi</h2>
      <p>Nama Kurir:{data.nama}</p>
      <p>Alamat:</p>
      <p>No. HP:</p>
      <button onClick={handleClose}>Tutup</button>
    </Modal>
  );
};

export default DetailCardKurir;
