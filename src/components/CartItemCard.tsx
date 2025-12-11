import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CartItemCardProps {
    title: string;
    price: number;
    image: any;
    details?: string;
    systemSize?: string;
    onEdit?: () => void; // Keep for navigation/other edits if needed, but primary "Edit" requested is for size
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

    // Normalize image source
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
            {/* Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                    <TouchableOpacity onPress={onRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
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
                    details && <Text style={styles.details}>{details}</Text>
                )}

                <Text style={styles.price}>₹{price.toLocaleString()}</Text>

                <TouchableOpacity onPress={toggleEdit} style={styles.editButton}>
                    <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit Details'}</Text>
                    <Ionicons
                        name={isEditing ? "checkmark-circle" : "create-outline"}
                        size={16}
                        color="#2D44B5"
                        style={{ marginLeft: 4 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F5F5F7',
        marginRight: 16,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        flex: 1,
        marginRight: 8,
    },
    details: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 4,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    sizeInput: {
        borderWidth: 1,
        borderColor: '#2D44B5',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontSize: 14,
        color: '#1C1C1E',
        minWidth: 50,
        textAlign: 'center',
        marginRight: 8,
        backgroundColor: '#F0F7FF',
    },
    unitText: {
        fontSize: 13,
        color: '#1C1C1E',
        fontWeight: '500',
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D44B5',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        letterSpacing: 0.5,
        marginTop: 4,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    editText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#2D44B5',
        marginRight: 2,
    },
});
