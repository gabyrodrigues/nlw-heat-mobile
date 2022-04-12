import React from 'react'
import { Image } from 'react-native'

import { styles } from './styles'

import avatarImg from '../../assets/avatar.png'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../theme'

const SIZES = {
  SMALL: {
    containerSize: 32,
    avatarSize: 28
  },
  NORMAL: {
    containerSize: 48,
    avatarSize: 42
  },
}

type Props = {
  imageUri: string | undefined,
  sizes?: 'SMALL' | 'NORMAL'
}

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri

export function UserPhoto({ imageUri, sizes = 'NORMAL' }: Props) {
  const { containerSize, avatarSize } = SIZES[sizes]

  return (
    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.container,
        {
          borderRadius: containerSize / 2,
          height: containerSize,
          width: containerSize
        }
      ]}
    >
      <Image 
        source={{ uri: imageUri || AVATAR_DEFAULT }} 
        style={[
          styles.avatar,
          {
            borderRadius: avatarSize / 2,
            height: avatarSize,
            width: avatarSize
          }
        ]}
        />
    </LinearGradient>
  )
}