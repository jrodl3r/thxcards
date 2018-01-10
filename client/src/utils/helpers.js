module.exports = {
  handleErrors: (res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  }
}
