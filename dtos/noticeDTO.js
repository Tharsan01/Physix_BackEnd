function toNoticeDTO(notice) {
  return {
    id: notice._id,
    title: notice.title,
    status: notice.status,
    imageUrl: notice.imageUrl,
    createdAt: notice.createdAt,
    updatedAt: notice.updatedAt,
  };
}

module.exports = {
  toNoticeDTO,
};
