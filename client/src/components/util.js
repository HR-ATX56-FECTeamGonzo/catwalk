import axios from 'axios';
import GITHUB_API_KEY from '../config/config.js';

const trackClick = (element, widget) => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  const time = Date();

  axios.post(
    `${url}/interactions`,
    { element, widget, time },
    { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } }
  )
    .then(console.log('successfully posted to interactions api:', element, ', ', widget, ', ', time))
    .catch(err => console.log(err));

};

export default trackClick;