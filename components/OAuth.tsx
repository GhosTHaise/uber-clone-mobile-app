import React from 'react'
import { Image, Text, View } from 'react-native'
import CustomButton from './customButton'
import { icons } from '@/constants'

const OAuth = () => {

    const handleGoogleLogin = () => {
        console.log('Google login')
    }

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-general-100" />
                <Text className='text-lg'>Or</Text>
                <View className="flex-1 h-[1px] bg-general-100" />
            </View>
            <CustomButton
                className='mt-5 w-full shadow-none'
                title='Sign in with Google'
                onPress={handleGoogleLogin}
                IconLeft={() => (
                    <Image
                        source={icons.google}
                        className='w-5 h-5 mt-2'
                        resizeMode='contain'
                        alt='google'
                    />
                )}
                bgVariant='outline'
                textVariant='primary'
            />
        </View>
    )
}

export default OAuth