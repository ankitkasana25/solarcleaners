import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { lightTheme } from '../theme/theme';

interface BookingCalendarProps {
    onDateSelect: (date: Date) => void;
    onTimeSelect: (time: string) => void;
    selectedDate?: Date;
    selectedTime?: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
    onDateSelect,
    onTimeSelect,
    selectedDate,
    selectedTime,
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Generate next 30 days
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const timeSlots = [
        '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM', '06:00 PM'
    ];

    const dates = generateDates();

    const formatDate = (date: Date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return {
            day: days[date.getDay()],
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        };
    };

    const isSameDay = (date1?: Date, date2?: Date) => {
        if (!date1 || !date2) return false;
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    return (
        <View style={styles.container}>
            {/* Date Selection */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>📅 Select Date</Text>
                    <Text style={styles.sectionSubtitle}>Choose your preferred date</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.datesContainer}
                >
                    {dates.map((date, index) => {
                        const { day, date: dateNum } = formatDate(date);
                        const isSelected = isSameDay(date, selectedDate);
                        const isToday = isSameDay(date, new Date());

                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dateCard,
                                    isSelected && styles.dateCardSelected,
                                    isToday && !isSelected && styles.dateCardToday,
                                ]}
                                onPress={() => onDateSelect(date)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.dateDay,
                                    isSelected && styles.dateDaySelected,
                                ]}>
                                    {day}
                                </Text>
                                <Text style={[
                                    styles.dateNumber,
                                    isSelected && styles.dateNumberSelected,
                                ]}>
                                    {dateNum}
                                </Text>
                                {isToday && !isSelected && (
                                    <View style={styles.todayDot} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Time Slot Selection */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>🕐 Select Time Slot</Text>
                    <Text style={styles.sectionSubtitle}>Choose your preferred time</Text>
                </View>
                <View style={styles.timeSlotsContainer}>
                    {timeSlots.map((time, index) => {
                        const isSelected = time === selectedTime;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.timeSlot,
                                    isSelected && styles.timeSlotSelected,
                                ]}
                                onPress={() => onTimeSelect(time)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.timeSlotText,
                                    isSelected && styles.timeSlotTextSelected,
                                ]}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.gray1,
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 12,
        fontFamily: lightTheme.fontfamily.notoSans_regular,
        color: lightTheme.colors.gray3,
    },
    datesContainer: {
        paddingHorizontal: 4,
        gap: 12,
    },
    dateCard: {
        width: 70,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: '#FAFAFA',
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateCardSelected: {
        backgroundColor: lightTheme.colors.primaryBlue,
        borderColor: lightTheme.colors.primaryBlue,
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    dateCardToday: {
        borderColor: lightTheme.colors.primaryBlue,
        borderWidth: 2,
    },
    dateDay: {
        fontSize: 12,
        fontFamily: lightTheme.fontfamily.notoSans_medium,
        color: lightTheme.colors.gray3,
        marginBottom: 8,
    },
    dateDaySelected: {
        color: '#fff',
    },
    dateNumber: {
        fontSize: 20,
        fontFamily: lightTheme.fontfamily.notoSans_bold,
        color: lightTheme.colors.gray1,
    },
    dateNumberSelected: {
        color: '#fff',
    },
    todayDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: lightTheme.colors.primaryBlue,
        marginTop: 8,
    },
    timeSlotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingHorizontal: 4,
    },
    timeSlot: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        minWidth: 110,
        alignItems: 'center',
    },
    timeSlotSelected: {
        backgroundColor: lightTheme.colors.primaryBlue,
        borderColor: lightTheme.colors.primaryBlue,
        shadowColor: lightTheme.colors.primaryBlue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    timeSlotText: {
        fontSize: 14,
        fontFamily: lightTheme.fontfamily.notoSans_medium,
        color: lightTheme.colors.gray2,
    },
    timeSlotTextSelected: {
        color: '#fff',
        fontFamily: lightTheme.fontfamily.notoSans_bold,
    },
});
