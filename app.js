// Fetch and display notes
async function fetchNotes() {
  try {
    const res = await fetch('http://localhost:5000/notes');
    if (!res.ok) throw new Error('Network response was not OK');
    const notes = await res.json();
    const container = document.getElementById('notesContainer');
    if (!container) {
      alert('Notes container element not found');
      return;
    }
    container.innerHTML = notes.map(n => `<p><b>${escapeHtml(n.title)}</b>: ${escapeHtml(n.content)}</p>`).join('');
  } catch (err) {
    alert('Error fetching notes: ' + err.message);
  }
}

// Add a new sample note
async function addNote(note) {
  try {
    const res = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (res.ok) {
      alert('Note added');
      // Optionally refresh notes after adding
      fetchNotes();
    } else {
      alert('Failed to add note');
    }
  } catch (err) {
    alert('Failed to add note: ' + err.message);
  }
}

// Upload file to Cloudinary via backend
async function uploadFile(file) {
  if (!file) {
    alert('No file selected');
    return;
  }
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Upload request failed');
    const data = await res.json();
    if (data.secure_url) {
      alert('File uploaded: ' + data.secure_url);
    } else {
      alert('Upload succeeded but no file URL returned');
    }
  } catch (err) {
    alert('Upload failed: ' + err.message);
  }
}

// Simple function to escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
}

// Event listeners for buttons and file input, safely checking element existence
document.getElementById('fetchNotesBtn')?.addEventListener('click', fetchNotes);

document.getElementById('addNoteBtn')?.addEventListener('click', () => {
  addNote({ title: 'Sample Note', content: 'This is a test note.' });
});

document.getElementById('fileInput')?.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    uploadFile(e.target.files[0]);
  }
});
