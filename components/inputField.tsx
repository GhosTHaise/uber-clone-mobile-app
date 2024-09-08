import { InputFieldProps } from '@/types/type'
import React from 'react'
import { KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from 'react-native'

const InputField = ({ label, labelStyle, icon, secureTextEntry = false, containerStyle, placeholder, value, onChangeText }: InputFieldProps) => {

    return (
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback>
                <View className='my-2 w-full'>
                    <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`} >
                        {label}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default InputField