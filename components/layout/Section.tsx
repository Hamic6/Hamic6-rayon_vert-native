import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';

type SectionProps = {
    title?: ReactNode; // <-- accepte maintenant un composant
    titleSize?: string;
    className?: string;
    children: React.ReactNode;
};

const Section = ({ title, titleSize = "base", className, children }: SectionProps) => (
    <View className={`mb-4 ${className ?? ""}`}>
        {title && (
            <View className={`mb-2`}>
                {typeof title === "string" ? (
                    <Text className={`text-${titleSize} font-bold`}>{title}</Text>
                ) : (
                    title
                )}
            </View>
        )}
        {children}
    </View>
);

export default Section;