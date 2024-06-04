import React, { useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Container, Button, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useEvents, useComments, useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from '../integrations/supabase/index.js';

const TableVisualization = () => {
  const { data: events } = useEvents();
  const { data: comments } = useComments();
  const { data: venues } = useVenues();

  const toast = useToast();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [currentVenue, setCurrentVenue] = useState({ name: '', location: '', description: '' });

  const handleOpenModal = (mode, venue = { name: '', location: '', description: '' }) => {
    setModalMode(mode);
    setCurrentVenue(venue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVenue({ name: '', location: '', description: '' });
  };

  const handleSaveVenue = async () => {
    try {
      if (modalMode === 'create') {
        await addVenue.mutateAsync(currentVenue);
        toast({
          title: 'Venue created.',
          description: "A new venue has been successfully created.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else if (modalMode === 'edit') {
        await updateVenue.mutateAsync(currentVenue);
        toast({
          title: 'Venue updated.',
          description: "The venue has been successfully updated.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
      handleCloseModal();
    } catch (error) {
      toast({
        title: `Error ${modalMode === 'create' ? 'creating' : 'updating'} venue.`,
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteVenue = async (venueId) => {
    try {
      await deleteVenue.mutateAsync(venueId);
      toast({
        title: 'Venue deleted.',
        description: "The venue has been successfully deleted.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting venue.',
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
      <Button colorScheme="blue" mb={4} onClick={() => handleOpenModal('create')}>
        Create Venue
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
                {table.name === 'Venues' && <Th>Actions</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {table.data && table.data.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {table.columns.map((column) => (
                    <Td key={column}>{row[column]}</Td>
                  ))}
                  {table.name === 'Venues' && (
                    <Td>
                      <Button size="sm" onClick={() => handleOpenModal('edit', row)}>Edit</Button>
                      <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDeleteVenue(row.id)}>Delete</Button>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ))}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalMode === 'create' ? 'Create Venue' : 'Edit Venue'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={currentVenue.name}
                onChange={(e) => setCurrentVenue({ ...currentVenue, name: e.target.value })}
              />
            </FormControl>
            <FormControl id="location" mb={4}>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                value={currentVenue.location}
                onChange={(e) => setCurrentVenue({ ...currentVenue, location: e.target.value })}
              />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={currentVenue.description}
                onChange={(e) => setCurrentVenue({ ...currentVenue, description: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveVenue}>
              Save
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default TableVisualization;