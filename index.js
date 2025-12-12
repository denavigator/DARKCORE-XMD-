require("dotenv").config();
const pino = require("pino");
const ytdl = require("ytdl-core");
const gtts = require("node-gtts")("en");
const axios = require("axios");
const { exec } = require("child_process");

const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion, 
    jidNormalizedUser, 
    DisconnectReason 
} = require("@whiskeysockets/baileys");

const apps = require("./apps.js");
let { PREFIX, OWNER_NUMBERS, BAD_WORDS, db, 
    isOwner, isPremium, getLevelInfo, containsBadWord, canClaimDaily, 
    addXP, addCoins, claimDaily, setPremium, addBadge } = apps;

// ------------------ COMMANDS ------------------
const commands = {};

// OWNER COMMANDS
commands.restart = async(sock,msg)=>{await sock.sendMessage(msg.key.remoteJid,{text:"♻ Restarting..."}); process.exit(0);}
commands.block = async(sock,msg,args)=>{const num=args[0]+"@s.whatsapp.net"; await sock.updateBlockStatus(num,"block"); sock.sendMessage(msg.key.remoteJid,{text:`🚫 Blocked ${args[0]}`});}
commands.unblock = async(sock,msg,args)=>{const num=args[0]+"@s.whatsapp.net"; await sock.updateBlockStatus(num,"unblock"); sock.sendMessage(msg.key.remoteJid,{text:`✅ Unblocked ${args[0]}`});}
commands.setprefix = async(sock,msg,args)=>{PREFIX=args[0]; sock.sendMessage(msg.key.remoteJid,{text:`⚙ Prefix updated to: ${PREFIX}`});}
commands.premium = async(sock,msg,args)=>{const user=args[0]+"@s.whatsapp.net"; setPremium(user,true); sock.sendMessage(msg.key.remoteJid,{text:`🌟 ${args[0]} is now Premium!`});}

// ADMIN COMMANDS
commands.kick = async(sock,msg,args)=>{const user=args[0]+"@s.whatsapp.net"; await sock.groupParticipantsUpdate(msg.key.remoteJid,[user],"remove"); sock.sendMessage(msg.key.remoteJid,{text:`👢 Kicked ${args[0]}`});}
commands.promote = async(sock,msg,args)=>{const user=args[0]+"@s.whatsapp.net"; await sock.groupParticipantsUpdate(msg.key.remoteJid,[user],"promote"); sock.sendMessage(msg.key.remoteJid,{text:`⬆ Promoted ${args[0]}`});}
commands.demote = async(sock,msg,args)=>{const user=args[0]+"@s.whatsapp.net"; await sock.groupParticipantsUpdate(msg.key.remoteJid,[user],"demote"); sock.sendMessage(msg.key.remoteJid,{text:`⬇ Demoted ${args[0]}`});}
commands.muteall = async(sock,msg)=>{await sock.groupSettingUpdate(msg.key.remoteJid,"announcement"); sock.sendMessage(msg.key.remoteJid,{text:"🔇 Group Muted"});}
commands.unmuteall = async(sock,msg)=>{await sock.groupSettingUpdate(msg.key.remoteJid,"not_announcement"); sock.sendMessage(msg.key.remoteJid,{text:"🔊 Group Unmuted"});}

// MEDIA COMMANDS
commands.sticker = async(sock,msg)=>{const buffer=await sock.downloadMediaMessage(msg); await sock.sendMessage(msg.key.remoteJid,{sticker:buffer});}
commands.toimg = async(sock,msg)=>{const buffer=await sock.downloadMediaMessage(msg); await sock.sendMessage(msg.key.remoteJid,{image:buffer});}
commands.ytmp3 = async(sock,msg,args)=>{const url=args[0]; const stream=ytdl(url,{filter:"audioonly"}); await sock.sendMessage(msg.key.remoteJid,{audio:{stream},mimetype:"audio/mp4"});}
commands.ytmp4 = async(sock,msg,args)=>{const url=args[0]; const stream=ytdl(url,{quality:"highest"}); await sock.sendMessage(msg.key.remoteJid,{video:{stream}});}
commands.tts = async(sock,msg,args)=>{const text=args.join(" "); const path="tts.mp3"; gtts.save(path,text,async()=>{await sock.sendMessage(msg.key.remoteJid,{audio:{url:path},mimetype:"audio/mp4"});});}

// FUN COMMANDS
commands.hack = async(sock,msg,args)=>{const target=args[0]||"Unknown"; const steps=["Scanning...","Connecting...","Injecting payload...","System locked...",`Hacked ${target}!`]; for(let s of steps){await sock.sendMessage(msg.key.remoteJid,{text:s}); await new Promise(r=>setTimeout(r,1000));}}
commands.joke = async(sock,msg)=>{const res=await axios.get("https://official-joke-api.appspot.com/random_joke"); await sock.sendMessage(msg.key.remoteJid,{text:`${res.data.setup}\n\n😂 ${res.data.punchline}`});}
commands.meme = async(sock,msg)=>{const res=await axios.get("https://meme-api.com/gimme"); await sock.sendMessage(msg.key.remoteJid,{image:{url:res.data.url},caption:res.data.title});}

// ECONOMY
commands.daily = async(sock,msg)=>{const user=msg.key.participant; const claimed=claimDaily(user); if(claimed) await sock.sendMessage(msg.key.remoteJid,{text:"💰 You claimed 100 coins!"}); else await sock.sendMessage(msg.key.remoteJid,{text:"⏰ You already claimed today."});}
commands.coins = async(sock,msg)=>{const user=msg.key.participant; const coins=db.users[user]?.coins||0; await sock.sendMessage(msg.key.remoteJid,{text:`💰 You have ${coins} coins.`});}
commands.level = async(sock,msg)=>{const user=msg.key.participant; const data=getLevelInfo(user); await sock.sendMessage(msg.key.remoteJid,{text:`🎖 Level: ${data.level}\n✨ XP: ${data.xp}`});}
commands.leaderboard = async(sock,msg)=>{const leaderboard=Object.entries(db.users).sort((a,b)=>b[1].xp-a[1].xp).slice(0,10).map(([u,d],i)=>`${i+1}. ${u.split("@")[0]} - L${d.level} (${d.xp} XP)`); await sock.sendMessage(msg.key.remoteJid,{text:"🏆 Leaderboard\n"+leaderboard.join("\n")});}

// ------------------ CONNECT BOT ------------------
async function startBot(){
    const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${process.env.SESSION_ID}`);
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({logger:pino({level:"silent"}), printQRInTerminal:true, auth:state, version});
    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update",({connection,lastDisconnect})=>{
        if(connection==="close"){
            if(lastDisconnect?.error?.output?.statusCode===DisconnectReason.loggedOut) console.log("❌ Logged Out");
            else{console.log("⚠ Reconnecting..."); startBot();}
        } else if(connection==="open") console.log("✅ BOT CONNECTED");
    });

    sock.ev.on("messages.upsert", async({messages})=>{
        const msg=messages[0]; if(!msg.message) return;
        const jid=msg.key.remoteJid; const sender=jidNormalizedUser(msg.key.participant||msg.key.remoteJid);
        let text=msg.message.conversation||msg.message.extendedTextMessage?.text||msg.message.imageMessage?.caption||"";

        if(text && containsBadWord(text)) await sock.sendMessage(jid,{text:"⚠ Bad word detected!"});
        addXP(sender); addCoins(sender,5);

        if(!text.startsWith(PREFIX)) return;
        const args=text.slice(PREFIX.length).trim().split(/ +/); const cmd=args.shift().toLowerCase();
        if(!commands[cmd]) return;

        try{await commands[cmd](sock,msg,args);} catch(e){console.error("Command Error:",e); await sock.sendMessage(jid,{text:"⚠ Command Error"});}
    });

    sock.ev.on("group-participants.update", async({id,participants,action})=>{
        const user=participants[0];
        if(action==="add") await sock.sendMessage(id,{text:`👋 Welcome @${user.split("@")[0]}!`});
        if(action==="remove") await sock.sendMessage(id,{text:`👋 Goodbye @${user.split("@")[0]}!`});
    });

    return sock;
}

startBot();



