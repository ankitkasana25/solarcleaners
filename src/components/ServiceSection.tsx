import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SectionTitle } from './SectionTitle';
import { ServiceCard } from './ServiceCard';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

interface ServiceSectionProps {
    title: string;
    services: any[];
}

export const ServiceSection = ({
    title,
    services,
}: ServiceSectionProps) => {
    return (
        <View style={styles.section}>
            <SectionTitle
                title={title}
                tagline={`Explore ${title} Services`}
                rightElement={
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>View All</Text>
                    </TouchableOpacity>
                }
            />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + 16}
            >
                {services.map(service => (
                    <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        image={service.image}
                        discount={service.discount}
                        price={service.price}
                        duration={service.duration}
                        featured={service.featured}
                        popular={service.popular}
                        urgent={service.urgent}
                        id={service.id}
                        category={service.category}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 16,
        marginBottom: 8,
    },
    seeAllText: {
        fontSize: 14,
        color: lightTheme.colors.primary,
        fontFamily: 'NotoSans-Bold',
    },
    cardsContainer: {
        paddingHorizontal: 16,
        gap: 16,
    },
});
