import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ fetchContacts, editingContact, setEditingContact }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (editingContact) {
            setFormData(editingContact);
        }
    }, [editingContact]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingContact) {
                await axios.put(`http://localhost:5000/contacts/${editingContact._id}`, formData);
                setSnackbarMessage('Contact updated successfully!');
            } else {
                await axios.post('http://localhost:5000/contacts', formData);
                setSnackbarMessage('Contact added successfully!');
            }
            setSnackbarSeverity('success');
            fetchContacts();
            resetForm();
        } catch (error) {
            console.error("Error saving contact:", error);
            setSnackbarMessage('Error saving contact. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const resetForm = () => {
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
        setEditingContact(null);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#f9f9f9',
                maxWidth: 400,
                margin: 'auto',
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </Typography>
            {['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle'].map((field) => (
                <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    fullWidth
                />
            ))}
            <Button variant="contained" color="primary" type="submit">
                {editingContact ? 'Update Contact' : 'Add Contact'}
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactForm;