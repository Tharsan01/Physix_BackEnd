// dtos/userDTO.js
function toUserDTO(user) {
  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    batchNumber: user.batchNumber,
    address: user.address || '',
    subject: user.subject || '',
    qualifications: user.qualifications || '',
    subjectSelection: user.subjectSelection || [],
    imageUrl: user.imageUrl || null,
    role: user.role,
    emailVerified: user.emailVerified,
    createdDate: user.createdAt, 
  };
}

module.exports = { toUserDTO }; // ✅ Export it correctly
