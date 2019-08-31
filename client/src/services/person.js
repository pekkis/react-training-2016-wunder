import axios from "axios";

const getPersons = async () => {
  try {
    const ret = await axios.get(`${process.env.REACT_APP_API}/person`);
    return ret.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const firePerson = async (token, id) => {
  try {
    const ret = await axios.delete(
      `${process.env.REACT_APP_API}/person/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );
    return ret.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const hirePerson = async (token, person) => {
  try {
    const ret = await axios.post(
      `${process.env.REACT_APP_API}/person`,
      person,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );
    return ret.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default {
  getPersons,
  firePerson,
  hirePerson
};
