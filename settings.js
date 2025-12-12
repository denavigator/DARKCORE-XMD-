module.exports = {
    // ------------------ BOT INFO ------------------
    BOT_NAME: "DARKCORE-XMD",                   // Bot display name
    BOT_VERSION: "5.0.0",                    // Bot version
    PREFIX: ".",                             // Default command prefix

    // ------------------ OWNER CONFIG ------------------
    OWNER_NUMBERS: ["256758715404"], // Replace with your WhatsApp number(s)
    SUPPORT_GROUP: "group-id@s.whatsapp.net",           // Optional support group ID

    // ------------------ FILTER & SECURITY ------------------
    BAD_WORDS: ["sex", "porn", "scam", "fraud"], // Words filtered automatically
    ENABLE_ANTI_CRASH: true,                      // Anti-crash logging
    ENABLE_SPAM_FILTER: true,                     // Filter spam messages

    // ------------------ GROUP SETTINGS ------------------
    ENABLE_GROUP_WELCOME: true,       // Welcome message for new members
    ENABLE_GROUP_GOODBYE: true,       // Goodbye message for leaving members
    WELCOME_MSG: "👋 Welcome @user to the group!",
    GOODBYE_MSG: "👋 Goodbye @user, we will miss you!",

    // ------------------ ECONOMY SETTINGS ------------------
    XP_GAIN: 10,            // XP gained per message
    COINS_GAIN: 5,          // Coins gained per message
    DAILY_COINS: 100,       // Coins per daily reward
    LEVEL_MULTIPLIER: 100,  // XP needed per level = level * LEVEL_MULTIPLIER

    // ------------------ PREMIUM & BADGES ------------------
    ENABLE_PREMIUM: true,   // Enable premium users
    DEFAULT_BADGE: "NEWBIE", // Default badge for new users

    // ------------------ MEDIA & FUN ------------------
    ENABLE_FUN_COMMANDS: true,   // Fun commands (hack, joke, meme)
    ENABLE_MEDIA_COMMANDS: true, // Sticker, TTS, YouTube download
    ENABLE_AI: false,            // AI commands (requires OpenAI key if enabled)

    // ------------------ SESSION / CONNECTION ------------------
    SESSION_ID: process.env.SESSION_ID || "default_session",  // Session folder
    PHONE_NUMBER: process.env.PHONE_NUMBER || "256XXXXXXXXX", // Your WhatsApp number

    // ------------------ LOGGING / DEBUG ------------------
    LOG_LEVEL: "silent",   // pino logging level: silent / info / debug
    AUTO_RECONNECT: true   // Automatically reconnect if disconnected
};
