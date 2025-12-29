import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const END_POINT = "/photos/random";
const KEY = "bu_JKAl_lZPuCZOelq500Lo7v1tUUpacLrjWDkF-69M";

async function getPictureWithValue(value, page, count = 8) {
  const result = await axios.get(`${END_POINT}`, {
    params: {
      client_id: KEY,
      query: value,
      orientation: "landscape",
      asset_type: "photo",
      page,
      count,
    },
  });
  return result;
}

export default getPictureWithValue;
