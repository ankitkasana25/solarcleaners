import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

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
    },
    {
      id: '2',
      question: 'What cleaning methods do you use?',
      answer:
        "We use eco-friendly, deionized water with soft bristle brushes to safely clean without scratching. Our method prevents water spots and doesn't require harsh chemicals that could damage panels.",
    },
    {
      id: '3',
      question: 'Will cleaning affect my warranty?',
      answer:
        "No, our cleaning methods are approved by all major solar panel manufacturers. We follow industry best practices that won't void your warranty. We can even provide cleaning certificates for warranty documentation.",
    },
    {
      id: '4',
      question: 'How long does cleaning take?',
      answer:
        'For a typical residential system (10-20 panels), cleaning takes 1-2 hours. We work efficiently to minimize disruption while ensuring thorough cleaning of every panel.',
    },
    {
      id: '5',
      question: 'What if it rains after cleaning?',
      answer:
        'Our cleaning solution includes a light protective coating that helps repel water and dust. While rain will wash away some of the cleaning, the main benefit of removing built-up grime remains.',
    },
    {
      id: '6',
      question: 'Do you clean during winter?',
      answer:
        'Yes! We provide year-round service. Winter cleaning is especially important as panels work harder during shorter daylight hours. We schedule based on weather conditions for safety.',
    },
    {
      id: '7',
      question: 'How much does it cost?',
      answer:
        'Prices start at $99 for a standard residential system. The exact cost depends on the number of panels, roof accessibility, and your location. Contact us for a free quote!',
    },
    {
      id: '8',
      question: 'Do I need to be home during cleaning?',
      answer:
        "No, we can clean while you're away. We just need access to your property and an external water source. We'll send you before/after photos upon completion.",
    },
  ];

  const toggleFAQ = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <Text style={styles.description}>
          Get answers about our professional solar cleaning services
        </Text>
      </View>

      <ScrollView
        style={styles.faqsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.faqsContent}
      >
        {faqs.map(faq => {
          const isExpanded = expandedId === faq.id;

          return (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => toggleFAQ(faq.id)}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.questionText}>{faq.question}</Text>
                <View
                  style={[
                    styles.iconContainer,
                    isExpanded && styles.iconExpanded,
                  ]}
                >
                  <View style={[styles.iconLine]} />
                  <View
                    style={[styles.iconLine, isExpanded && { opacity: 0 }]}
                  />
                </View>
              </View>

              {isExpanded && (
                <Animated.View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </Animated.View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  faqsContainer: {
    flex: 1,
  },
  faqsContent: {
    paddingBottom: 30,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    paddingRight: 16,
  },
  answerContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  answerText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 24,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconExpanded: {
    backgroundColor: '#007AFF',
  },
  iconLine: {
    width: 10,
    height: 2,
    backgroundColor: 'black',
    position: 'absolute',
  },
  iconLineexp: {
    width: 10,
    height: 2,
    backgroundColor: 'white',
    position: 'absolute',
  },
});
