export const request = async (url, options) => {
  let jsonData;
  await fetch(url, options)
  .then(async (response) => {
    jsonData = await response.json()
  })
  .catch((err) => {
    console.error(err);
  })
  return jsonData
}

export const getNewData = async () => await request("/src/data/new_data.json");

export const getOldData = async () => await request("/src/data/new_data.json");