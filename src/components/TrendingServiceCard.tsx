import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { lightTheme } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45; // Compact for trending

interface TrendingServiceCardProps {
  title: string;
  image: any;
  discount?: string;
  onPress?: () => void;
}

export const TrendingServiceCard = ({
  title,
  image,
  discount,
  onPress,
}: TrendingServiceCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}</Text>
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    borderWidth: 1,
    borderColor: lightTheme.colors.lightBorder,
    shadowColor: lightTheme.colors.inkShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8, // For shadow visibility
  },
  imageContainer: {
    height: 120,
    position: 'relative',
    backgroundColor: lightTheme.colors.backgroundGray,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: lightTheme.colors.redOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'NotoSans-Bold',
  },
  contentContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'NotoSans-Medium',
    color: lightTheme.colors.gray1000,
    marginRight: 8,
    lineHeight: 18,
  },
});
