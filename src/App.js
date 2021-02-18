import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const INSTRUCTORS_URL = 'https://api.onepeloton.com/api/instructor'

const getInstructors = async () => {
  const { data } = await axios.get(INSTRUCTORS_URL);
  return data;
};

function PelotonCard({instructor}) {
  return (
    <figure className="card">
      <img src={instructor.life_style_image_url} alt="cover" />
      <figcaption>
        <img
          src={instructor.image_url}
          alt="profile"
          className="profile"
        />
        <h3>
          {instructor.name}
          <span>{instructor.fitness_disciplines.join(', ')}</span>
        </h3>
        <p>{instructor.background.substring(0,100).concat('...')}</p>
      </figcaption>
    </figure>
  );
}

function App() {
  const [instructors, setInstructors] = useState([]);
  
  async function init() {
    const results = await getInstructors();
    setInstructors(results.data);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <h1>Peloton Instructors</h1>

      <div className="wrapper">
        {instructors.map((instructor) => (
          <PelotonCard instructor={instructor} key={instructor.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
