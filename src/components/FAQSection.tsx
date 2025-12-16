import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { lightTheme } from '../theme/theme';
import { SectionTitle } from './SectionTitle';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon?: string;
}

export const FAQSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Hardcoded FAQ data
  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How often should I clean my solar panels?',
      answer:
        'For optimal performance, we recommend cleaning your solar panels every 6 months. Regular cleaning can improve efficiency by up to 25% by removing dust, pollen, and bird droppings.',
      icon: '📅'
    },
    {
      id: '2',
      question: 'What cleaning methods do you use?',
      answer:
        "We use eco-friendly, deionized water with soft bristle brushes to safely clean without scratching. Our method prevents water spots and doesn't require harsh chemicals.",
      icon: '🧼'
    },
    {
      id: '3',
      question: 'Will cleaning affect my warranty?',
      answer:
        "No, our cleaning methods are approved by all major solar panel manufacturers. We follow industry best practices that won't void your warranty.",
      icon: '🛡️'
    },
    {
      id: '4',
      question: 'How long does cleaning take?',
      answer:
        'For a typical residential system (10-20 panels), cleaning takes 1-2 hours. We work efficiently to minimize disruption.',
      icon: '⏱️'
    },
  ];

  const toggleFAQ = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <SectionTitle
        title="FAQ"
        tagline="Common questions about our services"
      />

      <View style={styles.faqsContent}>
        {faqs.map(faq => {
          const isExpanded = expandedId === faq.id;

          return (
            <TouchableOpacity
              key={faq.id}
              style={[styles.faqItem, isExpanded && styles.faqItemExpanded]}
              onPress={() => toggleFAQ(faq.id)}
              activeOpacity={0.9}
            >
              <View style={styles.faqHeader}>
                <View style={[styles.iconBox, isExpanded && styles.iconBoxExpanded]}>
                  <Text style={styles.icon}>{faq.icon}</Text>
                </View>
                <Text style={[styles.questionText, isExpanded && styles.questionTextExpanded]}>
                  {faq.question}
                </Text>
                <View style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
                  <Text style={[styles.chevronText, isExpanded && styles.chevronTextExpanded]}>
                    {isExpanded ? '−' : '+'}
                  </Text>
                </View>
              </View>

              {isExpanded && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    marginTop: 16,
  },
  faqsContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  faqItemExpanded: {
    borderColor: lightTheme.colors.primaryBlue,
    backgroundColor: '#F8FBFF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBoxExpanded: {
    backgroundColor: '#E7F2FF',
  },
  icon: {
    fontSize: 16,
  },
  questionText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Medium',
    color: '#2E3A59',
    flex: 1,
    lineHeight: 20,
  },
  questionTextExpanded: {
    color: lightTheme.colors.primaryBlue,
    fontFamily: 'NotoSans-Bold',
  },
  chevron: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  chevronExpanded: {
    // Transform handled via icon change
  },
  chevronText: {
    fontSize: 20,
    color: '#8F9BB3',
    fontWeight: '300',
  },
  chevronTextExpanded: {
    color: lightTheme.colors.primaryBlue,
    fontWeight: 'bold',
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    paddingLeft: 48, // Align with text
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  answerText: {
    fontSize: 13,
    fontFamily: 'NotoSans-Regular',
    color: '#6C727F',
    lineHeight: 20,
  },
});
