import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import axios from 'axios';

const ContactsTable = ({ fetchTrigger, setEditingContact }) => {
    const [contacts, setContacts] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
            setSnackbarMessage('Error fetching contacts. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/contacts/${id}`);
            setSnackbarMessage('Contact deleted successfully!');
            setSnackbarSeverity('success');
            fetchContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
            setSnackbarMessage('Error deleting contact. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [fetchTrigger]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Contacts List
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Job Title', 'Actions'].map((header) => (
                                <TableCell key={header} align="center">
                                    <strong>{header}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableCell align="center">{contact.firstName}</TableCell>
                                <TableCell align="center">{contact.lastName}</TableCell>
                                <TableCell align="center">{contact.email}</TableCell>
                                <TableCell align="center">{contact.phone}</TableCell>
                                <TableCell align="center">{contact.company}</TableCell>
                                <TableCell align="center">{contact.jobTitle}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        color="primary"
                                        onClick={() => setEditingContact(contact)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => handleDelete(contact._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default ContactsTable;