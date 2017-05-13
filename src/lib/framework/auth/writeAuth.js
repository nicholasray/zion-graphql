function createIfAuthorized(input, user, dao) {
    if (user.isAdmin()) {
      return dao.create(input);
    }

    throw new Error("Unauthorized to perform this action.");
}

function updateIfAuthorized(id, input, user, dao) {
  console.log("wtf*********", user)
    if (user.isAdmin()) {
      return dao.update(id, input);
    }

    throw new Error("Unauthorized to perform this action.");
}

function deleteIfAuthorized(id, user, dao) {
    if (user.isAdmin()) {
      return dao.delete(id);
    }

    throw new Error("Unauthorized to perform this action.");
}

module.exports = {
  createIfAuthorized,
  updateIfAuthorized,
  deleteIfAuthorized
}
