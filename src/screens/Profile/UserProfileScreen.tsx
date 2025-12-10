import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../stores/RootStore';
import { ImageIcon } from '../../components/ImageIcon'; // Assuming usage of ImageIcon for consistency

export const UserProfileScreen = observer(() => {
    const navigation = useNavigation();
    const { authStore } = useRootStore();

    // State for form fields
    const [gender, setGender] = useState<string>('Man');
    const [dob, setDob] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const GenderOption = ({ label }: { label: string }) => (
        <TouchableOpacity
            style={[
                styles.genderChip,
                gender === label && styles.genderChipSelected
            ]}
            onPress={() => setGender(label)}
        >
            <Text style={[
                styles.genderText,
                gender === label && styles.genderTextSelected
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScreenContainer>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile Setup</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Let's Get You Set Up!</Text>

                {/* Avatar Selection Area */}
                <View style={styles.avatarSelectionContainer}>
                    <TouchableOpacity style={styles.avatarOption}>
                        <View style={styles.avatarPlaceholder}>
                            <ImageIcon name="profile" size={32} color={colors.textSecondary} />
                            <View style={styles.cameraBadge}>
                                <ImageIcon name="home" size={12} color={colors.white} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.avatarOption}>
                        <Image
                            source={require('../../assets/icons/profile.png')}
                            style={styles.avatarImage}
                        />
                        <View style={[styles.cameraBadge, { backgroundColor: colors.primary }]}>
                            <Text style={{ color: 'white', fontSize: 10 }}>✏️</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.avatarHelperText}>Choose Profile Picture Or Set avatar</Text>

                {/* Form Fields */}
                <View style={styles.formSection}>
                    <Text style={styles.label}>Bio <Text style={styles.optional}>(Optional)</Text></Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter here"
                        placeholderTextColor="#C7C7CD"
                        multiline
                        value={bio}
                        onChangeText={setBio}
                    />
                    <Text style={styles.wordCount}>100 words</Text>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Gender <Text style={styles.required}>*</Text></Text>
                    <View style={styles.genderContainer}>
                        <GenderOption label="Man" />
                        <GenderOption label="Woman" />
                        <GenderOption label="Non-Binary" />
                    </View>
                    <TouchableOpacity
                        style={[styles.genderChip, gender === 'I prefer not to say' && styles.genderChipSelected, { alignSelf: 'flex-start', marginTop: 10 }]}
                        onPress={() => setGender('I prefer not to say')}
                    >
                        <Text style={[styles.genderText, gender === 'I prefer not to say' && styles.genderTextSelected]}>I prefer not to say</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>DOB <Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="DD/MM/YYY"
                            placeholderTextColor="#C7C7CD"
                            value={dob}
                            onChangeText={setDob}
                        />
                        <View style={styles.inputIcon}>
                            <Text>📅</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Country <Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select or Type.."
                            placeholderTextColor="#C7C7CD"
                            value={country}
                            onChangeText={setCountry}
                        />
                        <View style={styles.inputIcon}>
                            <Text>▼</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>City/ Region <Text style={styles.optional}>(Optional)</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter here"
                        placeholderTextColor="#C7C7CD"
                        value={city}
                        onChangeText={setCity}
                    />
                </View>

                <View style={[styles.formSection, { marginBottom: 40 }]}>
                    <Text style={styles.label}>Home Address <Text style={styles.optional}>(Optional)</Text></Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select or Type.."
                            placeholderTextColor="#C7C7CD"
                            value={address}
                            onChangeText={setAddress}
                        />
                        <View style={styles.inputIcon}>
                            <Text>🔍</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>

            </ScrollView>
        </ScreenContainer>
    );
});

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    backButton: {
        padding: 8,
    },
    backButtonIcon: {
        fontSize: 24,
        color: colors.text,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    scrollContent: {
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 32,
        textAlign: 'center',
    },
    avatarSelectionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginBottom: 16,
    },
    avatarOption: {
        position: 'relative',
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E5E5EA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E1F5FE',
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007AFF', // Blue badge
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    avatarHelperText: {
        textAlign: 'center',
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 32,
    },
    formSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3A3A3C',
        marginBottom: 8,
    },
    required: {
        color: '#FF3B30',
    },
    optional: {
        color: '#8E8E93',
        fontWeight: '400',
    },
    input: {
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: colors.text,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputContainer: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        right: 16,
        top: 14,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    wordCount: {
        alignSelf: 'flex-end',
        color: '#8E8E93',
        fontSize: 12,
        marginTop: 4,
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    genderChip: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#C7C7CD',
        backgroundColor: 'white',
    },
    genderChipSelected: {
        borderColor: colors.primary,
        backgroundColor: '#F0F8FF', // Light blue bg
    },
    genderText: {
        fontSize: 14,
        color: '#3A3A3C',
        fontWeight: '500',
    },
    genderTextSelected: {
        color: colors.primary,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

