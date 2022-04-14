import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { api } from '../../services/api'
import { Message, MessageProps } from '../Message'

import { io } from 'socket.io-client'

import { styles } from './styles'

let messagesQueue: MessageProps[] = []

const socket = io(String(api.defaults.baseURL))
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage) //insert sent messages on queue
})

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if(messagesQueue.length > 0) {
        setCurrentMessages(prevState => [
          messagesQueue[0], //in array first position, insert first (oldest) message from queue
          prevState[0], //get already existing messages from first position of messages array
          prevState[1] //get already existing messages from second position of messages array
        ].filter(Boolean)) //filter to remove undefined/null values

        messagesQueue.shift()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    api.get<MessageProps[]>('/messages/last3').then(response => {
      setCurrentMessages(response.data)
    })
  }, [])

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map(message => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  )
}