import React, {useState, useEffect} from 'react'
import {FaEnvelopeOpen,FaUser, FaCalendarTimes, 
        FaMap, FaPhone,FaLock,} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {

  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)

  const fetchPerson = async () => {

    const res = await fetch(url)
    const data = await res.json()
   // console.log(data);
    const person = data.results[0]
    console.log(person);

    const {email, phone, dob:{age}, login:{password}, picture:{medium:image} } = person;
    const {location:{street:{number, name:streetName}}} = person
    const adress = `${number} ${streetName} `
    const {name:{first, last}} = person
    const name =`${first} ${last}`
    const newPerson = {email, phone, age, adress, password, name, image}
    
    setPerson(newPerson)
    setLoading(false)
  }

  useEffect(() => {
    fetchPerson()
  }, [])
  
  console.log(person);

  if(loading) return <h2>Loading ...</h2>

  return (
    <main>
      <div className="block bcg-black"> </div>
      <div className="block">

        <div className="container">
          <img src={(person && person.image) || defaultImage} alt="user img" />
          <p className="user-title">my name is</p>
          <p className="user-value">{person.name}</p>

          <div className="values-list">
            <button className="icon">
              <FaUser/>
            </button>
            <button className='icon' >                   
                <FaEnvelopeOpen/>
            </button>
            <button className='icon' >               
                <FaCalendarTimes/>
            </button>
            <button className='icon'>      
                <FaMap/>
            </button>
            <button className='icon'> 
                <FaPhone/>
            </button>
            <button className='icon'  >     
                <FaLock/>
            </button>
          </div>

          <button className="btn"
                  onClick={fetchPerson}
          >
            Random User
          </button>

        </div>
    
      </div>
    </main>
  );
}

export default App;
