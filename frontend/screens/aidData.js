export const aidData = {
  start: {
    message: {
      en: "Hi! Need help with First Aid?",
      hi: "नमस्ते! आपको प्राथमिक उपचार की ज़रूरत है?",
      gwl: "नमस्कार! पैंला उपचार म मदद चाही?",
      kmn: "नमस्कार! पहिल उपचार म सहायत चाहीं?"
    },
    options: ["bleeding", "burn", "fall", "stomachache","itching","toothache","minorwound","nosebleed","snakebite", "insectbite", "diarrhea", "headache", "fever"]
  },

  bleeding: {
    answer: {
      en: "Apply pressure using a clean cloth or turmeric leaf. If you don't have a bandage, you can use a natural leaf like turmeric or plantain.",
      hi: "साफ़ कपड़े या हल्दी के पत्ते से दबाव डालें। यदि आपके पास पट्टी नहीं है, तो आप हल्दी या कटहल के पत्ते का उपयोग कर सकते हैं।",
      gwl: "साफ कपड़ा या हलदी को पत्ता लगाव। यदि पट्टी नहीं हो तो हलदी या कटहल के पत्ते लगाव।",
      kmn: "साफ कपड़ा या हलदी को पत्ता चिपकाय। अगर पट्टी न हो तो हलदी या कटहल के पत्ते लगाय।"
    },
    image: require('../assets/solutions/Turmeric.png')
  },

  burn: {
    answer: {
      en: "Cool the burn under running water for 10–15 minutes.",
      hi: "जले हिस्से को 10–15 मिनट तक पानी में रखें।",
      gwl: "जल्यो अंग पै 10 मिनट तक पानी डाल।",
      kmn: "जल ग्या अंग पै 10 मिनट तक ठंडा पानी।"
    },
    image: require('../assets/solutions/leaf2.png')
  },

  fall: {
    answer: {
      en: "Immobilize the injured part and call for help.",
      hi: "चोटिल हिस्से को हिलाएं नहीं और मदद बुलाएं।",
      gwl: "घायल अंग न हिलाव, मदद बुलाव।",
      kmn: "घायल अंग न हिलाय, मदद बोलाय।"
    },
    image: require('../assets/solutions/leaf3.png')
  },

  snakebite: {
    answer: {
      en: "Keep the limb still and apply a bandage above the bite.",
      hi: "अंग को स्थिर रखें और काट के ऊपर पट्टी बांधें।",
      gwl: "अंग न स्थिर राख, ऊपर से पट्टी बांध।",
      kmn: "अंग स्थिर राख, ऊपर पट्टी लगाय।"
    }
  },
  stomachache: {
  answer: {
    en: "Chew 2-3 guava leaves or boil them in water. It helps reduce loose motions naturally.",
    hi: "अमरूद के 2-3 पत्ते चबाएं या उबाल कर पिएं, दस्त में राहत मिलती है।",
    gwl: "अमरूद का पत्ता चबाव या पानी म उबाल के पी। दस्त म फायदा।",
    kmn: "अमरूद का पत्ता चबाय या उबाल के पी। पेट साफ म आराम।"
  },
  image: require('../assets/solutions/guavaleaf.png')
},
itching: {
  answer: {
    en: "Rub crushed neem leaves or turmeric paste on the area. These reduce itching and infection.",
    hi: "नीम के पत्ते पीसकर या हल्दी का लेप लगाएं। खुजली और इन्फेक्शन में असरदार है।",
    gwl: "नीम पत्ता पीस के लगाव। हलदी भी लाग। खुजली म ठीक।",
    kmn: "नीम पीसके लगाय। हलदी भी मिलाव। खुजली म फायदेमंद।"
  },
  image: require('../assets/solutions/neemleaf.png')
},
toothache: {
  answer: {
    en: "Apply clove oil or chew a clove. You can also rub salt and turmeric paste on the gums.",
    hi: "लौंग का तेल लगाएं या लौंग चबाएं। हल्दी और नमक मिलाकर मसूड़ों पर लगाएं।",
    gwl: "लौंग चबाव या तेल लगाव। हलदी-नमक मसूड़े पै लगाव।",
    kmn: "लौंग चबाय या तेल लगाय। हलदी-नमक मिलाके मसूड़े म घस।"
  },
  image: require('../assets/solutions/clove.png')
},
minorwound: {
  answer: {
    en: "Clean with turmeric paste or honey. Both have natural antiseptic properties.",
    hi: "हल्दी का लेप या शहद लगाएं, दोनों ही संक्रमण को रोकते हैं।",
    gwl: "हलदी या शहद लगाव। जख्म भराव म मदद।",
    kmn: "हलदी चिपकाय या शहद लगाय। जख्म सठीक करै।"
  },
 
},
nosebleed: {
  answer: {
    en: "Apply crushed coriander (dhaniya) leaves or place a cold wet cloth on the forehead.",
    hi: "धनिये की पत्तियां पीसकर लगाएं या ठंडा गीला कपड़ा माथे पर रखें।",
    gwl: "धनिया पत्ता पीस के लगाव। ठंडा कपड़ा माथा पै राख।",
    kmn: "धनिया पीसके नाक ऊपर लगाय। ठंडा कपड़ा माथा पर राख।"
  },
  image: require('../assets/solutions/coriander.png')
},





  insectbite: {
    answer: {
      en: "Rub crushed tulsi (holy basil) or guava leaves on the bite area to reduce itching and swelling.",
      hi: "तुलसी या अमरूद के पत्तों को पीसकर लगाने से खुजली और सूजन कम होती है।",
      gwl: "तुलसी या अमरूद के पत्ते पीस के लगाव, सूजन घटे।",
      kmn: "तुलसी या अमरूद के पत्ते पीस के लगाय, सूजन कम होल।"
    },
    image: require('../assets/solutions/guavaleaf.png')
  },

  diarrhea: {
    answer: {
      en: "Drink rice water or boil guava leaves and sip slowly. Both help in reducing stomach upset naturally.",
      hi: "चावल का माड़ या अमरूद के पत्ते उबालकर पीने से लाभ होता है।",
      gwl: "चावल को मांड या अमरूद के पत्ते उबाले के पी।",
      kmn: "चावल को मांड या अमरूद पत्ता उबाले के पी।"
    },
    image: require('../assets/solutions/guavaleaf.png')
  },

  headache: {
    answer: {
      en: "Crush mint or lemon balm leaves and apply to forehead. You can also inhale steam with tulsi leaves.",
      hi: "पुदीना या नींबू बाम के पत्तों का लेप माथे पर लगाएं, या तुलसी वाले पानी की भाप लें।",
      gwl: "पुदीना या नींबू पत्ता पीस के माथे पै लगाव। तुलसी भाप ले।",
      kmn: "पुदीना या नींबू पत्ता माथे पै लगाय, तुलसी भाप ले।"
    },
    image: require('../assets/solutions/MintLeaf.png')
  },

  fever: {
    answer: {
      en: "Drink decoction (kadha) made from tulsi, ginger, and black pepper. Rest and keep hydrated.",
      hi: "तुलसी, अदरक और काली मिर्च का काढ़ा पिएं और आराम करें।",
      gwl: "तुलसी, अदरक, काली मिर्च को काढ़ा बनाव। पानी पीते रह।",
      kmn: "तुलसी, अदरक, काली मिर्च को काढ़ा बनाय। आराम कर।"
    },

  }
};
