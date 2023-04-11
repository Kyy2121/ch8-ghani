import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { MdModeEditOutline, MdDelete } from 'react-icons/md';

const PlayerList = ({
  username,
  email,
  pengalaman,
  level,
  onDelete,
  onUpdate,
}) => {
  return (
    <Card className="border-0 shadow">
      <Card.Header className="d-flex justify-content-between fs-4 fw-bold border-0 shadow">
          {username}
          <Badge bg="primary" className="rounded-5 p-2 shadow">{level}</Badge>
        </Card.Header>
      <Card.Body>
        <Card.Subtitle>{email}</Card.Subtitle>
        <Card.Text>{pengalaman}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center gap-1 border-0 shadow">
        <Button 
          variant="success" 
          size="sm" 
          onClick={() => onUpdate(username)} 
          className='d-flex align-items-center rounded-pill px-3'
        >
          <MdModeEditOutline />{' '}Edit
        </Button>{" "}
        <Button 
          variant="danger" 
          size="sm" 
          className='d-flex align-items-center rounded-pill px-3'
          onClick={() => {
            Swal.fire({
              title: 'Kamu yakin?',
              text: "Kamu akan menghapus player ini!!!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ya, Hapus saja',
              cancelButtonText: 'Batal'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Terhapus!',
                  'Player berhasil di hapus',
                  'success'
                )
                onDelete(username);
              }
            })
          }}
        >
          <MdDelete />{' '}Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PlayerList;
