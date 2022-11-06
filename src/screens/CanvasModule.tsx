import React, { FC } from 'react'

import RegularButton from '../components/Buttons/RegularButton'
import RegularText from '../components/Texts/RegularText'

// import image to tensor converter
import TfConverter from '../test/mini_branch/TfConverter'

// Canvas
import { Canvas, Image, useImage } from '@shopify/react-native-skia'
import { ImageInfo } from 'expo-image-picker'
import { View, Text, Dimensions, Alert } from 'react-native'

// import styling tools
import { Colors } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

// import image to tensor converter

import { ImgProps } from '../components/Media/types'

const ScreenWidth = Dimensions.get('screen').width
const ScreenHeight = Dimensions.get('screen').width
const xSize = (ScreenWidth - ScreenWidth * 0.9) / 2
const ySize = (ScreenHeight - ScreenHeight * 0.9) / 2

const BTN_MARGIN = 30
const IMG_RATIO = 0.9

/** canvas로 이미지를 그리는 예제까지 성공. */
export const CanvasModule: FC<ImgProps> = (props) => {
  // const image = useImage(img)
  if (props.error)
    return (
      <View>
        <Text> error가 발생했어요...</Text>
      </View>
    )
  const image = useImage(props.pickedImage.uri)

  const runTfConverter = () => {
    console.log('runTfConverter ! ', image)
    const convertFc = async () => {
      const tensorImage = await TfConverter(props.pickedImage.uri)
      return tensorImage
    }
    convertFc().then((t_image)=> console.log(t_image))
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.grey500,
      }}
    >
      <Canvas style={{ flex: 1 }}>
        {image && (
          <Image
            image={image}
            fit="contain"
            x={xSize}
            y={ySize}
            width={ScreenWidth * IMG_RATIO}
            height={(ScreenHeight - BTN_MARGIN) * IMG_RATIO}
          />
        )}
      </Canvas>
      <RegularButton
        onPress={runTfConverter}
        btnStyles={{
          backgroundColor: Colors.black,
          marginBottom: BTN_MARGIN,
          width: ScreenWidth * IMG_RATIO,
          alignSelf: 'center',
        }}
      >
        <RegularText
          textStyles={{
            fontSize: 27,
            color: Colors.white,
            fontFamily: 'DancingScript-Regular',
            alignSelf: 'center',
          }}
        >
          CONVERT TO TENSOR
        </RegularText>
      </RegularButton>
    </SafeAreaView>
  )
}

export default CanvasModule
