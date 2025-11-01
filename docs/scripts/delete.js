async function deleteNote(id) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please log in first!");
        return;
    }

    const res = await fetch(`${API_BASE}/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (res.ok) {
        console.log("Note deleted successfully!")
        getAllNotes();
    } else {
        const data = await res.json();
        alert("Failed to delete note:", data.error || res.StatusText);
    }
}

async function deleteReminder(id) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        alert("Please log in first!");
        return;
    }

    const res = await fetch(`${API_BASE}/reminders/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (res.ok) {
        console.log("Reminder deleted successfully!")
        getAllReminders();
    } else {
        const data = await res.json();
        alert("Failed to delete reminder:", data.error || res.StatusText);
    }
}