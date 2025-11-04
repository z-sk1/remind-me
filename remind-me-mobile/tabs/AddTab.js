import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { styles } from '../App';

export default function AddTab() {
    const [addNoteMenu, setAddNoteMenu] = useState(false);
    const [addReminderMenu, setAddReminderMenu] = useState(false);
    const [addNoteBtnFocussed, setAddNoteBtnFocused] = useState(false);
    const [addReminderBtnFocussed, setAddReminderBtnFocused] = useState(false);

    return (
        <View style = {styles.container}>
            <View>
                <Text style = {styles.h1}>remind-me</Text>
            </View>

            <TouchableOpacity
            style = {[styles.button, addNoteBtnFocused && styles.buttonPressed]}
            onPressIn = {(() => setAddNoteBtnFocused(true))}
            onPressOut = {() => setAddNoteBtnFocused(false)}
            onPress = {() => setAddNoteMenu(true)}
            >
                <Text style = {styles.buttonText}>Add Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {[styles.button, addReminderBtnFocused()]}>
                <Text style = {styles.buttonText}>Add Reminder</Text>
            </TouchableOpacity>
        </View>
    );

    async function saveNote() {
        
    }
}