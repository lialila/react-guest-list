// import './App.css';
// import { mainModule } from 'process';
import { array } from 'prop-types';
import { startTransition, useEffect, useState } from 'react';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const baseUrl = 'http://localhost:4000/guests';

  // to print out the guestList from API
  async function fetchGuestList() {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setGuestList(data);
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
          firstName,
          lastName,
          status: false,
        }),
      });
      const createdGuest = await response.json();
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.log('error');
    }
  }
  fetchGuestList();
  const guest = guestList[0];

  // function handleRemove(id) {
  //   const newList = guestList.filter((guest) => guest.id !== id);
  //   setGuestList(newList);
  // }

  return (
    <>
      <h1>Guest List</h1>
      <form onSubmit={addGuest}>
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
          <div key={`guest-profile-${guest.id}`}>
            <input
              type="checkbox"
              checked={guest.isChecked}
              key={guest.id}
              onChange={(event) => setIsChecked(event.currentTarget.checked)}
            />
            <h3>
              {guest.firstName}&nbsp;{guest.lastName}
              &nbsp;is&nbsp;
              {isChecked ? '' : 'not '}attending
            </h3>
            <button
              type="button"
              aria-label="Remove"
              // onClick={handleRemove(guest.id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <div>No guests</div>
      )}
    </>
  );
}

export default App;
