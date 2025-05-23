function toUserDTO(user) {
  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    address: user.address || '',
    subject: user.subject || '',
    classId: user.classId || '',
    qualifications: user.qualifications || '',
    subjectSelection: user.subjectSelection || [],
    role: user.role,
    emailVerified: user.emailVerified,
    createdDate: user.createdAt, 
  };
}

module.exports = { toUserDTO };
