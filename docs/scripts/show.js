function showNotes() {
    const container = document.getElementById("notesList");
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    if (notes.length === 0) {
        container.innerHTML = "<p>No notes yet.</p>";
        return;
    }

    container.innerHTML = "";
    notes.forEach((note, idx) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <p>${note.text}</p>
            <small>Saved on: ${note.date}</small>
            <button onclick = "deleteNote(${idx})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function showReminders() {
    const container = document.getElementById("remindersList");
    const reminders = JSON.parse(localStorage.getItem("reminders") || "[]");

    if (reminders.length === 0) {
        container.innerHTML = "<p>No reminders yet.</p>";
        return;
    }

    container.innerHTML = "";
    reminders.forEach((reminder, idx) => {
        const div = document.createElement("div");
        div.className = "reminder";
        div.innerHTML = `
            <p>${reminder.text}</p>
            <small>For: ${reminder.date}</small>
            <small>Saved on: ${reminder.saveDate}</small>
            <button onclick = "deleteReminder(${idx})">Delete</button>
        `;
        container.appendChild(div);
    })
}