import { useEffect, useId, useState } from 'react';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [createdGuest, setCreatedGuest] = useState('');
  const [updated, setUpdated] = useState('');

  const baseUrl = 'http://localhost:4000/guests';
  const id = useId();
  // to print out the guestList from API
  useEffect(() => {
    const fetchGuestList = async () => {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setGuestList(data);
      console.log(data);
    };
    fetchGuestList().catch((error) => console.log(error));
  }, []);

  // to add a creaatedGuest to API
  async function addGuest(event) {
    event.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          id: id,
        }),
      });
      const newGuest = await response.json();
      console.log(createdGuest);
      setUpdated(createdGuest);
      setGuestList([...guestList, newGuest]);
      console.log(guestList);
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.log(error);
    }
  }

  // const id = JSON.stringify(guestList.find((guest) => guest.id));
  // console.log(guestList.id);
  // const id = guestList.find((guest) => guest.id === { id });
  async function handleAttendingOnChange(attending) {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const guestUpdated = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  //  to control the remove button
  async function handleRemove() {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newList = [...guestList];
    setGuestList(newList.filter((guest) => guest.id !== id));
  }

  return (
    <div data-test-id="guest">
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
              id={guest.id}
              aria-label="attending"
              type="checkbox"
              checked={guest.attending}
              key={guest.id}
              onChange={(event) =>
                event.target.checked
                  ? handleAttendingOnChange(true)
                  : handleAttendingOnChange(false)
              }
            />
            <h3>
              {guest.firstName}&nbsp;{guest.lastName}
              &nbsp;is&nbsp; {guest.attending ? '' : 'not '}attending
            </h3>
            <button
              type="button"
              aria-label="Remove"
              //onClick={handleRemove(guest.id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <div>No guests</div>
      )}
    </div>
  );
}

export default App;
