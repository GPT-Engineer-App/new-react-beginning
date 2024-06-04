import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Container } from '@chakra-ui/react';
import { useEvents, useComments, useVenues } from '../integrations/supabase/index.js';

const TableVisualization = () => {
  const { data: events } = useEvents();
  const { data: comments } = useComments();
  const { data: venues } = useVenues();

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