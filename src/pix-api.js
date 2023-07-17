import { axios } from "axios";

const key = '38275146-a8c943300a1dc55355fc8288e';
const BASE_URL = 'https://pixabay.com/api/';
export let perPage = 40;

export  async function  fetchPhoto (searchParam, currentPage) {
 const resp = await fetch(
    `${BASE_URL}?key=${key}&q=${searchParam}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`
  );
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return await resp.json();
}
