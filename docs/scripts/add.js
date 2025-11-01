async function saveNote() {
    const text = document.getElementById("noteText").value.trim();
    if (!text) return;

    const title = prompt("Enter a title? (optional)") || "";

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please sign in first!");
        return;
    }

    const res = await fetch(`${API_BASE}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            content: text,
        }),
    });

    const data = await res.json();
    if (res.ok) {
        alert("Note saved!");
        document.getElementById("noteText").value = "";
    } else {
        alert(data.error || "Failed to save note");
    }
}

async function saveReminder() {
    const text = document.getElementById("reminderText").value.trim();
    const date = document.getElementById("reminderDate").value;
    if (!text || !date) return;

    const title = prompt("Enter a title? (optional)") || "";
    
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please sign in first!");
        return;
    }

    const res = await fetch(`${API_BASE}/reminders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            content: text,
            due: new Date(date).toISOString(),
        }),
    });

    const data = await res.json();
    if (res.ok) {
        alert("Reminder saved!")
        document.getElementById("reminderText").value = "";
        document.getElementById("reminderDate").value = ""; 
    } else {
        alert(data.error || "Failed to save reminder");
    }
}