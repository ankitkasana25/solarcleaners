import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { lightTheme } from '../theme/theme';

interface CartItemCardProps {
    title: string;
    price: number;
    image: any;
    details?: string;
    systemSize?: string;
    onEdit?: () => void;
    onUpdateSize?: (newSize: string) => void;
    onRemove?: () => void;
}

export const CartItemCard = ({
    title,
    price,
    image,
    details,
    systemSize,
    onEdit,
    onUpdateSize,
    onRemove
}: CartItemCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(systemSize || '');

    const imageSource = typeof image === 'string'
        ? { uri: image }
        : image?.uri
            ? image
            : image;

    const handleSave = () => {
        if (onUpdateSize) {
            onUpdateSize(editValue);
        }
        setIsEditing(false);
    };

    const toggleEdit = () => {
        if (isEditing) {
            handleSave();
        } else {
            setEditValue(systemSize || '');
            setIsEditing(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                    <TouchableOpacity
                        onPress={onRemove}
                        style={styles.deleteButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="trash-outline" size={18} color={lightTheme.colors.redOrange} />
                    </TouchableOpacity>
                </View>

                {isEditing ? (
                    <View style={styles.editContainer}>
                        <TextInput
                            style={styles.sizeInput}
                            value={editValue}
                            onChangeText={setEditValue}
                            keyboardType="numeric"
                            autoFocus
                        />
                        <Text style={styles.unitText}>kW System</Text>
                    </View>
                ) : (
                    <View style={styles.detailsContainer}>
                        {details && <Text style={styles.details}>{details}</Text>}
                    </View>
                )}

                <View style={styles.footerRow}>
                    <Text style={styles.price}>₹{price.toLocaleString()}</Text>

                    <TouchableOpacity onPress={toggleEdit} style={styles.editButton}>
                        <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
                        {/* <Ionicons
                            name={isEditing ? "checkmark" : "create-outline"}
                            size={14}
                            color={lightTheme.colors.primaryBlue}
                        /> */}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    imageContainer: {
        width: 88,
        height: 88,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#F7F8FA',
        marginRight: 16,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 15,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle, // Using theme color
        flex: 1,
        marginRight: 8,
        lineHeight: 20,
    },
    deleteButton: {
        padding: 4,
    },
    detailsContainer: {
        marginTop: 4,
    },
    details: {
        fontSize: 12,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.slateGray,
        backgroundColor: '#F5F7FA',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        overflow: 'hidden',
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    sizeInput: {
        borderWidth: 1,
        borderColor: lightTheme.colors.primaryBlue,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 14,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.headerTitle,
        minWidth: 60,
        textAlign: 'center',
        marginRight: 8,
        backgroundColor: '#F0F7FF',
        height: 32,
    },
    unitText: {
        fontSize: 12,
        fontFamily: 'NotoSans-Medium',
        color: lightTheme.colors.gray3,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 18,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
        letterSpacing: 0.5,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#F0F7FF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E3F2FD',
    },
    editText: {
        fontSize: 12,
        fontFamily: 'NotoSans-Bold',
        color: lightTheme.colors.primaryBlue,
    },
});
