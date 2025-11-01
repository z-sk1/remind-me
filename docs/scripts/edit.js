async function editNote(id) {
    const title = prompt("New title?");
    const content = prompt("New content?");
    if (!title && !content) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (res.ok) {
        alert("Note updated!");
        getAllNotes();
    } else {
        alert(data.error || "Failed to update note");
    }
}

async function editReminder(id) {
    const title = prompt("New title?");
    const content = prompt("New content?");
    const due = prompt("New date? (dd/mm/yyyy) (HH:MM) (AM/PM)");
    if (!title && !content && !due);

    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/reminders/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, due: new Date(due).toISOString() }),
    });

    const data = await res.json();
    if (res.ok) {
        alert("Reminder updated!");
        getAllReminders();
    } else {
        alert(data.error || "Failed to update reminder");
    }
}