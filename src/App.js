import { request } from 'http';
import { useEffect, useState } from 'react';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [createdGuest, setCreatedGuest] = useState('');
  const [updated, setUpdated] = useState('');
  // const [checkedState, setCheckedState] = useState(false);

  const baseUrl = 'http://localhost:4000/guests';

  // to print out the guestList from API
  useEffect(() => {
    const fetchGuestList = async () => {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setGuestList(data);
      console.log(data);
    };
    // (error)
    // console.log('error');
    // }
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
          lastName: lastName
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

  // change the guest.attending in API
  async function updateGuestAttending(attending) {
    if(checked) put request attending=true
    esle{attending=false}
    try {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attending),
      });
      const updatedGuest = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  // to control the remove button
  // function handleRemove() {
  // const response = await fetch(`${baseUrl}/guests/${id}`, { method: 'DELETE' });
  // const deletedGuest = await response.json();}

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
              onChange = ((event) => setIsAttending(event.currentTarget.checked)

                    ? updateGuestAttending(true)

                    : updateGuestAttending(false),
              }}  />
            <h3>
              {guest.firstName}&nbsp;{guest.lastName}
              &nbsp;is&nbsp; {isChecked ? '' : 'not '}attending
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
    </div>
  );
}

export default App;

onChange={handleOnChange}
const handleOnChange =(event) => {
 // const dicision = false;
 event.currentTarget.checked
  if (event.currentTarget.checked){
    put request({attending:true})
  }else{
    put request({attending:false})
  }
}
