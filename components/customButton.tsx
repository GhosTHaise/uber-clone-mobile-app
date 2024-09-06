import { ButtonProps } from '@/types/type'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({
    onPress,
    title,
    bgVariant = 'primary',
    textVariant = 'default',
    IconLeft,
    IconRight,
    className }: ButtonProps) => (
    <TouchableOpacity
        onPress={onPress}
    >
        {IconLeft && (<IconLeft />)}
        <Text>{title}</Text>
        {IconRight && (<IconRight />)}
    </TouchableOpacity>
)

export default CustomButton