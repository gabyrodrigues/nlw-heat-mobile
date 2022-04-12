import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    marginBottom: 36,
    width: '100%'
  },
  message: {
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 12
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  userName: {
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    marginLeft: 16
  }
})