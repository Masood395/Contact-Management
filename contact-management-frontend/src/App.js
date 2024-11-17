import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactsTable from './ContactsTable';
import { Container, Typography, Box } from '@mui/material';

function App() {
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    const fetchContacts = () => {
        setFetchTrigger((prev) => !prev);
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Contact Management System
            </Typography>
            <Box sx={{ marginBottom: 4 }}>
                <ContactForm 
                    fetchContacts={fetchContacts} 
                    editingContact={editingContact} 
                    setEditingContact={setEditingContact} 
                />
            </Box>
            <ContactsTable 
                fetchTrigger={fetchTrigger} 
                setEditingContact={setEditingContact} 
            />
        </Container>
    );
}

export default App;