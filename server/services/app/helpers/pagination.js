module.exports = (page, size) => {
  try {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  } catch (error) {
    console.log(error);
  }
};
