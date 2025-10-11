function saveNote() {
    const text = document.getElementById("noteText").value.trim();
    if (!text) return;
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push({ text, date: new Date().toLocaleString() });
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Note saved!");
    document.getElementById("noteText").value = "";
}

function saveReminder() {
    const text = document.getElementById("reminderText").value.trim();
    const date = document.getElementById("reminderDate").value;
    if (!text || !date) return;
    const reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
    reminders.push({ text, date, saveDate: new Date().toLocaleString() });
    localStorage.setItem("reminders", JSON.stringify(reminders));
    alert("Reminder saved!");
    document.getElementById("reminderText").value = "";
    document.getElementById("reminderDate").value = ""; 
}