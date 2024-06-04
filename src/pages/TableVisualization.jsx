import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Container, Button, useToast } from '@chakra-ui/react';
import { useEvents, useComments, useVenues, useAddEvent } from '../integrations/supabase/index.js';

const TableVisualization = () => {
  const { data: events } = useEvents();
  const { data: comments } = useComments();
  const { data: venues } = useVenues();

  const toast = useToast();
  const addEvent = useAddEvent();

  const handleCreateEvent = async () => {
    try {
      const newEvent = {
        name: 'New Event',
        date: new Date().toISOString().split('T')[0],
        description: 'Description of the new event',
        venue_id: 1, // Assuming a default venue_id for simplicity
        is_pinned: false,
      };
      await addEvent.mutateAsync(newEvent);
      toast({
        title: 'Event created.',
        description: "A new event has been successfully created.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating event.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const tables = [
    {
      name: 'Events',
      columns: ['id', 'created_at', 'name', 'date', 'description', 'venue_id', 'is_pinned'],
      data: events,
    },
    {
      name: 'Comments',
      columns: ['id', 'created_at', 'content', 'event_id'],
      data: comments,
    },
    {
      name: 'Venues',
      columns: ['id', 'name', 'location', 'description', 'created_at', 'updated_at'],
      data: venues,
    },
  ];

  return (
    <Container maxW="container.xl" p={4}>
      <Heading as="h1" mb={6}>Supabase Tables Visualization</Heading>
      <Button colorScheme="blue" mb={4} onClick={handleCreateEvent}>
        Create Event
      </Button>
      
      {tables.map((table) => (
        <Box key={table.name} mb={10}>
          <Heading as="h2" size="md" mb={4}>{table.name}</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                {table.columns.map((column) => (
                  <Th key={column}>{column}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {table.data && table.data.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {table.columns.map((column) => (
                    <Td key={column}>{row[column]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ))}
    </Container>
  );
};

export default TableVisualization;