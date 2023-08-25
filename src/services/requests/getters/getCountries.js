import apiClient from "../../axios/axios";

export default async function getCountries() {
  try {
    const endpoint = "https://restcountries.com/v3.1/all";
    const response = await apiClient.get(endpoint);
    const countries = response.data
      .map((country) => {
        return { name: country.name.common, flag: country.flags.svg };
      })
      .sort((a, b) => (a.name > b.name ? 1 : -1));

    console.log(countries);
    return countries;
  } catch (e) {
    console.log(e);
  }
}
