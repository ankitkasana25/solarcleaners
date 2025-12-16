import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { lightTheme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { ImageIcon } from '../../components/ImageIcon';

export const UserProfileScreen = observer(() => {
    const navigation = useNavigation();

    // State for form fields
    const [gender, setGender] = useState<string>('Man');
    const [dob, setDob] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const GenderChip = ({ label }: { label: string }) => {
        const isSelected = gender === label;
        return (
            <TouchableOpacity
                style={[
                    styles.genderChip,
                    isSelected && styles.genderChipSelected
                ]}
                onPress={() => setGender(label)}
            >
                <Text style={[
                    styles.genderText,
                    isSelected && styles.genderTextSelected
                ]}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenContainer style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ImageIcon name="arrow-left" size={24} color={lightTheme.colors.headerTitle} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile Setup</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.pageTitle}>Let's Get You Set Up!</Text>

                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity style={styles.avatarContainer}>
                        <View style={styles.avatarPlaceholder}>
                            <ImageIcon name="profile" size={32} color={lightTheme.colors.accentGray} />
                        </View>
                        <View style={styles.editBadge}>
                            <Text style={styles.editBadgeIcon}>✏️</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.avatarHelperText}>Upload or Choose Avatar</Text>
                </View>

                {/* Form Fields */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Bio <Text style={styles.optional}> (Optional)</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Tell us a little about yourself"
                            placeholderTextColor={lightTheme.colors.gray4}
                            multiline
                            value={bio}
                            onChangeText={setBio}
                        />
                        <Text style={styles.wordCount}>0/100</Text>
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Gender <Text style={styles.required}>*</Text></Text>
                    <View style={styles.genderOptions}>
                        <GenderChip label="Man" />
                        <GenderChip label="Woman" />
                        <GenderChip label="Non-Binary" />
                    </View>
                    <TouchableOpacity
                        style={[styles.genderChip, gender === 'Prefer not to say' && styles.genderChipSelected, { marginTop: 12, alignSelf: 'flex-start' }]}
                        onPress={() => setGender('Prefer not to say')}
                    >
                        <Text style={[styles.genderText, gender === 'Prefer not to say' && styles.genderTextSelected]}>Prefer not to say</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Date of Birth <Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="DD / MM / YYYY"
                            placeholderTextColor={lightTheme.colors.gray4}
                            value={dob}
                            onChangeText={setDob}
                        />
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Country <Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select Country"
                            placeholderTextColor={lightTheme.colors.gray4}
                            value={country}
                            onChangeText={setCountry}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                        <Text style={styles.label}>City <Text style={styles.optional}>(Opt)</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="City"
                            placeholderTextColor={lightTheme.colors.gray4}
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>
                    <View style={[styles.formGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Address <Text style={styles.optional}>(Opt)</Text></Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Address"
                                placeholderTextColor={lightTheme.colors.gray4}
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ height: 24 }} />

                <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
                    <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />

            </ScrollView>
        </ScreenContainer>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightTheme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: lightTheme.colors.background,
    },
    backButton: {
        padding: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: lightTheme.colors.antiFlashWhite,
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
    },
    scrollContent: {
        padding: 24,
    },
    pageTitle: {
        fontSize: 24,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        marginBottom: 32,
        textAlign: 'center',
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: lightTheme.colors.antiFlashWhite,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, // subtle border
        borderColor: lightTheme.colors.lightBorder,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: lightTheme.colors.primaryBlue,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: lightTheme.colors.background,
    },
    editBadgeIcon: {
        fontSize: 14,
        color: '#fff',
    },
    avatarHelperText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.primaryBlue,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        marginBottom: 8,
    },
    required: {
        color: lightTheme.colors.redOrange,
    },
    optional: {
        color: lightTheme.colors.gray3,
        fontWeight: 'normal',
        fontFamily: 'NotoSans-Regular',
    },
    inputWrapper: {
        position: 'relative',
    },
    input: {
        backgroundColor: lightTheme.colors.antiFlashWhite,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.gray1000,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 14,
    },
    wordCount: {
        position: 'absolute',
        bottom: 8,
        right: 12,
        fontSize: 10,
        color: lightTheme.colors.gray3,
    },
    iconRight: {
        position: 'absolute',
        right: 16,
        top: 14,
        opacity: 0.5,
    },
    genderOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    genderChip: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: lightTheme.colors.gray4,
        backgroundColor: lightTheme.colors.background,
    },
    genderChipSelected: {
        borderColor: lightTheme.colors.primaryBlue,
        backgroundColor: lightTheme.colors.aliceBlue,
    },
    genderText: {
        fontSize: 14,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.slateGray,
    },
    genderTextSelected: {
        color: lightTheme.colors.primaryBlue,
        fontFamily: 'NotoSans-Bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: lightTheme.colors.primaryBlue,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: 'NotoSans-Bold',
        color: '#fff',
    },
});

