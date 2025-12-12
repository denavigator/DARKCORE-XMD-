💻 Project Overview

DARKCORE-XMD is a modular, advanced WhatsApp automation bot built with Baileys.
It is designed to provide a complete WhatsApp bot experience with:

Owner/Admin commands

Fun & Media commands

Economy system (XP, coins, daily rewards)

Group management (welcome/goodbye, mute/unmute)

Anti-crash and auto-reconnect

Fully configurable via settings.js





---

🌟 Features

🛡 Owner Commands

Command	Description

.restart	♻ Restart the bot
.block <number>	🚫 Block a number
.unblock <number>	✅ Unblock a number
.setprefix <prefix>	⚙ Change command prefix
.premium <number>	🌟 Grant premium status





---

🛠 Admin Commands

Command	Description

.kick <@user>	👢 Kick member
.promote <@user>	⬆ Promote to admin
.demote <@user>	⬇ Demote from admin
.muteall	🔇 Mute all
.unmuteall	🔊 Unmute all





---

🎨 Media Commands

Command	Description

.sticker	🖼 Convert image to sticker
.toimg	🖼 Sticker → Image
.ytmp3 <url>	🎵 Download audio from YouTube
.ytmp4 <url>	🎥 Download video from YouTube
.tts <text>	🗣 Text-to-Speech





---

🎉 Fun Commands

Command	Description

.hack <target>	💻 Hack simulator
.joke	😂 Random joke
.meme	🖼 Random meme





---

💰 Economy System

Command	Description

.daily	💸 Claim daily coins
.coins	💰 Check coins balance
.level	🎖 Check level & XP
.leaderboard	🏆 Top 10 users





---

⚙ Configuration (settings.js)

Customize everything without touching index.js:

BOT_NAME
BOT_VERSION
PREFIX
OWNER_NUMBERS
BAD_WORDS
SESSION_ID
PHONE_NUMBER
XP_GAIN
COINS_GAIN
DAILY_COINS
LEVEL_MULTIPLIER
ENABLE_PREMIUM
DEFAULT_BADGE
ENABLE_FUN_COMMANDS
ENABLE_MEDIA_COMMANDS
ENABLE_GROUP_WELCOME
ENABLE_GROUP_GOODBYE
WELCOME_MSG
GOODBYE_MSG
ENABLE_AI
LOG_LEVEL
AUTO_RECONNECT


---

🛠 Installation & Setup

1. Clone the repository:



git clone https://github.com/YOUR_USERNAME/Phase5-WhatsApp-Bot.git
cd Phase5-WhatsApp-Bot

2. Install dependencies:



npm install

3. Create .env:



SESSION_ID=your_session_id_here
PHONE_NUMBER=256XXXXXXXXX

4. Edit settings.js to customize your bot.


5. Start the bot:



node index.js

6. Scan QR code to generate your session.




---

📂 Folder Structure

Phase5-WhatsApp-Bot/
├─ index.js
├─ apps.js
├─ settings.js
├─ package.json
└─ .env


---

⚡ Notes

❗ Keep .env private

⚡ AI commands disabled by default

🔒 Bad words automatically filtered

✅ Fully modular & maintainable



---

🤝 Contribution

Fork the repository

Create a feature/fix branch

Test thoroughly

Submit a Pull Request



---

💬 Support

Contact owner via WhatsApp (OWNER_NUMBERS in settings.js)

Join support group if configured



---

📜 License

MIT License – Free to use, modify, and distribute

