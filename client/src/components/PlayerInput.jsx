import React from "react";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import Swal from "sweetalert2";

const PlayerInput = ({ onSubmit, data, update, error }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pengalaman, setPengalaman] = React.useState("");
  const [level, setLevel] = React.useState(0);

  React.useEffect(() => {
    setUsername(data.username);
    setEmail(data.email);
    setPengalaman(data.pengalaman);
    setLevel(data.level);
  }, [data]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  if (error !== '') {
    Toast.fire({
      icon: 'warning',
      title: update === true ? 'Gagal mengupdate player' : 'Gagal menambahkan player'
    });
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Label className="text-center fs-3 mb-3 fw-bold">
          { update === true ? "Form Edit Player" : "Form Tambahkan Player" }
        </Form.Label>
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="@terserah"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="terserah@terserah.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Pengalaman</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="jangan terlalu serius yang penting di isi ya :)"
          value={pengalaman}
          onChange={(e) => setPengalaman(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Level</Form.Label>
        <Form.Range value={level} onChange={(e) => setLevel(e.target.value)} />
      </Form.Group>
      <FormGroup className="d-flex justify-content-center">
        { username && email && pengalaman && (
          <Button
            variant="primary"
            type="button"
            className="rounded-pill px-4 shadow"
            onClick={() => {
              onSubmit({ username, email, pengalaman, level })
              setUsername("");
              setEmail("");
              setPengalaman("");
              setLevel("0");
              Toast.fire({
                icon: 'success',
                title: update === true ? 'Berhasil mengupdate player' : 'Berhasil menambahkan player'
              });
            }}
          >
            { update === true ? "Update" : "Submit" }
          </Button>
        )}
      </FormGroup>
    </Form>
  );
};

export default PlayerInput;
