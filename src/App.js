import './App.css';
// import { mainModule } from 'process';
import { useState } from 'react';

function App() {
  const baseUrl = 'http://localhost:4000';

  async function fetchGuestlist() {
    const response = await fetch(`${baseUrl}/guests`);
    const guests = await response.json();
  }

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [newGuest, setNewGuest] = useState('');
  const [updated, setUpdated] = useState('');

  async function handleOnKeyDown(event) {
    if (event.key === 'Enter') {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: { firstName },
          lastName: { lastName },
        }),
      });
      const createdGuest = await response.json();
      setUpdated(newGuest);
    }
  }

  const [guestList, setGuestList] = useState();
  setGuestList(guests);
  const guest = guests[0];

  return (
    <div>
      <h1>Guest List</h1>
      <label>
        First name
        <input
          value={guest.firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
      </label>
      <label>
        Last name
        <input
          value={guest.lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
          onKeyDown={() => handleOnKeyDown()}
        />
        {guests.map((guest) => {
          return (
            <div key={guest.id}>
              {guest.firstName} {guest.lastName}
            </div>
          );
        })}
      </label>
      <button aria-label="Remove">Remove</button>
    </div>
  );
}

export default App;
