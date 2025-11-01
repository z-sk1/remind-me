let notes = [];
let reminders = [];

function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Use browser locale and formatting options
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

async function getAllNotes() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/notes`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    notes = data.notes;
    showNotes();
}

async function getAllReminders() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/reminders`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    reminders = data.reminders;
    showReminders();
}

function showNotes() {
    const container = document.getElementById("notesList");

    container.innerHTML = "";
    console.log("Notes data:", notes);
    notes.forEach((note, idx) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>Saved on: ${formatDateTime(note.created_at)}</small><br>
            <button onclick = "deleteNote(${note.id})">Delete</button>
            <button onclick = "editNote(${note.id})">Edit</button>
        `;
        container.appendChild(div);
    });
}

function showReminders() {
    const container = document.getElementById("remindersList");

    container.innerHTML = "";
    reminders.forEach((reminder, idx) => {
        const div = document.createElement("div");
        div.className = "reminder";
        div.innerHTML = `
            <h3>${reminder.title}</h3>
            <p>${reminder.content}</p>
            <small>For: ${formatDateTime(reminder.due)}</small><br>
            <small>Saved on: ${formatDateTime(reminder.created_at)}</small><br>
            <button onclick = "deleteReminder(${reminder.id})">Delete</button>
            <button onclick = "editReminder(${reminder.id})">Edit</button>
        `;
        container.appendChild(div);
    })
}