import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { api } from '../../services/api'
import { Message, MessageProps } from '../Message'

import { styles } from './styles'

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    console.log("currentMessages", currentMessages)
    
    api.get<MessageProps[]>('/messages/last3').then(response => {
      console.log("response")
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