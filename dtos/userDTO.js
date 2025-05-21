function toUserDTO(user) {
  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    classId: user.classId,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
}

module.exports = { toUserDTO };
