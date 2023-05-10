const users = [];

exports.getUsers = () => {
  return users;
}

exports.setUser = (data) => {
  users.push(data);
  return users;
}

exports.findUserById = (phone) => {
  return users.filter(user => user.phone_number === phone);
}