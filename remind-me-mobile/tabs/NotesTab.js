import { useState, useRef } from 'react';
import { StyleSheet, Alert, TouchableOpacity, Text, Platform } from 'react-native';
import { styles } from '../App';

export default function NotesTab() {
    let notes = [];

    function formatDateTime(isoString) {
        const date = new Date(isoString);

        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }
    
    return (
        <View style = {styles.container}>
            <Text style = {styles.h1}>remind me</Text>


        </View>
    );
}