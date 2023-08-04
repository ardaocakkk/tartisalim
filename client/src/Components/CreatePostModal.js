import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useDisclosure
  } from '@chakra-ui/react'



function CreatePostModel() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
        
        <div className=" ">
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent className="dark:bg-main max-w-lg h-1/2   mx-auto" >
            <ModalHeader className="dark:text-white justify-center mx-auto mt-8" >Create a Post</ModalHeader>
            <hr class=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <ModalBody>
                
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose} className="dark:text-white" >
                Close
                </Button>
                <Button variant="ghost" className="dark:text-white">Secondary Action</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </div>
    </>
    )
}

export default CreatePostModel;
