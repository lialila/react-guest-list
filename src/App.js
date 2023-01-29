// import './App.css';
// import { mainModule } from 'process';
import { startTransition, useEffect, useState } from 'react';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState(false);

  const baseUrl = 'http://localhost:4000/guests';
  // 'https://randomuser.me/api/';

  // to print out the guestList from API
  async function fetchGuestList(event) {
    event.preventDefault();
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setGuestList(data);
      console.log(data);
    } catch (error) {
      console.log('error');
    }
  }
  // to add a creaatedGuest to API
  const [createdGuest, setCreatedGuest] = useState('');
  const [updated, setUpdated] = useState('');
  async function addGuest(event) {
    event.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: { firstName },
          lastName: { lastName },
          status: false,
        }),
      });
      const createdGuest = await response.json();
      setUpdated(createdGuest);

      setFirstName('');
      setLastName('');
      console.log(createdGuest);
    } catch (error) {
      console.log('error');
    }
  }
  const guest = guestList[0];

  return (
    <>
      <h1>Guest List</h1>

      <form onSubmit={(addGuest, fetchGuestList)}>
        <label htmlFor="firstName">
          First name:
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
        </label>
        <br />
        <label htmlFor="lastName">
          Last name:
          <input
            // tabIndex={0}
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
          <p>Press 'Enter' to submit</p>
        </label>
        <button>Sumbit</button>
      </form>
      <h2>Guests: </h2>
      {guestList.length > 0 ? (
        guestList.map((guest) => (
          <div key={guest.id}>
            <input
              type="checkbox"
              checked={guest.status}
              key={guest.id}
              onChange={(event) => setStatus(event.currentTarget.checked)}
            />
            <h3>
              {guest.firstName.firstName}&nbsp;{guest.lastName.lastName}&nbsp;
              is&nbsp;{status ? '' : 'not'} attending
            </h3>
          </div>
        ))
      ) : (
        <div>No guests</div>
      )}
      <button type="button" aria-label="Remove">
        Remove
      </button>
    </>
  );
}

export default App;
