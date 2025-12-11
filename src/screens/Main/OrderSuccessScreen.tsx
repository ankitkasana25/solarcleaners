import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const OrderSuccessScreen = () => {
    const navigation = useNavigation<any>();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Navigate to Bookings and reset stack somewhat or just navigate tab
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'MainTabs',
                                    state: {
                                        routes: [{ name: 'Bookings' }],
                                    },
                                },
                            ],
                        })
                    );
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigation]);

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
                </View>
                <Text style={styles.title}>Order Placed Successfully!</Text>
                <Text style={styles.message}>
                    Your service request has been confirmed. Our agent will contact you shortly.
                </Text>

                <Text style={styles.redirectText}>Redirecting to bookings in {count}s...</Text>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('MainTabs', { screen: 'Bookings' })}
                >
                    <Text style={styles.buttonText}>View My Bookings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
                >
                    <Text style={styles.secondaryButtonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    redirectText: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 40,
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: '#2D44B5',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        paddingVertical: 16,
    },
    secondaryButtonText: {
        color: '#2D44B5',
        fontSize: 16,
        fontWeight: '500',
    },
});
