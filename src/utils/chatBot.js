export const generateTechResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  // Tech support responses
  if (lowerInput.includes('error')) {
    return `ERROR HANDLER ACTIVATED\nCODE: 0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}\nRECOMMEND SYSTEM SCAN`;
  }
  
  if (lowerInput.includes('hack') || lowerInput.includes('security')) {
    return `SECURITY PROTOCOL ENGAGED\nENCRYPTION LEVEL: AES-${Math.floor(Math.random()*3 + 3)*128}\nTHREAT NEUTRALIZED`;
  }
  
  if (lowerInput.includes('password')) {
    return `PASSWORD ANALYSIS:\nSTRENGTH: ${Math.random() > 0.5 ? 'WEAK' : 'STRONG'}\nRECOMMEND 16 CHAR MIXED-SCRIPT`;
  }
  
  // Fallback to random tech messages
  const randomResponses = [
    `MEMORY USAGE: ${Math.floor(Math.random()*60 + 30)}%`,
    `NETWORK THROUGHPUT: ${Math.floor(Math.random()*900 + 100)}Mbps`,
    `CPU TEMP: ${(Math.random()*60 + 30).toFixed(1)}°C`,
    `DECRYPTION PROGRESS: ${Math.floor(Math.random()*100)}%`,
    `VIRUS DATABASE UPDATED: ${new Date().toISOString().slice(0,10)}`,
    `SYSTEM DIAGNOSTICS: ${Math.random() > 0.5 ? 'OPTIMAL' : 'REPAIRS NEEDED'}`,
  ];
  
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
};
