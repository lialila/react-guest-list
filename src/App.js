// import './App.css';
// import { mainModule } from 'process';
import { useEffect, useState } from 'react';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [refetch, setRefetch] = useState(true);

  const baseUrl = 'http://localhost:4000';
  // 'https://randomuser.me/api/?results=10';
  //to print out the guests
  // useEffect(() => {
  //   async function fetchGuestList() {
  //     const response = await fetch(baseUrl);
  //     const data = await response.json();
  //     console.log(data);
  //     setGuestList(data.results);
  //   }

  //   fetchGuestList().catch((error) => console.log(error));
  // }, [refetch]);

  // to add a new guest
  const [createdGuest, setCreatedGuest] = useState('');
  const [updated, setUpdated] = useState('');

  useEffect(() => {
    async function handleOnKeyDown(event) {
      // if (event.key === 'Enter'){

      event.preventDefault();
      // const guest = { firstName, lastName };
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
      });
      const createdGuest = await response.json();
      setUpdated(createdGuest);
    }
    handleOnKeyDown().catch((error) => console.log(error));
  }, [refetch]);

  return (
    <>
      <h1>Guest List</h1>
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
          // onKeyDown={() => handleOnKeyDown()}
        />
        <button onClick={(event) => handleOnKeyDown()}>Submit</button>
        <button
          onClick={() => setRefetch(refetch)}
          // onSubmit={() =>handleOnKeyDown}
        >
          Refetch
        </button>
      </label>
      {guestList.map((guest) => {
        return (
          <ul key={`guest-profile-${guest.id.value}`}>
            <li>
              {guest.firstName}
              {guest.lastName}
            </li>
          </ul>
        );
      })}
      <p>Press 'Enter' to submit</p>
      <button aria-label="Remove">Remove</button>
    </>
  );
}

export default App;
