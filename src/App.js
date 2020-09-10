import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Input } from '@material-ui/core';
import Message from './Components/Message';
import db from './Components/Firebase.config';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core'

function App() {

  const [input, setInput] = useState('');
  const [massages, setMassages] = useState([]);
  const [userName, setUserName] = useState('');


  useEffect(() => {
    db.collection('massages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMassages(snapshot.docs.map(doc => ({ id: doc.id, massage: doc.data() })))
      })
  }, [])

  useEffect(() => {
    setUserName(prompt('Please enter your name'));
  }, [])


  const sendMassage = (e) => {
    e.preventDefault();

    // Pushing firebase store

    db.collection('massages').add({
      massage: input,
      userName: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');// This use for when click the button the input value will be empty
  }

  return (

    <div className="App">
      <img src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100' />
      <h2>Welcome {userName} </h2>

      <form className="app__form">

        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={e => setInput(e.target.value)} />

          <IconButton className="app__iconButton" disabled={!input} variant='contained' color='primary' type="submit" onClick={sendMassage}>
            <SendIcon />

          </IconButton>

        </FormControl>

      </form>

      <FlipMove>
        {
          massages.map(({ id, massage }) => (
            <Message key={id} userName={userName} massage={massage} />
          ))
        }
      </FlipMove>

    </div >
  );
}

export default App;



