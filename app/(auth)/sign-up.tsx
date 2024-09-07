import { Text, ScrollView, View, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const SignUp = () => {
    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='flex-1 bg-white'>
                <View className='relative w-full h-[250px]'>
                    <Image
                        source={images.signUpCar}
                        className='z--0 w-full h-[250px]'
                    />
                    <Text className='text-2xl text-black font-jakartaSemibold absolute bottom-5 left-5'>
                        Create your account
                    </Text>
                </View>

            </View>
        </ScrollView>
    )
}

export default SignUp