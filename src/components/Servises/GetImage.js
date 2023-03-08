import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '32953731-49831efe322ba9b62a64ecdff';

export const getImage = async (imageName, page = 1) => {
  const response =
    await axios.get(`${BASE_URL}q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12
`);
  const data = await response.data;
  return data;
};
