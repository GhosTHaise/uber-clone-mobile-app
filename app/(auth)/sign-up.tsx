import { Text, ScrollView, View, Image } from 'react-native'
import { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/inputField'

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
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
                <View className='p-5'>
                    <InputField
                        label='Name'
                        placeholder='Enter your name'
                        icon={icons.person}
                        value=''
                        onChangeText={(value: string) => setForm({ ...form, name: value })}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUp