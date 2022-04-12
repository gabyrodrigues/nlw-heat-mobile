import { StyleSheet } from 'react-native'
import { FONTS } from '../../theme'

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 14
  },
  icon: {
    marginRight: 12
  }
})