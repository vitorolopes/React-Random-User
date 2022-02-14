import React, {useState, useEffect} from 'react'
import {FaEnvelopeOpen,FaUser, FaCalendarTimes, 
        FaMap, FaPhone,FaLock,} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {

  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState("name")
  const [value, setValue] = useState("random person")

  console.log(person);

  const fetchPerson = async () => {

    const res = await fetch(url)
    const data = await res.json()
    const person = data.results[0]

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
  
  const handleValue = (e) => {
    console.log(e.target)
    if(e.target.classList.contains("icon")){
      const newValue= e.target.dataset.label
      console.log(newValue);
      setTitle(newValue)
      setValue(person[newValue])
    }
  }

  if(loading) return <h2>Loading ...</h2>

  return (
    <main>
      <div className="block bcg-black"> </div>
      <div className="block">

        <div className="container">
          <img src={(person && person.image) || defaultImage} alt="user img" />

          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>

          <div className="values-list">
            <button className="icon"
                    onMouseOver={handleValue}
                    data-label="name"
            >
              <FaUser/>
            </button>
            <button className='icon'
                     onMouseOver={handleValue}
                     data-label="email"
            >                   
                <FaEnvelopeOpen/>
            </button>
            <button className='icon' 
                     onMouseOver={handleValue}
                     data-label="age"
            >               
                <FaCalendarTimes/>
            </button>
            <button className='icon'
                     onMouseOver={handleValue}
                     data-label="adress"
            >      
                <FaMap/>
            </button>
            <button className='icon'
                     onMouseOver={handleValue}
                     data-label="phone"
            > 
                <FaPhone/>
            </button>
            <button className='icon'
                     onMouseOver={handleValue}
                     data-label="password"
            >     
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
