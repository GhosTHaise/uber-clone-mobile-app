import { Text, ScrollView, View, Image } from 'react-native'
import { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/inputField'
import CustomButton from '@/components/customButton'
import { Link } from 'expo-router'

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const onSignUpPress = () => {
        console.log('Sign Up Pressed')
    }

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
                        value={form.name}
                        onChangeText={(value: string) => setForm({ ...form, name: value })}
                    />
                    <InputField
                        label='Email'
                        placeholder='Enter your email'
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value: string) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label='Password'
                        placeholder='Enter your password'
                        icon={icons.lock}
                        secureTextEntry={true}
                        value=''
                        onChangeText={(value: string) => setForm({ ...form, password: value })}
                    />
                    <CustomButton
                        title='Sign Up'
                        onPress={onSignUpPress}
                        className='mt-6'
                    />
                    {/* OAuth */}
                    <Link href="/sign-in" className='text-lg text-center text-general-200 mt-8'>
                        <Text>Already have an account ?</Text>
                        <Text className='text-primary-500'> Sign In</Text>
                    </Link>
                </View>
                {/* Verification Modal */}
            </View>
        </ScrollView>
    )
}

export default SignUp