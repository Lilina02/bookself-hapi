let books = [];

const getAllBooksHandler = (request, h) => {
  return h.response({
    status: 'success',
    data: { books },
  }).code(200);
};

const addBookHandler = (request, h) => {
  const { title, author } = request.payload;
  if (!title || !author) {
    return h.response({ status: 'fail', message: 'Title dan author wajib diisi' }).code(400);
  }
  const id = Date.now();
  const newBook = { id, title, author };
  books.push(newBook);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id },
  }).code(201);
};

const editBookHandler = (request, h) => {
  const { id } = request.params;
  const { title, author } = request.payload;
  if (!title || !author) {
    return h.response({ status: 'fail', message: 'Title dan author wajib diisi' }).code(400);
  }
  const index = books.findIndex((book) => book.id === Number(id));
  if (index === -1) {
    return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
  }
  books[index] = { id: Number(id), title, author };
  return h.response({
    status: 'success',
    message: 'Buku berhasil diubah',
  }).code(200);
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === Number(id));
  if (index === -1) {
    return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
  }
  books.splice(index, 1);
  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

module.exports = {
  getAllBooksHandler,
  addBookHandler,
  editBookHandler,
  deleteBookHandler,
};
