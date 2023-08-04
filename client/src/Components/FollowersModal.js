import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, Text, Divider
  } from '@chakra-ui/react'
  import FollowerCard from './FollowerCard'

export default function FollowersModal(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <button onClick={onOpen} > <Text className="text-lg dark:text-white text-black"> {props.follower_count} followers </Text> </button>
  
        <Modal isOpen={isOpen} onClose={onClose} className="dark:bg-post dark:text-white">
          <ModalOverlay />
          <ModalContent className='dark:bg-main max-w-lg h-3/4 mx-auto rounded-lg bg-gray-100 '>
          <div className='flex'>
            <ModalHeader className='dark:text-white justify-center mx-auto mt-8 mb-3'>Followers</ModalHeader>
            <ModalCloseButton className='mr-2 dark:text-white'/>
            </div>
            <ModalBody className='dark:text-white  mt-8 mb-3 overflow-auto '>
            <FollowerCard theUser = {props.user} followers = {props.followers} />

            </ModalBody>
  
            <ModalFooter>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }