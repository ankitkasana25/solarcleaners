// Shared theme tokens reused by both light and dark themes
const baseTheme = {
    colors: {
        typography: '#000000',
        background: '#ffffff',
        primary: '#007BFF',
        secondary: '#ddd',
        inputBackground: '#f0f0f0',
        textGray: 'gray',
        ccc: '#ccc',
        headerTitle: '#2E3A59',

        pearlWhite: '#FFFEF1',
        primaryBlue: '#0D81FC',
        primaryLightBlue: '#0D81FC',
        babyBlue: '#A3D0FF',
        cloudTint: '#EBF1FF',
        /** Light blue shade used for verification upload background */
        lightBlueGray: '#F3F6FC',
        coolMist: '#F4F6FB',
        inkShadow: '#22223B',
        slateGray: '#6C6C80',
        coolGray: '#A0A0B2',
        lightGray1: '#F7F7F7',

        redOrange: '#EB5757',
        secondaryRed: '#E91B0C',
        secondaryOrange: '#EA8D00',
        deepGreen: '#188147',
        secondaryGreen: '#2ED97B',
        secondaryDarkGreen: '#188147',
        lightSeaGreen: '#2AB1AD',
        secondaryYellow: '#BA5700',
        warmYellow: '#D9CB82',
        dustyBlue: '#61758A',
        lightGray: '#ECECEC',
        offWhite: '#ECECDA',

        backgroundLight: '#F9FAFB',
        backgroundGray: '#DBE2EF',
        backgroundBlueGray: '#D6E3ED',
        mutedBlue: '#99B0C2',
        darkBlue: '#0E2F56',
        aliceBlue: '#E7F2FF',
        /** Alias for design spec Asian Blue 2 */
        asianBlue2: '#E7F2FF',
        /** Asian Blue 3 - used for answer sections */
        asianBlue3: '#F0F5FF',
        paleSkyBlue: '#DEF9FF',
        skyFade34: '#B2D3FF57',
        glacierBlue: '#629BD7',
        skyBlue: '#1E9FE0',
        pastelblue: '#dbebfdff',
        persianBlue: '#2d44b5',

        accentGreen: '#3CE88D',
        accentYellow: '#FCD34D',
        accentPurple: '#A855F7',
        accentLightPurple: '#F2E5FFB5',
        subscribeGold: '#F8C61F',
        interestGreen: '#6FCF97',
        ancientPurple: '#F2E5FF',
        charcoal: '#1D1D1D',
        lightBorder: '#F9F9F9',
        pastelViolet: '#cd9afc',
        blackTransparent: 'rgba(0,0,0,0.5)',

        gray1: '#333333',
        gray2: '#4F4F4F',
        gray3: '#828282',
        gray4: '#BDBDBD',
        gray5: '#E0E0E0',
        gray6: '#F2F2F2',
        gray1000: '#2E3A59',

        antiFlashWhite: '#F0F2F5',

        darkGray: '#A7A7A7',

        primary10: '#0D81FC1A',
        lightBlue: '#B5D4FF',
        whiteTint: '#F6FBFF',
        /** Semi-transparent overlay used for loaders */
        overlay: 'rgba(0,0,0,0.2)',

        chatBubbleSelected: '#3E3E47',
        gradientBlue: '#90bcfc',
        gradientLightBlue: '#a2d9f5',
        gradientStartBlue: '#0052CC', // dark top color
        gradientEndBlue: '#1E9FE0', // light bottom color
        ancientGray: '#788782',
        /** Slightly lighter variant used in UI */
        ancientGray2: '#838297',
        accentGray: '#7787A2',

        /** Colors used on the Calls screen */
        callTile: '#A0C3D2',
        callInitials: '#FD8A8A',
        callLeaveButton: '#CC525F',
        callText: '#ffffff',
        shadowBlue: '#7887A2',
        lightPeach: '#FFE9E1',
        lightAmber: '#F2C94C66',
        medievalBlue: '#2E3A59',
        lightPastelPink: '#FFD1D1',
        opaquePalePink: '#FFE4E4',
        darkAmber: '#B06A00',
        miniBlue: '#E6F8F0',

        /** Linear Gradient */
        OffWhite: '#f5f3e7',
        paleGold: '#e6d28a',
        lightButtercream: '#FFFDEE',
        pastelGreen: '#F0FFE5',
        flameRed: '#FF3324',
        orangeYellow: '#EA8D00',
        saturatedBlue: '#2E34A1',
        vibrant: '#9B51E0',
        royalBlue: '#0052CC33',
        darkNavyBlue: '#00112B99',
        oceanBlue: '#00557F99',
        softWhite: '#FFFFFF33',
        cobaltBlue: '#0157B8',
        darkRoyalBlue: '#042989',
        aquaBlue: '#00C9FF',
        lightNeonGreen: '#92FE9D',
        paleBlue: '#DEF2FF',
        lavender: '#C1BAD9',
        lightYellow: '#E9E692',
        lightWhite: '#F5FCFF',
        /** Profile screens gradient */
        profileGradientStart: '#F8FCFF',
        profileGradientEnd: '#AECCEC',

        // Profile screens colors

        richBlue: '#00196B',
        powderBlue: '#C4E7FF',
        veryDarkIndigo: '#110834',
        lavenderIndigo: '#6950DA',
        darkVioletBlue: '#291581',
        paleAqua: '#C6E6DB',
        deepMaroon: '#340808',
        coralRed: '#DA5050',
        darkCrimson: '#811515',
        assassin: '#2C4E84',

        activeBadge: '#3357C426',
        disabledBadge: '#4747471A',

        // Colors for the Text

        lightGrayishBlue: '#CFE6FE',

        // mental Health
    },
    margins: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12,
        app: 16,
        appSM: 20,
        appMD: 24,
        appLG: 32,
        appXL: 40,
    },
    fonts: {
        xlh: 36,
        lh: 30,
        h1: 24,
        h2: 20,
        h3: 16,
        h4: 14,
        h5: 12,
        h6: 10,
    },
    padding: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12,
        app: 16,
        appSM: 20,
        appMD: 24,
        appLG: 32,
        appXL: 40,
    },

    borderRadius: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12,
        app: 16,
        appSM: 20,
        appMD: 24,
        appLG: 32,
        appXL: 40,
    },

    fontfamily: {
        Jersey25: 'Jersey25-Regular',
        notoSans_regular: 'NotoSans-Regular',
        notoSans_bold: 'NotoSans-Bold',
        notoSans_medium: 'NotoSans-Medium',
        notoSans_light: 'NotoSans-Light',
        notoSans_black: 'NotoSans-Black',
        notoSans_thin: 'NotoSans-Thin',
        notoSans_extralight: 'NotoSans-ExtraLight',
        notoSans_extrabold: 'NotoSans-ExtraBold',
        notoSans_semibold: 'NotoSans-SemiBold',
        notoSans_blackitalic: 'NotoSans-BlackItalic',
        notoSans_bolditalic: 'NotoSans-BoldItalic',
        notoSans_italic: 'NotoSans-Italic',
        notoSans_lightitalic: 'NotoSans-LightItalic',
        notoSans_mediumitalic: 'NotoSans-MediumItalic',
        notoSans_regularitalic: 'NotoSans-RegularItalic',
        notoSans_thinitalic: 'NotoSans-ThinItalic',
        notoSans_extralightitalic: 'NotoSans-ExtraLightItalic',
        notoSans_extrabolditalic: 'NotoSans-ExtraBoldItalic',
        notoSans_semibolditalic: 'NotoSans-SemiBoldItalic',
        poppins: 'Poppins',
    },
} as const;

export const lightTheme = baseTheme;

export const darkTheme = { ...baseTheme } as const;
