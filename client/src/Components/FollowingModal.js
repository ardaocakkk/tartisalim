import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, Text, Divider
  } from '@chakra-ui/react'
import FollowingCard from './FollowingCard'
export default function FollowingModal(props) {



    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <button onClick={onOpen} > <Text className="text-lg dark:text-white text-black"> {props.following_count}  following </Text> </button>
  
        <Modal isOpen={isOpen} onClose={onClose} className="dark:bg-post dark:text-white">
          <ModalOverlay />
          <ModalContent className='dark:bg-main max-w-lg h-3/4 mx-auto rounded-lg bg-gray-100 '>
          <div className='flex'>
            <ModalHeader className='dark:text-white justify-center mx-auto mt-8 mb-3'>Following</ModalHeader>
            <ModalCloseButton className='mr-2 dark:text-white'/>
            </div>
            <ModalBody className='dark:text-white  mt-8 mb-3 overflow-auto '>
            <FollowingCard theUser = {props.user} following = {props.following}  />
            </ModalBody>
  
            <ModalFooter>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }