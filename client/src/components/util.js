import axios from 'axios';
import GITHUB_API_KEY from '../config/config.js';

const trackClick = (element, widget) => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  const time = Date();

  axios.post(
    `${url}/interactions`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } },
    { element, widget, time }
  )
    .then(console.log('successfully posted'))
    .catch(console.log(err));

};

export default trackClick;