import { ButtonProps } from '@/types/type'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const getBgVariantStyle = (bgVariant: ButtonProps['bgVariant']) => {
    switch (bgVariant) {
        case 'secondary':
            return 'bg-gray-500'
        case 'danger':
            return 'bg-sred-500'
        case 'success':
            return 'bg-green-500'
        case 'outline':
            return 'bg-transparent bg-neutral-300 border-[0.5px]'
        default:
            return 'bg-[#0286ff]'
    }
}

const CustomButton = ({
    onPress,
    title,
    bgVariant = 'primary',
    textVariant = 'default',
    IconLeft,
    IconRight,
    className }: ButtonProps) => (
    <TouchableOpacity
        className={`w-full flex felx-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
        onPress={onPress}
    >
        {IconLeft && (<IconLeft />)}
        <Text>{title}</Text>
        {IconRight && (<IconRight />)}
    </TouchableOpacity>
)

export default CustomButton