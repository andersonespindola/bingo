import React, { useState } from 'react'

import {
  Button,
  Center,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import './styles.css'

/**
 * Component.
 */
export function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [totalNumbers, setTotalNumbers] = useState(0)
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [drawnNumber, setDrawnNumber] = useState(0)

  const handleDraw = () => {
    const randomNumber = randomNumberWithouRepeat()
    setDrawnNumber(randomNumber)
    setDrawnNumbers([...drawnNumbers, randomNumber])
  }

  const randomNumberWithouRepeat = () => {
    let randomNumber = Math.floor(Math.random() * totalNumbers + 1)

    while (drawnNumbers.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * totalNumbers + 1)
    }

    return randomNumber
  }

  return (
    <>
      <Center bg="black" h="657px" color="white" flexDirection="column">
        <Image src={require('../../assets/bingo.jpg')} alt="Dan Abramov" />
        <HStack>
          <Text>Digite quantos números deseja:</Text>
          <Input
            type="number"
            w="200px"
            value={totalNumbers}
            onChange={value => setTotalNumbers(+value.target.value)}
          />
          <Button
            onClick={() => {
              onOpen()
              handleDraw()
            }}
            colorScheme="blue"
          >
            Começar
          </Button>
        </HStack>
      </Center>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setDrawnNumber(0)
          setDrawnNumbers([])
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {drawnNumbers.length ? drawnNumbers.join(' - ') : ''}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="xl">
              Número sorteado: <Text fontSize="3xl">{drawnNumber}</Text>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDraw}>
              Próximo número
            </Button>
            <Button
              onClick={() => {
                onClose()
                setDrawnNumber(0)
                setDrawnNumbers([])
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
