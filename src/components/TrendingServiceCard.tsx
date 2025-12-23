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
const CARD_WIDTH = width * 0.45;

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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
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
    borderRadius: 20,
    marginRight: 16,
    marginBottom: 10,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F7F7F7',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF4B4B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    zIndex: 1,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'NotoSans-Bold',
  },
  contentContainer: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    color: '#1C1C1E',
    lineHeight: 20,
  },
});
