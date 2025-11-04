import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../App';

export default function AddTab() {
    const [addNoteMenu, setAddNoteMenu] = useState(false);
    const [addReminderMenu, setAddReminderMenu] = useState(false);
    const [addNoteBtnFocused, setAddNoteBtnFocused] = useState(false);
    const [addReminderBtnFocused, setAddReminderBtnFocused] = useState(false);
    const [saveNoteBtnFocused, setSaveNoteBtnFocused] = useState(false);
    const [saveReminderBtnFocused, setSaveReminderBtnFocused] = useState(false);
    const [noteContentTxtFocused, setNoteContentTxtFocused] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [reminderContentTxtFocused, setReminderContentTxtFocused] = useState(false);
    const [reminderContent, setReminderContent] = useState('');
    const [reminderTitle, setReminderTitle] = useState('');
    const [reminderDate, setReminderDate] = useState('');

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
        
    }
}