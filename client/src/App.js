import React from 'react';
import { Card, Col, Container, Row, Alert, Button } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import PlayerInput from './components/PlayerInput';
import PlayerList from './components/PlayerList';
import SearchBar from './components/SearchBar';
import { FaUsers } from 'react-icons/fa';

const App = () => {
  const [players, setPlayers] = React.useState([]); // menampung semua players
  const [error, setError] = React.useState(''); // menampung message error
  const [playerUp, setPlayerUp] = React.useState({}); // menampung data player yang ingin diedit
  const [update, setUpdate] = React.useState(false); // menampung nilai true/false update
  const [playersFilter, setPlayersFilter] = React.useState([]); // menampung player terfilter
  const [basedOn, setBasedOn] = React.useState('Username'); // menampung nilai kategori filter
  const [keyword, setKeyword] = React.useState(''); // menampung keyword dari search bar 

  const onSubmitHandler = (player) => {
    if (update === true) {
      const newPlayers = players.map((row) => row.username === playerUp.username ? { ...player } : row);
      setPlayers(newPlayers);
      setPlayerUp({});
      setUpdate(false);
    } else {
      const isFind = players.find((row) => row.username === player.username || row.email === player.email)
      if (!isFind) {
        setPlayers([...players, player]);
      } else {
        setError('Maaf username atau email sudah ada!!!');
        setTimeout(() => {
          setError('');
        }, 2000);
      }
    }
  }

  const onDeleteHandler = (params) => {
    const newPlayers = players.filter((row) => row.username !== params);
    setPlayers(newPlayers);
  }

  const onUpdateHandler = (params) => {
    const isFind = players.find((row) => row.username === params);
    setPlayerUp(isFind);
    setUpdate(true);
  }

  const onSearchHandler = () => {
    const filtered = players.filter((row) => {
      switch (basedOn) {
        case 'Username':
          return row.username.toLowerCase().includes(
            keyword.toLowerCase()
          );
        case 'Email':
          return row.email.toLowerCase().includes(
            keyword.toLowerCase()
          );
        case 'Pengalaman':
          return row.pengalaman.toLowerCase().includes(
            keyword.toLowerCase()
          );
        case 'Level':
          return row.level.includes(
            parseInt(keyword)
          );
        default:
          return basedOn
      }
    })

    if (filtered.length === 0) {
      setError(`Maaf tidak ada player dengan kata kunci "${keyword}" berdasarkan pencarian "${basedOn}"`);
      setTimeout(() => {
        setError('');
      }, 3000);
    }

    setPlayersFilter(filtered);
    setKeyword('');
    setBasedOn('Username');
  }

  return (
    <>
      <NavigationBar />
      <Container className='d-grid gap-4'>
        <Row className='d-flex justify-content-center'>
          <Card className='p-4 mt-4 w-50 border-0 shadow'>
            <PlayerInput onSubmit={onSubmitHandler} data={playerUp} update={update} error={error} />
          </Card>
        </Row>
        <Row className='d-flex justify-content-center'>
          { error && (
            <Alert variant='danger' className='w-50'>
              {error}
            </Alert>
          )}
        </Row>
        <Row className='d-flex justify-content-center'>
          <SearchBar
            basedOn={basedOn}
            setBasedOn={setBasedOn}
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={onSearchHandler}
          />
        </Row>
        <Row className='d-grid justify-content-center'>
          <Button variant="outline-secondary" onClick={() => setPlayersFilter([])} className='d-flex gap-1 align-items-center'>
            <FaUsers />{' '}Semua Player
          </Button>
        </Row>
        <Row lg={4}>
          { playersFilter.length > 0
            ? playersFilter.map((data, i) => {
              return (
                <Col className='mb-4 d-grid' key={i} >
                  <PlayerList
                    {...data}
                    onDelete={onDeleteHandler}
                    onUpdate={onUpdateHandler}
                  />
                </Col>
              )
            })
            : players.map((data, i) => {
              return (
                <Col className='mb-4 d-grid' key={i}>
                  <PlayerList
                    {...data}
                    onDelete={onDeleteHandler}
                    onUpdate={onUpdateHandler}
                  />
                </Col>
              )
            })}
          { players.length === 0 && (
            <Container className='w-50 fs-5 fw-bold text-center'>
              Data Player kosong!!!
            </Container>
          )}
        </Row>
      </Container>
    </>
  )
}

export default App;