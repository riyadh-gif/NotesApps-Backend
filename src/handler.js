const { nanoid } = require("nanoid");
const notes = require('./notes')
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title,tags,body,id,createdAt,updatedAt
  }

  notes.push(newNote)

  
  const existingNote = notes.find((note) => note.id === id)

  if (existingNote) {
    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil Ditambahkan',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  })
  response.code(500)
  return response
}
const getAllNotesHandler = () => ({
  status: 'success',
  data:{
    notes,
  },
});
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id) [0];
  if(note!== undefined){
    return {
      status: 'success',
      data : {
        note,
    },
  };
  }
  
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ada',
  });
  response.code(404);
  
  }
      const editNoteByIdHandler = (request, h) => {
      const { id } = request.params;
      const { title, tags, body } = request.payload;
      const updatedAt = new Date().toISOString();
      const index = notes.findIndex((note) => note.id === id);
    
      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          title,
          tags,
          body,
          updatedAt,
        };
    
        const response = h.response({
          status: 'success',
          message: 'Berhasil memperbarui catatan',
        });
        response.code(200);
        return response;
      } else {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui catatan, catatan tidak ditemukan',
        });
        response.code(404);
        return response;
      }
    }
    const deleteNoteByIdHandler = (request, h) => {
      const { id } = request.params;

      const index = notes.findIndex((note) => note.id === id);
    
      if(index !== -1){
        notes.splice(index, 1);

        const response = h.response({
          status:'success',
          message: 'Data berhasil dihapus',
        })
        response.code = 200
        return response;
      } else {
        const response = h.response({
          status:'fail',
          message: 'Data gagal dihapus',
        })
        response.code = 404
        return response;
        
      }
        
      }
     

    
    
    module.exports = { addNoteHandler,getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler,deleteNoteByIdHandler  }