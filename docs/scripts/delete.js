function deleteNote(idx) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.splice(idx, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function deleteReminder(idx) {
    const reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
    reminders.splice(idx, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    showReminders();
}