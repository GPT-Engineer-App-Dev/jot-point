import { Box, Button, Input, useToast, VStack, Textarea, Heading, SimpleGrid, IconButton } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const toast = useToast();

  const addNote = () => {
    if (!inputTitle || !inputContent) {
      toast({
        title: 'Error',
        description: "Title and content cannot be empty.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = {
      id: Date.now(),
      title: inputTitle,
      content: inputContent,
    };
    setNotes([...notes, newNote]);
    setInputTitle('');
    setInputContent('');
    toast({
      title: 'Success',
      description: "Note added successfully.",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    toast({
      title: 'Deleted',
      description: "Note deleted successfully.",
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading>Note-Taking App</Heading>
        <Input placeholder="Title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
        <Textarea placeholder="Content" value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote}>Add Note</Button>
      </VStack>
      <SimpleGrid columns={3} spacing={4} mt={5}>
        {notes.map(note => (
          <Box key={note.id} p={5} shadow="md" borderWidth="1px">
            <VStack>
              <Heading size="md">{note.title}</Heading>
              <Box>{note.content}</Box>
              <IconButton aria-label="Delete note" icon={<FaTrash />} onClick={() => deleteNote(note.id)} />
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Index;