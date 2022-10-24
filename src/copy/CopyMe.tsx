import React, { useCallback } from 'react'
import type { FC } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import { Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import * as D from '../data'
import { Avatar, IconText } from '../components'
import { styles } from '../assets/styles/Person.style'

export type PersonProps = {
  person: D.IPerson
}

// prettier-ignore
const PersonUsingValueState: FC<PersonProps> = ({ person:initialPerson}) => {
  const commentPressed = useCallback(
    () =>
      setPerson((person) => {
        const { comment } = person.counts
        return { ...person, counts: { ...person.counts, comment: comment + 1 } }
      }), [])
  const retweetPressed= useCallback(
    () =>
      setPerson((person) => {
        const { retweet} = person.counts
        return { ...person, counts: { ...person.counts, retweet: retweet+ 1 } }
      }), [])
  const heartPressed = useCallback(
    () =>
      setPerson((person) => {
        const { heart } = person.counts
        return { ...person, counts: { ...person.counts, heart: heart+ 1 } }
      }), [])

  return (
    <View style={[styles.countsView]}>
          <IconText viewStyle={[styles.touchableIcon]} onPress={commentPressed}
            name="comment" size={24} color={Colors.blue500}
            textStyle={[styles.iconText]} text={person.counts.comment} />
          <IconText viewStyle={[styles.touchableIcon]} onPress={retweetPressed}
            name="retweet" size={24} color={Colors.blue500}
            textStyle={[styles.iconText]} text={person.counts.retweet} />
          <IconText viewStyle={[styles.touchableIcon]} onPress={heartPressed}
            name="heart" size={24} color={Colors.blue500}
            textStyle={[styles.iconText]} text={person.counts.heart} />
        </View>
  )
}

export default PersonIcons