import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { styles, API_BASE } from '../App';
import DateTimePicker from '@react-native-community/datetimepicker'

export default function AddTab() {
    const [addNoteMenu, setAddNoteMenu] = useState(false);
    const [addReminderMenu, setAddReminderMenu] = useState(false);
    const [addNoteBtnFocused, setAddNoteBtnFocused] = useState(false);
    const [addReminderBtnFocused, setAddReminderBtnFocused] = useState(false);
    const [saveNoteBtnFocused, setSaveNoteBtnFocused] = useState(false);
    const [saveReminderBtnFocused, setSaveReminderBtnFocused] = useState(false);
    const [noteContentTxtFocused, setNoteContentTxtFocused] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const [noteBackBtnFocused, setNoteBackBtnFocused] = useState(false);
    const [reminderContentTxtFocused, setReminderContentTxtFocused] = useState(false);
    const [reminderContent, setReminderContent] = useState('');
    const [reminderDateBtnFocused, setReminderDateBtnFocused] = useState(false);
    const [reminderDateShow, setReminderDateShow] = useState(false);
    const [reminderDate, setReminderDate] = useState(new Date());
    const [reminderBackBtnFocused, setReminderBackBtnFocused] = useState(false);

    return (
        <View style = {styles.container}>
            <View>
                <Text style = {styles.h1}>remind-me</Text>
            </View>

        {addNoteMenu ? (
            <View style = {styles.inputGroup}>
                <TextInput
                    style = {[styles.textInput, noteContentTxtFocused && styles.textInputFocused]}
                    onFocus = {(() => setNoteContentTxtFocused(true))}
                    onBlur = {(() => setNoteContentTxtFocused(false))}
                    placeholder = "Type in the note's content..."
                    value = {noteContent}
                    onChangeText = {setNoteContent}
                />

                <TouchableOpacity
                style = {[styles.button, saveNoteBtnFocused && styles.buttonPressed]}
                onPressIn = {(() => setSaveNoteBtnFocused(true))}
                onPressOut = {(() => setSaveNoteBtnFocused(false))}
                onPress = {saveNote}
                >
                    <Text style = {styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {[styles.button, noteBackBtnFocused && styles.buttonPressed]}
                onPressIn = {() => setNoteBackBtnFocused(true)}
                onPressOut = {(() => setNoteBackBtnFocused(false))}
                onPress = {() => {
                    setAddNoteMenu(false);
                    setAddReminderMenu(false);
                }}
                >
                    <Text style = {styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>

        ) : addReminderMenu ? (
            <View style = {styles.inputGroup}>
                <TextInput
                    style = {[styles.textInput, reminderContentTxtFocused && styles.textInputFocused]}
                    onFocus = {(() => setReminderContentTxtFocused(true))}
                    onBlur = {(() => setReminderContentTxtFocused(false))}
                    placeholder = "Type in the reminder's content..."
                    value = {reminderContent}
                    onChangeText = {setReminderContent}
                />

                <TouchableOpacity
                style = {[styles.button, reminderDateBtnFocused && styles.buttonPressed]}
                onPressIn = {() => setReminderDateBtnFocused(true)}
                onPressOut = {() => setReminderDateBtnFocused(false)}
                onPress = {() => setReminderDateShow(true)}
                >
                    <Text style = {styles.buttonText}>Date & Time</Text>
                </TouchableOpacity>

                {reminderDateShow && (
                    <DateTimePicker
                        value = {reminderDate}
                        mode = "datetime"
                        display = {Platform.OS === "ios" ? "inline" : "default"}
                        onChange= {(event, selectedDate) => {
                            if (date === undefined) return;
                            
                            setReminderDateShow(false);
                            setReminderDate(selectedDate);
                        }}
                    />
                )}

                <TouchableOpacity
                style = {[styles.button, saveReminderBtnFocused && styles.buttonPressed]}
                onPressIn = {() => setSaveReminderBtnFocused(true)}
                onPressOut = {() => setSaveReminderBtnFocused(false)}
                onPress = {saveReminder}
                >
                    <Text style = {styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {[styles.button, reminderBackBtnFocused && styles.buttonPressed]}
                onPressIn = {() => setReminderBackBtnFocused(true)}
                onPressOut = {() => setReminderBackBtnFocused(false)}
                onPress = {() => {
                    setAddNoteMenu(false);
                    setAddReminderMenu(false);
                }}
                >
                    <Text style = {styles.buttonText}>Back</Text>
                </TouchableOpacity>

            </View>

        ) : (
            <View>
                <TouchableOpacity
                style = {[styles.button, addNoteBtnFocused && styles.buttonPressed]}
                onPressIn = {(() => setAddNoteBtnFocused(true))}
                onPressOut = {() => setAddNoteBtnFocused(false)}
                onPress = {(() => setAddNoteMenu(true))}
                >
                    <Text style = {styles.buttonText}>Add Note</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {[styles.button, addReminderBtnFocused && styles.buttonPressed]}
                onPressIn = {(() => setAddReminderBtnFocused(true))}
                onPressOut = {(() => setAddReminderBtnFocused(false))}
                onPress = {(() => setAddReminderMenu(true))}
                >
                    <Text style = {styles.buttonText}>Add Reminder</Text>
                </TouchableOpacity>
            </View>

        )}
        </View>
    );

    async function saveNote() {
        const text = noteContent.trim()

        if (!text) {
            Alert.alert("Missing content!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            Alert.alert("Please login first!");
            return;
        }

        const title = Alert.prompt("Enter a title? (optional)") || "";

        const res = await fetch(`${API_BASE}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                content: text,
            })
        });

        const data = await res.json();
        if (res.ok) {
            Alert.alert("Note saved!")
            setNoteContent('');
        } else {
            Alert.alert(data.error || "Failed to save note")
        }
    }

    async function saveReminder() {
        const text = reminderContent.trim()
        const date = reminderDate;

        if (!text || !date) {
            Alert.alert("Missing content or date!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            Alert.alert("Please login first!");
            return;
        }

        const title = Alert.prompt("Enter a title? (optional)");

        const res = await fetch(`${API_BASE}/reminders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                content: text,
                date: new Date(date).toISOString()
            }),
        });

        const data = await res.json();
        if (res.ok) {
            Alert.alert("Reminder saved!");
            setReminderContent('');
            setReminderDate(new Date());
        } else {
            Alert.alert(data.error || "Failed to save reminder!");
        }
    }
}