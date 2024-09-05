import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Swiper from 'react-native-swiper'
import { onboarding } from '@/constants'

const OnBoarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <SafeAreaView className='flex h-full items-center justify-between bg-white'>
            <TouchableOpacity
                className='w-full flex justify-end items-end p-5'
                onPress={() => {
                    router.replace('/(auth)/sign-up')
                }}
            >
                <Text className='text-black text-md font-JakartaBold'>Skip</Text>
            </TouchableOpacity>
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className='w-8 h-1 mx-1 bg-[#E2E8F0] rounded-full' />}
                activeDot={<View className='w-8 h-1 mx-1 bg-[#0286FF] rounded-full' />}
                onIndexChanged={(index) =>
                    setActiveIndex(index)
                }
                index={activeIndex}
            >
                {
                    onboarding.map((item, index) => (
                        <View
                            key={item.title}
                            className='flex items-center justify-center p-5'
                        >
                            <Image
                                source={item.image}
                                className='w-full h-[300px]'
                                resizeMode='contain'
                            />
                            <View className='flex flex-row items-center justify-center w-full mt-10'>
                                <Text className='text-black text-3xl font-bold mx-10 text-center'>
                                    {item.title}

                                </Text>
                            </View>
                            <Text className='text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3'>{item.description}</Text>
                        </View>
                    ))
                }
            </Swiper>
        </SafeAreaView>
    )
}

export default OnBoarding