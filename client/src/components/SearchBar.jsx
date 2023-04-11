import React from "react";
import { InputGroup, Form, SplitButton, Dropdown } from "react-bootstrap";

const SearchBar = ({ basedOn, setBasedOn, keyword, setKeyword, onSearch }) => {
  const based = ["Username", "Email", "Pengalaman", "Level"];

  return (
    <InputGroup className="mb-1 w-50">
      <Form.Control
        aria-label="Text input with dropdown button"
        placeholder={`Cari berdasarkan ${basedOn}`}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SplitButton
        variant="success"
        title={basedOn}
        id="input-group-dropdown-2"
        align="end"
        onClick={() => onSearch()}
      >
        { based.map((row, i) => {
          return (
            <Dropdown.Item key={i} onClick={() => setBasedOn(row)}>
              {row}
            </Dropdown.Item>
          )
        })}
      </SplitButton>
    </InputGroup>
  );
};

export default SearchBar;
